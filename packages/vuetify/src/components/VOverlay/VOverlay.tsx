// Styles
import './VOverlay.sass'

// Composables
import { makeActivatorProps, useActivator } from './useActivator'
import { makePositionStrategyProps, usePositionStrategies } from './positionStrategies'
import { makeScrollStrategyProps, useScrollStrategies } from './scrollStrategies'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useBackButton } from '@/composables/router'
import { useBackgroundColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRtl } from '@/composables/rtl'
import { useTeleport } from '@/composables/teleport'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeLazyProps, useLazy } from '@/composables/lazy'
import { useStack } from '@/composables/stack'

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
  Transition,
  watch,
} from 'vue'

// Types
import type { PropType, Ref } from 'vue'
import type { MakeSlots } from '@/util'
import type { BackgroundColorData } from '@/composables/color'

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
    contained: Boolean,
    contentClass: null,
    noClickAnimation: Boolean,
    modelValue: Boolean,
    persistent: Boolean,
    scrim: {
      type: [String, Boolean],
      default: true,
    },

    ...makeActivatorProps(),
    ...makeDimensionProps(),
    ...makePositionStrategyProps(),
    ...makeScrollStrategyProps(),
    ...makeThemeProps(),
    ...makeTransitionProps(),
    ...makeLazyProps(),
  },

  emits: {
    'click:outside': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots, attrs, emit }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { teleportTarget } = useTeleport(computed(() => props.attach || props.contained))
    const { themeClasses } = provideTheme(props)
    const { rtlClasses } = useRtl()
    const { hasContent, onAfterLeave } = useLazy(props, isActive)
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null
    }))
    const { activatorEl, activatorRef, activatorEvents } = useActivator(props, isActive)
    const { dimensionStyles } = useDimension(props)
    const { isTop } = useStack(isActive)

    const root = ref<HTMLElement>()
    const contentEl = ref<HTMLElement>()
    const { contentStyles, updatePosition } = usePositionStrategies(props, {
      contentEl,
      activatorEl,
      isActive,
    })
    useScrollStrategies(props, {
      root,
      contentEl,
      activatorEl,
      isActive,
      updatePosition,
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

    useBackButton(next => {
      if (isTop.value && isActive.value) {
        next(false)
        if (!props.persistent) isActive.value = false
        else animateClick()
      } else {
        next()
      }
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
              style={ top.value != null ? `top: ${convertToUnit(top.value)}` : undefined }
              ref={ root }
              {...attrs}
            >
              <Scrim
                color={ scrimColor }
                modelValue={ isActive.value && !!props.scrim }
              />
              <MaybeTransition
                appear
                onAfterLeave={ onAfterLeave }
                persisted
                transition={ props.transition }
                target={ activatorEl.value }
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
                >
                  { slots.default?.({ isActive }) }
                </div>
              </MaybeTransition>
            </div>
          )}
        </Teleport>
      </>
    ))

    return {
      animateClick,
      contentEl,
      activatorEl,
    }
  },
})

export type VOverlay = InstanceType<typeof VOverlay>
