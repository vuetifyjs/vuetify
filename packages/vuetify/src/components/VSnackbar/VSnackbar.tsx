// Styles
import './VSnackbar.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VOverlay } from '@/components/VOverlay'
import { makeVOverlayProps } from '@/components/VOverlay/VOverlay'
import { VProgressCircular } from '@/components/VProgressCircular'
import { VProgressLinear } from '@/components/VProgressLinear'
import { useSnackbarItem } from '@/components/VSnackbarQueue/queue'

// Composables
import { useLayout } from '@/composables'
import { forwardRefs } from '@/composables/forwardRefs'
import { IconValue } from '@/composables/icons'
import { VuetifyLayoutKey } from '@/composables/layout'
import { makeLocationProps } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useScopeId } from '@/composables/scopeId'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useToggleScope } from '@/composables/toggleScope'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { computed, inject, mergeProps, nextTick, onMounted, onScopeDispose, ref, shallowRef, watch, watchEffect } from 'vue'
import { convertToUnit, genericComponent, omit, propsFactory, refElement, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'

type VSnackbarSlots = {
  activator: { isActive: boolean, props: Record<string, any> }
  default: never
  prepend: never
  actions: { isActive: Ref<boolean> }
  text: never
}

function useCountdown (milliseconds: () => number) {
  const time = shallowRef(milliseconds())
  let timer = -1

  function clear () {
    clearInterval(timer)
  }

  function reset () {
    clear()

    nextTick(() => time.value = milliseconds())
  }

  function start (el?: HTMLElement) {
    const style = el ? getComputedStyle(el) : { transitionDuration: 0.2 }
    const interval = parseFloat(style.transitionDuration) * 1000 || 200

    clear()

    if (time.value <= 0) return

    const startTime = performance.now()
    timer = window.setInterval(() => {
      const elapsed = performance.now() - startTime + interval
      time.value = Math.max(milliseconds() - elapsed, 0)

      if (time.value <= 0) clear()
    }, interval)
  }

  onScopeDispose(clear)

  return { clear, time, start, reset }
}

export const makeVSnackbarProps = propsFactory({
  loading: Boolean,
  prependAvatar: String,
  prependIcon: IconValue,
  title: String,
  text: String,
  reverseTimer: Boolean,
  timer: {
    type: [Boolean, String] as PropType<boolean | 'top' | 'bottom'>,
    default: false,
  },
  timerColor: String,
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
  }), [
    'persistent',
    'noClickAnimation',
    'offset',
    'retainFocus',
    'captureFocus',
    'disableInitialFocus',
    'scrim',
    'scrollStrategy',
    'stickToTarget',
    'viewportMargin',
  ]),
}, 'VSnackbar')

export const VSnackbar = genericComponent<VSnackbarSlots>()({
  name: 'VSnackbar',

  props: makeVSnackbarProps(),

  emits: {
    'update:modelValue': (v: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { positionClasses } = usePosition(props)
    const { scopeId } = useScopeId()
    const { themeClasses } = provideTheme(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(props)
    const { roundedClasses } = useRounded(props)
    const countdown = useCountdown(() => Number(props.timeout))

    const overlay = ref<VOverlay>()
    const queueItem = useSnackbarItem(isActive, () => overlay.value?.contentEl)
    let _lastOffset: string

    const timerRef = ref<VProgressLinear>()
    const isHovering = shallowRef(false)
    const isFocused = shallowRef(false)
    const startY = shallowRef(0)
    const mainStyles = ref()
    const hasLayout = inject(VuetifyLayoutKey, undefined)

    useToggleScope(() => !!hasLayout, () => {
      const layout = useLayout()

      watchEffect(() => {
        mainStyles.value = layout.mainStyles.value
      })
    })

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

      nextTick(() => countdown.start(element))

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
      if (!isFocused.value) startTimeout()
    }

    function onFocusin () {
      isFocused.value = true
      clearTimeout()
    }

    function onFocusout (event: FocusEvent) {
      const contentEl = overlay.value?.contentEl
      if (contentEl?.contains(event.relatedTarget as Node)) {
        return
      }
      isFocused.value = false
      if (!isHovering.value) startTimeout()
    }

    function onTouchstart (event: TouchEvent) {
      startY.value = event.touches[0].clientY
    }

    function onTouchend (event: TouchEvent) {
      if (Math.abs(startY.value - event.changedTouches[0].clientY) > 50) {
        isActive.value = false
      }
    }

    function onAfterLeave () {
      if (isHovering.value) onPointerleave()
      isFocused.value = false
    }

    const locationClasses = computed(() => {
      return props.location.split(' ').reduce((acc, loc) => {
        acc[`v-snackbar--${loc}`] = true

        return acc
      }, {} as Record<string, any>)
    })

    const offset = computed(() => {
      if (!queueItem) return {}
      const [side, align] = props.location.split(' ')
      const direction = side === 'bottom' || (['left', 'right'].includes(side) && align === 'end') ? -1 : 1

      if (queueItem.offset.value === null) {
        return _lastOffset
      }

      return _lastOffset = convertToUnit(direction * queueItem.offset.value)
    })

    const transition = computed(() => {
      if (typeof props.transition !== 'string' || !props.transition.endsWith('-auto')) {
        return props.transition
      }

      const [side, align] = props.location.split(' ')
      const direction = ['start', 'end', 'left', 'right'].includes(align) || ['left', 'right'].includes(side) ? 'x' : 'y'
      const reverse = ['end', 'right'].includes(align) || ['bottom', 'right'].includes(side) ? '-reverse' : ''
      const prefix = props.transition.replace('-auto', '')

      return `${prefix}-${direction}${reverse}-transition`
    })

    useRender(() => {
      const overlayProps = omit(VOverlay.filterProps(props), ['transition'])
      const hasPrependMedia = !!(props.prependAvatar || props.prependIcon)
      const hasPrepend = !!(hasPrependMedia || props.loading || slots.prepend)
      const hasContent = !!(slots.default || slots.text || props.text)

      return (
        <VOverlay
          ref={ overlay }
          class={[
            'v-snackbar',
            {
              'v-snackbar--active': isActive.value,
              'v-snackbar--timer': !!props.timer,
              'v-snackbar--vertical': props.vertical,
            },
            locationClasses.value,
            positionClasses.value,
            props.class,
          ]}
          style={[
            mainStyles.value,
            {
              '--v-snackbar-offset': offset.value,
            },
            props.style,
          ]}
          { ...overlayProps }
          transition={ transition.value }
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
              colorStyles.value,
            ],
            onPointerenter,
            onPointerleave,
            onFocusin,
            onFocusout,
          }, overlayProps.contentProps)}
          persistent
          noClickAnimation
          scrim={ false }
          scrollStrategy="none"
          _disableGlobalStack
          onTouchstartPassive={ onTouchstart }
          onTouchend={ onTouchend }
          onAfterLeave={ onAfterLeave }
          { ...scopeId }
          v-slots={{ activator: slots.activator }}
        >
          { genOverlays(false, 'v-snackbar') }

          { props.timer && !isHovering.value && (
            <div
              key="timer"
              class={[
                'v-snackbar__timer',
                `v-snackbar__timer--${props.timer === 'bottom' ? 'bottom' : 'top'}`,
              ]}
            >
              <VProgressLinear
                ref={ timerRef }
                color={ props.timerColor ?? 'info' }
                max={ props.timeout }
                modelValue={ props.reverseTimer ? Number(props.timeout) - countdown.time.value : countdown.time.value }
              />
            </div>
          )}

          { hasPrepend && (
            <VDefaultsProvider
              key="prepend-defaults"
              disabled={ !hasPrependMedia && !props.loading }
              defaults={{
                VAvatar: {
                  image: props.prependAvatar,
                },
                VIcon: {
                  icon: props.prependIcon,
                },
                VProgressCircular: {
                  indeterminate: true,
                  size: 24,
                  width: 3,
                },
              }}
            >
              <div class="v-snackbar__prepend">
                { slots.prepend
                  ? slots.prepend()
                  : (
                    <>
                      { props.loading && <VProgressCircular /> }
                      { !props.loading && props.prependAvatar && <VAvatar /> }
                      { !props.loading && props.prependIcon && <VIcon /> }
                    </>
                  )
                }
              </div>
            </VDefaultsProvider>
          )}

          { hasContent && (
            <div
              key="content"
              class="v-snackbar__content"
              role="status"
              aria-live="polite"
            >
              { props.title ? (<div class="v-snackbar__title" key="title">{ props.title }</div>) : '' }
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
                { slots.actions({ isActive }) }
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
