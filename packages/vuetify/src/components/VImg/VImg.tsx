// Styles
import './VImg.sass'

// Components
import { makeVResponsiveProps, VResponsive } from '@/components/VResponsive/VResponsive'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Directives
import intersect from '@/directives/intersect'

// Utilities
import {
  computed,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  shallowRef,
  toRef,
  vShow,
  watch,
  withDirectives,
} from 'vue'
import {
  convertToUnit,
  genericComponent,
  getCurrentInstance,
  propsFactory,
  SUPPORTS_INTERSECTION,
  useRender,
} from '@/util'

// Types
import type { PropType } from 'vue'

// not intended for public use, this is passed in by vuetify-loader
export interface srcObject {
  src?: string
  srcset?: string
  lazySrc?: string
  aspect: number
}

export type VImgSlots = {
  default: never
  placeholder: never
  error: never
  sources: never
}

export const makeVImgProps = propsFactory({
  absolute: Boolean,
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String] as PropType<boolean | 'true' | 'false'>,
    default: undefined,
  },
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object as PropType<IntersectionObserverInit>,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: undefined,
      rootMargin: undefined,
      threshold: undefined,
    }),
  },
  sizes: String,
  src: {
    type: [String, Object] as PropType<string | srcObject>,
    default: '',
  },
  crossorigin: String as PropType<'' | 'anonymous' | 'use-credentials'>,
  referrerpolicy: String as PropType<
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  >,
  srcset: String,
  position: String,

  ...makeVResponsiveProps(),
  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeTransitionProps(),
}, 'VImg')

export const VImg = genericComponent<VImgSlots>()({
  name: 'VImg',

  directives: { intersect },

  props: makeVImgProps(),

  emits: {
    loadstart: (value: string | undefined) => true,
    load: (value: string | undefined) => true,
    error: (value: string | undefined) => true,
  },

  setup (props, { emit, slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { roundedClasses } = useRounded(props)
    const vm = getCurrentInstance('VImg')

    const currentSrc = shallowRef('') // Set from srcset
    const image = ref<HTMLImageElement>()
    const state = shallowRef<'idle' | 'loading' | 'loaded' | 'error'>(props.eager ? 'loading' : 'idle')
    const naturalWidth = shallowRef<number>()
    const naturalHeight = shallowRef<number>()

    const normalisedSrc = computed<srcObject>(() => {
      return props.src && typeof props.src === 'object'
        ? {
          src: props.src.src,
          srcset: props.srcset || props.src.srcset,
          lazySrc: props.lazySrc || props.src.lazySrc,
          aspect: Number(props.aspectRatio || props.src.aspect || 0),
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
    watch(aspectRatio, (val, oldVal) => {
      if (!val && oldVal && image.value) {
        pollForSize(image.value)
      }
    })

    // TODO: getSrc when window width changes

    onBeforeMount(() => init())

    function init (isIntersecting?: boolean) {
      if (props.eager && isIntersecting) return
      if (
        SUPPORTS_INTERSECTION &&
        !isIntersecting &&
        !props.eager
      ) return

      state.value = 'loading'

      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image()
        lazyImg.src = normalisedSrc.value.lazySrc
        pollForSize(lazyImg, null)
      }

      if (!normalisedSrc.value.src) return

      nextTick(() => {
        emit('loadstart', image.value?.currentSrc || normalisedSrc.value.src)

        setTimeout(() => {
          if (vm.isUnmounted) return

          if (image.value?.complete) {
            if (!image.value.naturalWidth) {
              onError()
            }

            if (state.value === 'error') return

            if (!aspectRatio.value) pollForSize(image.value, null)
            if (state.value === 'loading') onLoad()
          } else {
            if (!aspectRatio.value) pollForSize(image.value!)
            getSrc()
          }
        })
      })
    }

    function onLoad () {
      if (vm.isUnmounted) return

      getSrc()
      pollForSize(image.value!)
      state.value = 'loaded'
      emit('load', image.value?.currentSrc || normalisedSrc.value.src)
    }

    function onError () {
      if (vm.isUnmounted) return

      state.value = 'error'
      emit('error', image.value?.currentSrc || normalisedSrc.value.src)
    }

    function getSrc () {
      const img = image.value
      if (img) currentSrc.value = img.currentSrc || img.src
    }

    let timer = -1

    onBeforeUnmount(() => {
      clearTimeout(timer)
    })

    function pollForSize (img: HTMLImageElement, timeout: number | null = 100) {
      const poll = () => {
        clearTimeout(timer)
        if (vm.isUnmounted) return

        const { naturalHeight: imgHeight, naturalWidth: imgWidth } = img

        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth
          naturalHeight.value = imgHeight
        } else if (!img.complete && state.value === 'loading' && timeout != null) {
          timer = window.setTimeout(poll, timeout)
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

    const __image = () => {
      if (!normalisedSrc.value.src || state.value === 'idle') return null

      const img = (
        <img
          class={['v-img__img', containClasses.value]}
          style={{ objectPosition: props.position }}
          src={ normalisedSrc.value.src }
          srcset={ normalisedSrc.value.srcset }
          alt={ props.alt }
          crossorigin={ props.crossorigin }
          referrerpolicy={ props.referrerpolicy }
          draggable={ props.draggable }
          sizes={ props.sizes }
          ref={ image }
          onLoad={ onLoad }
          onError={ onError }
        />
      )

      const sources = slots.sources?.()

      return (
        <MaybeTransition transition={ props.transition } appear>
          {
            withDirectives(
              sources
                ? <picture class="v-img__picture">{ sources }{ img }</picture>
                : img,
              [[vShow, state.value === 'loaded']]
            )
          }
        </MaybeTransition>
      )
    }

    const __preloadImage = () => (
      <MaybeTransition transition={ props.transition }>
        { normalisedSrc.value.lazySrc && state.value !== 'loaded' && (
          <img
            class={['v-img__img', 'v-img__img--preload', containClasses.value]}
            style={{ objectPosition: props.position }}
            src={ normalisedSrc.value.lazySrc }
            alt={ props.alt }
            crossorigin={ props.crossorigin }
            referrerpolicy={ props.referrerpolicy }
            draggable={ props.draggable }
          />
        )}
      </MaybeTransition>
    )

    const __placeholder = () => {
      if (!slots.placeholder) return null

      return (
        <MaybeTransition transition={ props.transition } appear>
          { (state.value === 'loading' || (state.value === 'error' && !slots.error)) &&
          <div class="v-img__placeholder">{ slots.placeholder() }</div>
          }
        </MaybeTransition>
      )
    }

    const __error = () => {
      if (!slots.error) return null

      return (
        <MaybeTransition transition={ props.transition } appear>
          { state.value === 'error' &&
            <div class="v-img__error">{ slots.error() }</div>
          }
        </MaybeTransition>
      )
    }

    const __gradient = () => {
      if (!props.gradient) return null

      return <div class="v-img__gradient" style={{ backgroundImage: `linear-gradient(${props.gradient})` }} />
    }

    const isBooted = shallowRef(false)
    {
      const stop = watch(aspectRatio, val => {
        if (val) {
          // Doesn't work with nextTick, idk why
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true
            })
          })
          stop()
        }
      })
    }

    useRender(() => {
      const responsiveProps = VResponsive.filterProps(props)
      return (
        <VResponsive
          class={[
            'v-img',
            {
              'v-img--absolute': props.absolute,
              'v-img--booting': !isBooted.value,
            },
            backgroundColorClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            { width: convertToUnit(props.width === 'auto' ? naturalWidth.value : props.width) },
            backgroundColorStyles.value,
            props.style,
          ]}
          { ...responsiveProps }
          aspectRatio={ aspectRatio.value }
          aria-label={ props.alt }
          role={ props.alt ? 'img' : undefined }
          v-intersect={[{
            handler: init,
            options: props.options,
          }, null, ['once']]}
        >{{
          additional: () => (
            <>
              <__image />
              <__preloadImage />
              <__gradient />
              <__placeholder />
              <__error />
            </>
          ),
          default: slots.default,
        }}</VResponsive>
      )
    })

    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight,
    }
  },
})

export type VImg = InstanceType<typeof VImg>
