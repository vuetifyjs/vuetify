// Styles
import './VOverlay.sass'

// Composables
import { makeActivatorProps, useActivator } from './useActivator'
import { makeScrollStrategyProps, useScrollStrategies } from './scrollStrategies'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useBackButton } from '@/composables/router'
import { useBackgroundColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRtl } from '@/composables/rtl'
import { useTeleport } from '@/composables/teleport'

// Directives
import { ClickOutside } from '@/directives/click-outside'

// Utilities
import {
  convertToUnit,
  defineComponent,
  getScrollParent,
  standardEasing,
  useRender,
} from '@/util'
import {
  computed,
  mergeProps,
  nextTick,
  ref,
  Teleport,
  toRef,
  Transition,
  watch,
  watchEffect,
} from 'vue'

// Types
import type { Prop, PropType, Ref } from 'vue'
import type { BackgroundColorData } from '@/composables/color'

function useBooted (isActive: Ref<boolean>, eager: Ref<boolean>) {
  const isBooted = ref(eager.value)

  watchEffect(() => {
    if (eager.value || isActive.value) {
      isBooted.value = true
    }
  })

  return { isBooted }
}

const positionStrategies = [
  'static', // specific viewport position, usually centered
  'connected', // connected to a certain element
  'flexible', // connected to an element with the ability to overflow or shift if it doesn't fit in the screen
] as const

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

export default defineComponent({
  name: 'VOverlay',

  directives: { ClickOutside },

  inheritAttrs: false,

  props: {
    absolute: Boolean,
    attach: {
      type: [Boolean, String, Object] as PropType<boolean | string | Element>,
      default: 'body',
    },
    eager: Boolean,
    noClickAnimation: Boolean,
    modelValue: Boolean,
    origin: [String, Object] as Prop<string | Element>,
    persistent: Boolean,
    positionStrategy: {
      type: String as PropType<typeof positionStrategies[number]>,
      default: 'static',
      validator: (val: any) => positionStrategies.includes(val),
    },
    scrim: {
      type: [String, Boolean],
      default: true,
    },

    ...makeActivatorProps(),
    ...makeScrollStrategyProps(),
    ...makeThemeProps(),
    ...makeTransitionProps(),
  },

  emits: {
    'click:outside': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots, attrs, emit }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { teleportTarget } = useTeleport(toRef(props, 'attach'))
    const { themeClasses } = useTheme(props)
    const { rtlClasses } = useRtl()
    const { isBooted } = useBooted(isActive, toRef(props, 'eager'))
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null
    }))
    const { activatorEl, onActivatorClick } = useActivator(props, isActive)

    const contentEl = ref<HTMLElement>()
    useScrollStrategies(props, {
      contentEl,
      activatorEl,
      isActive,
    })

    watch(isActive, val => {
      nextTick(() => {
        if (val) {
          contentEl.value?.focus()
        } else {
          activatorEl.value?.focus()
        }
      })
    })

    function onClickOutside (e: MouseEvent) {
      emit('click:outside', e)

      if (!props.persistent) isActive.value = false
      else animateClick()
    }

    function closeConditional () {
      return isActive.value
    }

    function onKeydown (e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (!props.persistent) {
          isActive.value = false
        } else animateClick()
      }
    }

    useBackButton(next => {
      next(!isActive.value)

      if (!props.persistent) isActive.value = false
      else animateClick()
    })

    const root = ref()
    const top = ref<number>()
    watch(() => isActive.value && props.absolute && teleportTarget.value == null, val => {
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

    function onAfterLeave () {
      if (!props.eager) isBooted.value = false
    }

    useRender(() => (
      <>
        { slots.activator?.({
          isActive: isActive.value,
          props: mergeProps({
            modelValue: isActive.value,
            'onUpdate:modelValue': (val: boolean) => isActive.value = val,
            onClick: onActivatorClick,
          }, props.activatorProps),
        }) }
        <Teleport
          disabled={ !teleportTarget.value }
          ref={ root }
          to={ teleportTarget.value }
        >
          { isBooted.value && (
            <div
              class={[
                'v-overlay',
                {
                  'v-overlay--absolute': props.absolute,
                  'v-overlay--active': isActive.value,
                },
                themeClasses.value,
                rtlClasses.value,
              ]}
              style={ top.value != null ? `top: ${convertToUnit(top.value)}` : undefined }
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
                  v-click-outside={{ handler: onClickOutside, closeConditional }}
                  class="v-overlay__content"
                  tabindex={ -1 }
                  onKeydown={ onKeydown }
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
    }
  },
})
