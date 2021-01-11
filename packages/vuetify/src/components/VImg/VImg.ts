import './VImg.sass'

// Vue
import {
  defineComponent,
  computed,
  h,
  ref,
  withDirectives,
  watch,
  onMounted,
  Transition,
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
    contain: Boolean,
    eager: Boolean,
    gradient: String,
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
    const isLoading = ref(true)
    const calculatedAspectRatio = ref<number>()
    const naturalWidth = ref<number>()
    const hasError = ref(false)

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
    const aspectRatio = computed(() => Number(normalisedSrc.value.aspect || calculatedAspectRatio.value))

    watch(() => props.src, () => {
      if (!isLoading.value) init(true)
      else loadImage()
    })
    // TODO: getSrc when window width changes

    onMounted(() => init())

    function init (isIntersecting?: boolean) {
      // If the current browser supports the intersection
      // observer api, the image is not observable, and
      // the eager prop isn't being used, do not load
      if (
        hasIntersect &&
        !isIntersecting &&
        !props.eager
      ) return

      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image()
        lazyImg.src = normalisedSrc.value.lazySrc
        pollForSize(lazyImg, null)
      }
      if (normalisedSrc.value.src) loadImage()
    }

    function loadImage () {
      const img = image.value = new Image()

      img.onload = () => {
        /* istanbul ignore if */
        if (img.decode) {
          img.decode().catch().then(onLoad)
        } else {
          onLoad()
        }
      }
      img.onerror = onError

      hasError.value = false
      img.src = normalisedSrc.value.src ?? ''
      props.sizes && (img.sizes = props.sizes)
      normalisedSrc.value.srcset && (img.srcset = normalisedSrc.value.srcset)

      normalisedSrc.value.aspect || pollForSize(img)
      getSrc()
    }

    function onLoad () {
      getSrc()
      isLoading.value = false
      emit('load', props.src)

      if (
        image.value &&
        (normalisedSrc.value.src?.endsWith('.svg') || normalisedSrc.value.src?.startsWith('data:image/svg+xml'))
      ) {
        if (image.value.naturalHeight && image.value.naturalWidth) {
          naturalWidth.value = image.value.naturalWidth
          calculatedAspectRatio.value = image.value.naturalWidth / image.value.naturalHeight
        } else {
          calculatedAspectRatio.value = 1
        }
      }
    }

    function onError () {
      hasError.value = true
      emit('error', props.src)
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
          calculatedAspectRatio.value = imgWidth / imgHeight
        } else if (!img.complete && isLoading.value && !hasError.value && timeout != null) {
          setTimeout(poll, timeout)
        }
      }

      poll()
    }

    const __image = computed(() => {
      if (!(normalisedSrc.value.src || normalisedSrc.value.lazySrc || props.gradient)) return

      const backgroundImage: string[] = []
      const src = isLoading.value ? normalisedSrc.value.lazySrc : currentSrc.value

      if (props.gradient) backgroundImage.push(`linear-gradient(${props.gradient})`)
      if (src) backgroundImage.push(`url("${src}")`)

      const image = h('div', {
        class: ['v-img__image', {
          'v-img__image--preload': isLoading.value,
          'v-img__image--contain': props.contain,
          'v-img__image--cover': !props.contain,
        }],
        style: {
          backgroundImage: backgroundImage.join(', '),
          backgroundPosition: props.position,
        },
        key: +isLoading.value,
      })

      /* istanbul ignore if */
      if (!props.transition) return image

      return h(Transition, {
        name: props.transition,
        mode: 'in-out',
      }, () => image)
    })

    const __placeholder = computed(() => {
      if (!slots.placeholder) return

      const placeholder = isLoading.value
        ? h('div', { class: 'v-img__placeholder' }, slots.placeholder())
        : undefined

      if (!props.transition) return placeholder

      return h(Transition, {
        appear: true,
        name: props.transition,
      }, () => placeholder)
    })

    return () => withDirectives(
      h(VResponsive, {
        class: ['v-img'/* , themeClasses.value */],
        aspectRatio: aspectRatio.value,
        'aria-label': props.alt,
        role: props.alt ? 'img' : undefined,
      }, {
        additional: () => [__image.value, __placeholder.value],
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
