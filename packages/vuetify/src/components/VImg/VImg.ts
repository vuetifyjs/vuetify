import './VImg.sass'

// Vue
import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  nextTick,
  onBeforeMount,
  reactive,
  ref,
  vShow,
  watch,
  withDirectives,
} from 'vue'
import type { Prop } from 'vue'

// Components
import { VResponsive } from '../VResponsive'

// Composables
// import { provideTheme } from '@/composables/theme'

// Directives
import intersect from '@/directives/intersect'
import type { ObserveDirectiveBinding } from '@/directives/intersect'

// Utils
import makeProps from '@/util/makeProps'
import { useDirective } from '@/util/useDirective'
import { maybeTransition } from '@/util'

// not intended for public use, this is passed in by vuetify-loader
export interface srcObject {
  src?: string
  srcset?: string
  lazySrc?: string
  aspect: number
}

const hasIntersect = typeof window !== 'undefined' && 'IntersectionObserver' in window

export default defineComponent({
  name: 'VImg',

  props: makeProps({
    theme: String,
    aspectRatio: [String, Number],
    alt: String,
    cover: Boolean,
    eager: Boolean,
    lazySrc: String,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: undefined,
        rootMargin: undefined,
        threshold: undefined,
      }),
    } as Prop<IntersectionObserverInit>,
    position: {
      type: String,
      default: 'center center',
    },
    sizes: String,
    src: {
      type: [String, Object],
      default: '',
    } as Prop<string | srcObject>,
    srcset: String,
    transition: {
      type: [Boolean, String],
      default: 'fade-transition',
      validator: val => val !== true,
    } as Prop<string | false, string>,
  }),

  setup (props, ctx) {
    const { slots, emit } = ctx

    // TODO: figure out how to mock in tests
    // const { themeClasses } = provideTheme(props, ctx)

    const currentSrc = ref('') // Set from srcset
    const image = ref<HTMLImageElement>()
    const state = ref<'idle' | 'loading' | 'loaded' | 'error'>('idle')
    const naturalWidth = ref<number>()
    const naturalHeight = ref<number>()

    const vm = getCurrentInstance() as any
    vm.setupState = reactive({
      private: {
        currentSrc,
        image,
        state,
        naturalWidth,
        naturalHeight,
      },
    })

    const normalisedSrc = computed<srcObject>(() => {
      return props.src && typeof props.src === 'object'
        ? {
          src: props.src.src,
          srcset: props.srcset || props.src.srcset,
          lazySrc: props.lazySrc || props.src.lazySrc,
          aspect: Number(props.aspectRatio || props.src.aspect),
        } : {
          src: props.src,
          srcset: props.srcset,
          lazySrc: props.lazySrc,
          aspect: Number(props.aspectRatio || 0),
        }
    })
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value! / naturalHeight.value! || 0
    })

    watch(() => props.src, () => {
      init(state.value !== 'idle')
    })
    // TODO: getSrc when window width changes

    onBeforeMount(() => init())

    function init (isIntersecting?: boolean) {
      // If the current browser supports the intersection
      // observer api, the image is not observable, and
      // the eager prop isn't being used, do not load
      if (
        hasIntersect &&
        !isIntersecting &&
        !props.eager
      ) return

      state.value = 'loading'
      nextTick(() => {
        emit('loadstart', image.value?.currentSrc || props.src)
        aspectRatio.value || pollForSize(image.value!)
        getSrc()
      })

      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image()
        lazyImg.src = normalisedSrc.value.lazySrc
        pollForSize(lazyImg, null)
      }
    }

    function onLoad () {
      getSrc()
      state.value = 'loaded'
      emit('load', image.value?.currentSrc || props.src)
    }

    function onError () {
      state.value = 'error'
      emit('error', image.value?.currentSrc || props.src)
    }

    function getSrc () {
      const img = image.value
      if (img) currentSrc.value = img.currentSrc || img.src
    }

    function pollForSize (img: HTMLImageElement, timeout: number | null = 100) {
      const poll = () => {
        const { naturalHeight: imgHeight, naturalWidth: imgWidth } = img

        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth
          naturalHeight.value = imgHeight
        } else if (!img.complete && state.value === 'loading' && timeout != null) {
          setTimeout(poll, timeout)
        } else if (img.currentSrc.endsWith('.svg') || img.currentSrc.startsWith('data:image/svg+xml')) {
          naturalWidth.value = 1
          naturalHeight.value = 1
        }
      }

      poll()
    }

    const containClasses = computed(() => ({
      'v-img__img--cover': props.cover,
      'v-img__img--contain': !props.cover,
    }))

    const __image = computed(() => {
      if (!normalisedSrc.value.src || state.value === 'idle') return

      const img = h('img', {
        class: ['v-img__img', containClasses.value],
        src: normalisedSrc.value.src,
        srcset: normalisedSrc.value.srcset,
        sizes: props.sizes,
        ref: image,
        onLoad,
        onError,
      })

      const sources = slots.sources?.()

      return maybeTransition(
        props,
        { appear: true },
        withDirectives(
          !sources ? img : h('picture', {
            class: 'v-img__picture',
          }, [
            sources,
            img,
          ]),
          [[vShow, state.value === 'loaded']]
        )
      )
    })

    const __preloadImage = computed(() => {
      return maybeTransition(
        props,
        {},
        !!normalisedSrc.value.lazySrc && state.value !== 'loaded' ? h('img', {
          class: ['v-img__img', 'v-img__img--preload', containClasses.value],
          src: normalisedSrc.value.lazySrc,
        }) : undefined
      )
    })

    const __placeholder = computed(() => {
      if (!slots.placeholder) return

      const placeholder = state.value === 'loading' || (state.value === 'error' && !slots.error)
        ? h('div', { class: 'v-img__placeholder' }, slots.placeholder())
        : undefined

      return maybeTransition(props, { appear: true }, placeholder)
    })

    const __error = computed(() => {
      if (!slots.error) return

      const error = state.value === 'error'
        ? h('div', { class: 'v-img__error' }, slots.error())
        : undefined

      return maybeTransition(props, { appear: true }, error)
    })

    return () => withDirectives(
      h(VResponsive, {
        class: ['v-img'/* , themeClasses.value */],
        aspectRatio: aspectRatio.value,
        'aria-label': props.alt,
        role: props.alt ? 'img' : undefined,
      }, {
        additional: () => [__image.value, __preloadImage.value, __placeholder.value, __error.value],
        default: slots.default,
      }),
      [useDirective<ObserveDirectiveBinding>(intersect, {
        value: {
          handler: init,
          options: props.options,
        },
        modifiers: { once: true },
      })]
    )
  },
})
