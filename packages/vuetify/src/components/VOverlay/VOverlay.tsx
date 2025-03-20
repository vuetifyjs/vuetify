// Styles
import './VOverlay.sass'

// Composables
import { makeLocationStrategyProps, useLocationStrategies } from './locationStrategies'
import { makeScrollStrategyProps, useScrollStrategies } from './scrollStrategies'
import { makeActivatorProps, useActivator } from './useActivator'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useHydration } from '@/composables/hydration'
import { makeLazyProps, useLazy } from '@/composables/lazy'
import { useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useBackButton, useRouter } from '@/composables/router'
import { useScopeId } from '@/composables/scopeId'
import { useStack } from '@/composables/stack'
import { useTeleport } from '@/composables/teleport'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useToggleScope } from '@/composables/toggleScope'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Directives
import { ClickOutside } from '@/directives/click-outside'

// Utilities
import {
  computed,
  mergeProps,
  onBeforeUnmount,
  ref,
  Teleport,
  toRef,
  Transition,
  watch,
} from 'vue'
import {
  animate,
  convertToUnit,
  genericComponent,
  getCurrentInstance,
  getScrollParent,
  IN_BROWSER,
  propsFactory,
  standardEasing,
  useRender,
} from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { BackgroundColorData } from '@/composables/color'
import type { TemplateRef } from '@/util'

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

export type OverlaySlots = {
  default: { isActive: Ref<boolean> }
  activator: { isActive: boolean, props: Record<string, any>, targetRef: TemplateRef }
}

export const makeVOverlayProps = propsFactory({
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
  opacity: [Number, String],
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: true,
  },
  zIndex: {
    type: [Number, String],
    default: 2000,
  },

  ...makeActivatorProps(),
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps(),
  ...makeScrollStrategyProps(),
  ...makeThemeProps(),
  ...makeTransitionProps(),
}, 'VOverlay')

export const VOverlay = genericComponent<OverlaySlots>()({
  name: 'VOverlay',

  directives: { ClickOutside },

  inheritAttrs: false,

  props: {
    _disableGlobalStack: Boolean,

    ...makeVOverlayProps(),
  },

  emits: {
    'click:outside': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
    keydown: (e: KeyboardEvent) => true,
    afterEnter: () => true,
    afterLeave: () => true,
  },

  setup (props, { slots, attrs, emit }) {
    const vm = getCurrentInstance('VOverlay')
    const root = ref<HTMLElement>()
    const scrimEl = ref<HTMLElement>()
    const contentEl = ref<HTMLElement>()
    const model = useProxiedModel(props, 'modelValue')
    const isActive = computed({
      get: () => model.value,
      set: v => {
        if (!(v && props.disabled)) model.value = v
      },
    })
    const { themeClasses } = provideTheme(props)
    const { rtlClasses, isRtl } = useRtl()
    const { hasContent, onAfterLeave: _onAfterLeave } = useLazy(props, isActive)
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null
    }))
    const { globalTop, localTop, stackStyles } = useStack(isActive, toRef(props, 'zIndex'), props._disableGlobalStack)
    const {
      activatorEl, activatorRef,
      target, targetEl, targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents,
    } = useActivator(props, { isActive, isTop: localTop, contentEl })
    const { teleportTarget } = useTeleport(() => {
      const target = props.attach || props.contained
      if (target) return target
      const rootNode = activatorEl?.value?.getRootNode() || vm.proxy?.$el?.getRootNode()
      if (rootNode instanceof ShadowRoot) return rootNode
      return false
    })
    const { dimensionStyles } = useDimension(props)
    const isMounted = useHydration()
    const { scopeId } = useScopeId()

    watch(() => props.disabled, v => {
      if (v) isActive.value = false
    })

    const { contentStyles, updateLocation } = useLocationStrategies(props, {
      isRtl,
      contentEl,
      target,
      isActive,
    })
    useScrollStrategies(props, {
      root,
      contentEl,
      targetEl,
      isActive,
      updateLocation,
    })

    function onClickOutside (e: MouseEvent) {
      emit('click:outside', e)

      if (!props.persistent) isActive.value = false
      else animateClick()
    }

    function closeConditional (e: Event) {
      return isActive.value && globalTop.value && (
        // If using scrim, only close if clicking on it rather than anything opened on top
        !props.scrim || e.target === scrimEl.value || (e instanceof MouseEvent && e.shadowTarget === scrimEl.value)
      )
    }

    IN_BROWSER && watch(isActive, val => {
      if (val) {
        window.addEventListener('keydown', onKeydown)
      } else {
        window.removeEventListener('keydown', onKeydown)
      }
    }, { immediate: true })

    onBeforeUnmount(() => {
      if (!IN_BROWSER) return

      window.removeEventListener('keydown', onKeydown)
    })

    function onKeydown (e: KeyboardEvent) {
      if (e.key === 'Escape' && globalTop.value) {
        if (!contentEl.value?.contains(document.activeElement)) {
          emit('keydown', e)
        }
        if (!props.persistent) {
          isActive.value = false
          if (contentEl.value?.contains(document.activeElement)) {
            activatorEl.value?.focus()
          }
        } else animateClick()
      }
    }
    function onKeydownSelf (e: KeyboardEvent) {
      if (e.key === 'Escape' && !globalTop.value) return

      emit('keydown', e)
    }

    const router = useRouter()
    useToggleScope(() => props.closeOnBack, () => {
      useBackButton(router, next => {
        if (globalTop.value && isActive.value) {
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

      contentEl.value && animate(contentEl.value, [
        { transformOrigin: 'center' },
        { transform: 'scale(1.03)' },
        { transformOrigin: 'center' },
      ], {
        duration: 150,
        easing: standardEasing,
      })
    }

    function onAfterEnter () {
      emit('afterEnter')
    }

    function onAfterLeave () {
      _onAfterLeave()
      emit('afterLeave')
    }

    useRender(() => (
      <>
        { slots.activator?.({
          isActive: isActive.value,
          targetRef,
          props: mergeProps({
            ref: activatorRef,
          }, activatorEvents.value, props.activatorProps),
        })}

        { isMounted.value && hasContent.value && (
          <Teleport
            disabled={ !teleportTarget.value }
            to={ teleportTarget.value }
          >
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
                props.class,
              ]}
              style={[
                stackStyles.value,
                {
                  '--v-overlay-opacity': props.opacity,
                  top: convertToUnit(top.value),
                },
                props.style,
              ]}
              ref={ root }
              onKeydown={ onKeydownSelf }
              { ...scopeId }
              { ...attrs }
            >
              <Scrim
                color={ scrimColor }
                modelValue={ isActive.value && !!props.scrim }
                ref={ scrimEl }
                { ...scrimEvents.value }
              />
              <MaybeTransition
                appear
                persisted
                transition={ props.transition }
                target={ target.value }
                onAfterEnter={ onAfterEnter }
                onAfterLeave={ onAfterLeave }
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
                  { ...contentEvents.value }
                  { ...props.contentProps }
                >
                  { slots.default?.({ isActive }) }
                </div>
              </MaybeTransition>
            </div>
          </Teleport>
        )}
      </>
    ))

    return {
      activatorEl,
      scrimEl,
      target,
      animateClick,
      contentEl,
      globalTop,
      localTop,
      updateLocation,
    }
  },
})

export type VOverlay = InstanceType<typeof VOverlay>
