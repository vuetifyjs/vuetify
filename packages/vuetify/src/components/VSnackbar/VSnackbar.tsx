// Styles
import './VSnackbar.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VOverlay } from '@/components/VOverlay'
import { makeVOverlayProps } from '@/components/VOverlay/VOverlay'
import { VProgressLinear } from '@/components/VProgressLinear'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useScopeId } from '@/composables/scopeId'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { mergeProps, onMounted, onScopeDispose, ref, shallowRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, refElement, useRender } from '@/util'

type VSnackbarSlots = {
  activator: { isActive: boolean, props: Record<string, any> }
  default: never
  actions: never
}

function useCountdown (milliseconds: number) {
  const time = shallowRef(milliseconds)
  let timer = -1

  function clear () {
    clearInterval(timer)
  }

  function reset () {
    time.value = milliseconds

    clear()
  }

  function start (el?: HTMLElement) {
    const style = el ? getComputedStyle(el) : { transitionDuration: 2 }
    const interval = parseFloat(style.transitionDuration) * 1000 || 200

    if (time.value <= 0) {
      clear()

      return
    }

    timer = window.setInterval(() => {
      time.value -= interval

      if (time.value <= 0) {
        clear()
      }
    }, interval)
  }

  onScopeDispose(clear)

  return { clear, time, start, reset }
}

export const makeVSnackbarProps = propsFactory({
  multiLine: Boolean,
  timer: [Boolean, String],
  // countdown: [Boolean, String],
  timeout: {
    type: [Number, String],
    default: 5000,
  },
  vertical: Boolean,

  ...makeLocationProps({ location: 'bottom' } as const),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeVariantProps(),
  ...makeThemeProps(),
  ...omit(makeVOverlayProps({
    transition: 'v-snackbar-transition',
  }), ['persistent', 'noClickAnimation', 'scrim', 'scrollStrategy']),
}, 'VSnackbar')

export const VSnackbar = genericComponent<VSnackbarSlots>()({
  name: 'VSnackbar',

  props: makeVSnackbarProps(),

  emits: {
    'update:modelValue': (v: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { scopeId } = useScopeId()
    const { themeClasses } = provideTheme(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(props)
    const { roundedClasses } = useRounded(props)
    const { time, start, clear } = useCountdown(Number(props.timeout))

    const overlay = ref<VOverlay>()
    const timerRef = ref<VProgressLinear>()

    watch(isActive, startTimeout)
    watch(() => props.timeout, startTimeout)

    onMounted(() => {
      if (isActive.value) startTimeout()
    })

    let activeTimeout = -1
    function startTimeout () {
      clear()
      window.clearTimeout(activeTimeout)
      const timeout = Number(props.timeout)

      if (!isActive.value || timeout === -1) return

      const element = refElement(timerRef.value)

      start(element)

      activeTimeout = window.setTimeout(() => {
        isActive.value = false
      }, timeout)
    }

    function onPointerenter () {
      window.clearTimeout(activeTimeout)
    }

    useRender(() => {
      const [overlayProps] = VOverlay.filterProps(props)

      return (
        <VOverlay
          ref={ overlay }
          class={[
            'v-snackbar',
            {
              'v-snackbar--active': isActive.value,
              'v-snackbar--multi-line': props.multiLine && !props.vertical,
              'v-snackbar--timer': !!props.timer,
              'v-snackbar--vertical': props.vertical,
            },
            positionClasses.value,
            props.class,
          ]}
          style={ props.style }
          { ...overlayProps }
          v-model={ isActive.value }
          contentProps={ mergeProps({
            class: [
              'v-snackbar__wrapper',
              themeClasses.value,
              colorClasses.value,
              roundedClasses.value,
              variantClasses.value,
            ],
            style: [
              locationStyles.value,
              colorStyles.value,
            ],
            onPointerenter,
            onPointerleave: startTimeout,
          }, overlayProps.contentProps)}
          persistent
          noClickAnimation
          scrim={ false }
          scrollStrategy="none"
          _disableGlobalStack
          { ...scopeId }
          v-slots={{ activator: slots.activator }}
        >
          { genOverlays(false, 'v-snackbar') }

          { props.timer && (
            <div key="timer" class="v-snackbar__timer">
              <VProgressLinear
                ref={ timerRef }
                active
                color="blue"
                max={ props.timeout }
                model-value={ (time.value - 200) < 0 ? 0 : time.value - 200 }
              />
            </div>
          )}

          { slots.default && (
            <div
              class="v-snackbar__content"
              role="status"
              aria-live="polite"
            >
              { slots.default() }
            </div>
          )}

          { slots.actions && (
            <VDefaultsProvider
              defaults={{
                VBtn: {
                  variant: 'text',
                  ripple: false,
                },
              }}
            >
              <div class="v-snackbar__actions">
                { slots.actions() }
              </div>
            </VDefaultsProvider>
          )}
        </VOverlay>
      )
    })

    return forwardRefs({}, overlay)
  },
})

export type VSnackbar = InstanceType<typeof VSnackbar>
