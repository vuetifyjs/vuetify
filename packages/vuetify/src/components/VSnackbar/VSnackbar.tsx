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
import { mergeProps, nextTick, onMounted, onScopeDispose, ref, shallowRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, refElement, useRender } from '@/util'

type VSnackbarSlots = {
  activator: { isActive: boolean, props: Record<string, any> }
  default: never
  actions: never
  text: never
}

function useCountdown (milliseconds: number) {
  const time = shallowRef(milliseconds)
  let timer = -1

  function clear () {
    clearInterval(timer)
  }

  function reset () {
    clear()

    nextTick(() => time.value = milliseconds)
  }

  function start (el?: HTMLElement) {
    const style = el ? getComputedStyle(el) : { transitionDuration: 0.2 }
    const interval = parseFloat(style.transitionDuration) * 1000 || 200

    clear()

    if (time.value <= 0) return

    const startTime = performance.now()
    timer = window.setInterval(() => {
      const elapsed = performance.now() - startTime + interval
      time.value = Math.max(milliseconds - elapsed, 0)

      if (time.value <= 0) clear()
    }, interval)
  }

  onScopeDispose(clear)

  return { clear, time, start, reset }
}

export const makeVSnackbarProps = propsFactory({
  multiLine: Boolean,
  text: String,
  timer: [Boolean, String],
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
    const countdown = useCountdown(Number(props.timeout))

    const overlay = ref<VOverlay>()
    const timerRef = ref<VProgressLinear>()
    const isHovering = shallowRef(false)

    watch(isActive, startTimeout)
    watch(() => props.timeout, startTimeout)

    onMounted(() => {
      if (isActive.value) startTimeout()
    })

    let activeTimeout = -1
    function startTimeout () {
      countdown.reset()
      window.clearTimeout(activeTimeout)
      const timeout = Number(props.timeout)

      if (!isActive.value || timeout === -1) return

      const element = refElement(timerRef.value)

      countdown.start(element)

      activeTimeout = window.setTimeout(() => {
        isActive.value = false
      }, timeout)
    }

    function clearTimeout () {
      countdown.reset()
      window.clearTimeout(activeTimeout)
    }

    function onPointerenter () {
      isHovering.value = true
      clearTimeout()
    }

    function onPointerleave () {
      isHovering.value = false
      startTimeout()
    }

    useRender(() => {
      const overlayProps = VOverlay.filterProps(props)
      const hasContent = !!(slots.default || slots.text || props.text)

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
            onPointerleave,
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

          { props.timer && !isHovering.value && (
            <div key="timer" class="v-snackbar__timer">
              <VProgressLinear
                ref={ timerRef }
                color={ typeof props.timer === 'string' ? props.timer : 'info' }
                max={ props.timeout }
                model-value={ countdown.time.value }
              />
            </div>
          )}

          { hasContent && (
            <div
              key="content"
              class="v-snackbar__content"
              role="status"
              aria-live="polite"
            >
              { slots.text?.() ?? props.text }

              { slots.default?.() }
            </div>
          )}

          { slots.actions && (
            <VDefaultsProvider
              defaults={{
                VBtn: {
                  variant: 'text',
                  ripple: false,
                  slim: true,
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
