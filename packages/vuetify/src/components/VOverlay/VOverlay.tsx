// Styles
import './VOverlay.sass'

// Composables
import { makeActivatorProps, useActivator } from './useActivator'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeLazyProps, useLazy } from '@/composables/lazy'
import { makeLocationStrategyProps, useLocationStrategies } from './locationStrategies'
import { makeScrollStrategyProps, useScrollStrategies } from './scrollStrategies'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useBackButton, useRouter } from '@/composables/router'
import { useBackgroundColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRtl } from '@/composables/rtl'
import { useStack } from '@/composables/stack'
import { useTeleport } from '@/composables/teleport'
import { useToggleScope } from '@/composables/toggleScope'

// Directives
import { ClickOutside } from '@/directives/click-outside'

// Utilities
import {
  convertToUnit,
  genericComponent,
  getScrollParent,
  IN_BROWSER,
  standardEasing,
  useRender,
} from '@/util'
import {
  computed,
  mergeProps,
  ref,
  Teleport,
  toHandlers,
  toRef,
  Transition,
  watch,
} from 'vue'

// Types
import type { BackgroundColorData } from '@/composables/color'
import type { MakeSlots } from '@/util'
import type { PropType, Ref } from 'vue'

interface ScrimProps {
  [key: string]: unknown
  modelValue: boolean
  color: BackgroundColorData
}
function Scrim (props: ScrimProps) {
  const { modelValue, color, ...rest } = props
  return (
    <Transition name="fade-transition" appear>
      { props.modelValue && (
        <div
          class={[
            'v-overlay__scrim',
            props.color.backgroundColorClasses.value,
          ]}
          style={ props.color.backgroundColorStyles.value }
          { ...rest }
        />
      )}
    </Transition>
  )
}

export type OverlaySlots = MakeSlots<{
  default: [{ isActive: Ref<boolean> }]
  activator: [{ isActive: boolean, props: Record<string, any> }]
}>

export const VOverlay = genericComponent<new () => {
  $slots: OverlaySlots
}>()({
  name: 'VOverlay',

  directives: { ClickOutside },

  inheritAttrs: false,

  props: {
    absolute: Boolean,
    attach: [Boolean, String, Object] as PropType<boolean | string | Element>,
    closeOnBack: {
      type: Boolean,
      default: true,
    },
    contained: Boolean,
    contentClass: null,
    contentProps: null,
    disabled: Boolean,
    noClickAnimation: Boolean,
    modelValue: Boolean,
    persistent: Boolean,
    scrim: {
      type: [String, Boolean],
      default: true,
    },
    zIndex: {
      type: [Number, String],
      default: 2000,
    },

    ...makeActivatorProps(),
    ...makeDimensionProps(),
    ...makeLazyProps(),
    ...makeLocationStrategyProps(),
    ...makeScrollStrategyProps(),
    ...makeThemeProps(),
    ...makeTransitionProps(),
  },

  emits: {
    'click:outside': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
    afterLeave: () => true,
  },

  setup (props, { slots, attrs, emit }) {
    const model = useProxiedModel(props, 'modelValue')
    const isActive = computed({
      get: () => model.value,
      set: v => {
        if (!(v && props.disabled)) model.value = v
      },
    })
    const { teleportTarget } = useTeleport(computed(() => props.attach || props.contained))
    const { themeClasses } = provideTheme(props)
    const { rtlClasses, isRtl } = useRtl()
    const { hasContent, onAfterLeave } = useLazy(props, isActive)
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null
    }))
    const { isTop, stackStyles } = useStack(isActive, toRef(props, 'zIndex'))
    const { activatorEl, activatorRef, activatorEvents, contentEvents } = useActivator(props, { isActive, isTop })
    const { dimensionStyles } = useDimension(props)

    watch(() => props.disabled, v => {
      if (v) isActive.value = false
    })

    const root = ref<HTMLElement>()
    const contentEl = ref<HTMLElement>()
    const { contentStyles, updateLocation } = useLocationStrategies(props, {
      isRtl,
      contentEl,
      activatorEl,
      isActive,
    })
    useScrollStrategies(props, {
      root,
      contentEl,
      activatorEl,
      isActive,
      updateLocation,
    })

    function onClickOutside (e: MouseEvent) {
      emit('click:outside', e)

      if (!props.persistent) isActive.value = false
      else animateClick()
    }

    function closeConditional () {
      return isActive.value && isTop.value
    }

    IN_BROWSER && watch(isActive, val => {
      if (val) {
        window.addEventListener('keydown', onKeydown)
      } else {
        window.removeEventListener('keydown', onKeydown)
      }
    }, { immediate: true })

    function onKeydown (e: KeyboardEvent) {
      if (e.key === 'Escape' && isTop.value) {
        if (!props.persistent) {
          isActive.value = false
        } else animateClick()
      }
    }

    const router = useRouter()
    useToggleScope(() => props.closeOnBack, () => {
      useBackButton(router, next => {
        if (isTop.value && isActive.value) {
          next(false)
          if (!props.persistent) isActive.value = false
          else animateClick()
        } else {
          next()
        }
      })
    })

    const top = ref<number>()
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, val => {
      if (val) {
        const scrollParent = getScrollParent(root.value)
        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop
        }
      }
    })

    // Add a quick "bounce" animation to the content
    function animateClick () {
      if (props.noClickAnimation) return

      contentEl.value?.animate([
        { transformOrigin: 'center' },
        { transform: 'scale(1.03)' },
        { transformOrigin: 'center' },
      ], {
        duration: 150,
        easing: standardEasing,
      })
    }

    useRender(() => (
      <>
        { slots.activator?.({
          isActive: isActive.value,
          props: mergeProps({
            ref: activatorRef,
          }, toHandlers(activatorEvents.value), props.activatorProps),
        }) }

        { IN_BROWSER && (
          <Teleport
            disabled={ !teleportTarget.value }
            to={ teleportTarget.value }
          >
            { hasContent.value && (
              <div
                class={[
                  'v-overlay',
                  {
                    'v-overlay--absolute': props.absolute || props.contained,
                    'v-overlay--active': isActive.value,
                    'v-overlay--contained': props.contained,
                  },
                  themeClasses.value,
                  rtlClasses.value,
                ]}
                style={[stackStyles.value, { top: convertToUnit(top.value) }]}
                ref={ root }
                {...attrs}
              >
                <Scrim
                  color={ scrimColor }
                  modelValue={ isActive.value && !!props.scrim }
                />
                <MaybeTransition
                  appear
                  persisted
                  transition={ props.transition }
                  target={ activatorEl.value }
                  onAfterLeave={() => { onAfterLeave(); emit('afterLeave') }}
                >
                  <div
                    ref={ contentEl }
                    v-show={ isActive.value }
                    v-click-outside={{ handler: onClickOutside, closeConditional, include: () => [activatorEl.value] }}
                    class={[
                      'v-overlay__content',
                      props.contentClass,
                    ]}
                    style={[
                      dimensionStyles.value,
                      contentStyles.value,
                    ]}
                    { ...toHandlers(contentEvents.value) }
                    { ...props.contentProps }
                  >
                    { slots.default?.({ isActive }) }
                  </div>
                </MaybeTransition>
              </div>
            )}
          </Teleport>
        ) }
      </>
    ))

    return {
      activatorEl,
      animateClick,
      contentEl,
      isTop,
      updateLocation,
    }
  },
})

export type VOverlay = InstanceType<typeof VOverlay>
