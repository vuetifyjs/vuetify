// Styles
import './VFeatureDiscovery.sass'

// Components
// TODO: create it inside VFeatureDiscovery
import { makeLocationStrategyProps, useLocationStrategies } from '@/components/VOverlay/locationStrategies'
import { makeScrollStrategyProps, useScrollStrategies } from '@/components/VOverlay/scrollStrategies'
import { makeActivatorProps, useActivator } from '@/components/VOverlay/useActivator'

// Composables
import { useRtl } from '@/composables'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useHydration } from '@/composables/hydration'
import { makeLazyProps, useLazy } from '@/composables/lazy'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useBackButton, useRouter } from '@/composables/router'
import { useScopeId } from '@/composables/scopeId'
import { useStack } from '@/composables/stack'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useToggleScope } from '@/composables/toggleScope'

// Directives
import { ClickOutside } from '@/directives'

// Utilities
import { computed, mergeProps, onBeforeUnmount, ref, toRef, watch } from 'vue'
import { genericComponent, getUid, IN_BROWSER, propsFactory, useRender } from '@/util'

// Types
// TODO: create it inside VFeatureDiscovery
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const makeVFeatureDiscoveryProps = propsFactory({
  id: String,
  text: String,
  color: {
    type: String,
    default: 'primary',
  },
  // TODO: calculate "textColor" based on "color"
  textColor: {
    type: String,
    default: 'white',
  },
  highlightColor: {
    type: String,
    default: 'white',
  },
  closeOnBack: {
    type: Boolean,
    default: true,
  },
  flat: Boolean,
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  noClickAnimation: Boolean,
  modelValue: Boolean,
  edgeX: {
    type: [Number, String],
    default: 200,
    validator: (v: string | number) => {
      const value = parseInt(v, 10)
      return !isNaN(value) && value >= 0
    },
  },
  edgeY: {
    type: [Number, String],
    default: 144,
    validator: (v: string | number) => {
      const value = parseInt(v, 10)
      return !isNaN(value) && value >= 0
    },
  },
  zIndex: {
    type: [Number, String],
    default: 2000,
  },

  ...makeActivatorProps(),
  ...makeComponentProps(),
  ...makeLazyProps(),
  ...makeLocationStrategyProps({
    location: 'center' as const,
    locationStrategy: 'featureDiscovery' as const,
  }),
  ...makeScrollStrategyProps(),
  ...makeThemeProps(),
}, 'VFeatureDiscovery')

export const VFeatureDiscovery = genericComponent<OverlaySlots>()({
  name: 'VFeatureDiscovery',

  directives: { ClickOutside },

  props: {
    _disableGlobalStack: Boolean,

    ...makeVFeatureDiscoveryProps(),
  },

  emits: {
    'click:outside': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots, attrs, emit }) {
    const model = useProxiedModel(props, 'modelValue')
    const isActive = computed({
      get: () => model.value,
      set: v => {
        if (!(v && props.disabled)) model.value = v
      },
    })
    const isFlat = computed(() => props.flat)
    const { themeClasses } = provideTheme(props)
    const { rtlClasses, isRtl } = useRtl()
    const { hasContent, onAfterLeave: _onAfterLeave } = useLazy(props, isActive)
    const backdropColor = useBackgroundColor(computed(() => {
      return typeof props.color === 'string' ? props.color : null
    }))
    const wrapTextColor = useTextColor(toRef(props, 'textColor'))
    const highlightColor = useBackgroundColor(computed(() => {
      return typeof props.highlightColor === 'string' ? props.highlightColor : null
    }))
    const { globalTop, localTop, stackStyles } = useStack(isActive, toRef(props, 'zIndex'), props._disableGlobalStack)
    const {
      activatorEl, activatorRef,
      target, targetEl, targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents,
    } = useActivator(props, { isActive, isTop: localTop })
    const isMounted = useHydration()
    const { scopeId } = useScopeId()

    const root = ref<HTMLElement>()
    const scrimEl = ref<HTMLElement>()
    const contentEl = ref<HTMLElement>()
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

      isActive.value = false
    }

    function closeConditional (e: Event) {
      return isActive.value && globalTop.value
      /*
        && (
        // If using scrim, only close if clicking on it rather than anything opened on top
        !props.scrim || e.target === scrimEl.value
      )
      */
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
        isActive.value = false
        if (contentEl.value?.contains(document.activeElement)) {
          activatorEl.value?.focus()
        }
      }
    }

    const router = useRouter()
    useToggleScope(() => props.closeOnBack, () => {
      useBackButton(router, next => {
        if (globalTop.value && isActive.value) {
          next(false)
          isActive.value = false
        } else {
          next()
        }
      })
    })

    const uid = getUid()
    const id = computed(() => props.id || `v-feature-discovery-${uid}`)

    useRender(() => {
      return (
        <div
          class={[
            'v-feature-discovery',
            {
              'v-feature-discovery--inline': !!slots.activator,
            },
            themeClasses.value,
            rtlClasses.value,
            props.class,
          ]}
          style={[
            stackStyles.value,
            {},
            props.style,
          ]}
          ref={ root }
          { ...scopeId }
          { ...attrs }
        >
          { slots.activator?.({
            isActive: isActive.value,
            targetRef,
            props: mergeProps({
              ref: activatorRef,
            }, activatorEvents.value, {
              'aria-haspopup': 'dialog',
              'aria-expanded': String(isActive.value),
              'aria-owns': id.value,
            }, props.activatorProps),
          })}

          { isMounted.value && hasContent.value && (
            <div
              ref={ contentEl }
              v-show={ isActive.value }
              v-click-outside={{
                handler: onClickOutside,
                closeConditional,
                include: () => [activatorEl.value],
              }}
              class={[
                'v-feature-discovery__content',
                {
                  // 'v-feature-discovery__content--fixed': this.activatorFixed,
                  'v-feature-discovery__content--flat': isFlat.value,
                  'v-feature-discovery__content--active': isActive.value,
                  // 'v-feature-discovery__content--no-ripple': this.noRipple,
                },
                props.contentClass,
              ]}
              style={[
                // dimensionStyles.value,
                contentStyles.value,
                {
                  zIndex: 'var(--v-feature-discovery-content-z-index)',
                },
              ]}
              { ...contentEvents.value }
              { ...props.contentProps }
            >
              <div
                class={[
                  'v-feature-discovery__backdrop',
                  backdropColor.backgroundColorClasses.value,
                ]}
                style={[
                  backdropColor.backgroundColorStyles.value,
                  {
                    top: 'var(--v-feature-discovery-backdrop-top)',
                    left: 'var(--v-feature-discovery-backdrop-left)',
                    height: 'var(--v-feature-discovery-backdrop-height)',
                    width: 'var(--v-feature-discovery-backdrop-width)',
                    transformOrigin: 'var(--v-feature-discovery-backdrop-transformOrigin)',
                  },
                ]}
              />
              <div
                class={[
                  'v-feature-discovery__highlight',
                  highlightColor.backgroundColorClasses.value,
                ]}
                style={[
                  highlightColor.backgroundColorStyles.value,
                  {
                    top: 'var(--v-feature-discovery-highlight-top)',
                    left: 'var(--v-feature-discovery-highlight-left)',
                    height: 'var(--v-feature-discovery-highlight-height)',
                    width: 'var(--v-feature-discovery-highlight-width)',
                  }]}
              />
              <div
                class={[
                  'v-feature-discovery__wrap',
                  wrapTextColor.textColorClasses.value,
                ]}
                style={[
                  wrapTextColor.textColorStyles.value,
                  {
                    top: 'var(--v-feature-discovery-wrap-top)',
                    left: 'var(--v-feature-discovery-wrap-left)',
                    height: 'var(--v-feature-discovery-wrap-height)',
                    width: 'var(--v-feature-discovery-wrap-width)',
                    padding: 'var(--v-feature-discovery-wrap-padding)',
                  },
                ]}
              >
                { slots.default?.({ isActive }) ?? props.text }
              </div>
            </div>
          )}
        </div>
      )
    })

    return {
      activatorEl,
      target,
      contentEl,
      globalTop,
      localTop,
      updateLocation,
    }
  },
})

export type VFeatureDiscovery = InstanceType<typeof VFeatureDiscovery>
