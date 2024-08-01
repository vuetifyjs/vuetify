// Styles
import './VFeatureDiscovery.sass'

// Components
import { VOverlay } from '@/components/VOverlay'
import { makeVOverlayProps } from '@/components/VOverlay/VOverlay'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'

// Utilities
import { computed, mergeProps, ref } from 'vue'
import { genericComponent, getUid, omit, propsFactory, useRender } from '@/util'

// Types
import type { StrategyProps } from '@/components/VOverlay/locationStrategies'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const makeVFeatureDiscoveryProps = propsFactory({
  id: String,
  text: String,

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

  ...omit(makeVOverlayProps({
    closeOnBack: false,
    location: 'center' as const,
    locationStrategy: 'featureDiscovery' as const,
    eager: true,
    minWidth: 0,
    offset: 0,
    openOnClick: false,
    openOnHover: false,
    origin: 'center' as const,
    scrim: false,
    scrollStrategy: 'block' as const,
    transition: false,
  }), [
    'absolute',
    'persistent',
  ]),
}, 'VFeatureDiscovery')

export const VFeatureDiscovery = genericComponent<OverlaySlots>()({
  name: 'VFeatureDiscovery',

  props: makeVFeatureDiscoveryProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { scopeId } = useScopeId()

    const uid = getUid()
    const id = computed(() => props.id || `v-feature-discovery-${uid}`)

    const overlay = ref<VOverlay>()

    const location = computed(() => {
      return props.location.split(' ').length > 1
        ? props.location
        : props.location + ' center' as StrategyProps['location']
    })

    const origin = computed(() => {
      return (
        props.origin === 'auto' ||
        props.origin === 'overlap' ||
        props.origin.split(' ').length > 1 ||
        props.location.split(' ').length > 1
      ) ? props.origin
        : props.origin + ' center' as StrategyProps['origin']
    })

    const transition = computed(() => {
      if (props.transition) return props.transition
      return isActive.value ? 'scale-transition' : 'fade-transition'
    })

    const activatorProps = computed(() =>
      mergeProps({
        'aria-haspopup': 'dialog',
        'aria-expanded': String(isActive.value),
        'aria-owns': id.value,
      }, props.activatorProps)
    )

    useRender(() => {
      const overlayProps = VOverlay.filterProps(props)

      return (
        <VOverlay
          ref={ overlay }
          class={[
            'v-feature-discovery',
            props.class,
          ]}
          style={ props.style }
          id={ id.value }
          { ...overlayProps }
          v-model={ isActive.value }
          transition={ transition.value }
          absolute
          location={ location.value }
          origin={ origin.value }
          persistent
          scrim="transparent"
          role="dialog"
          activatorProps={ activatorProps.value }
          _disableGlobalStack
          { ...scopeId }
        >
          {{
            activator: slots.activator,
            default: (...args) =>
              (
                <>
                  <div class="v-feature-discovery__highlight"></div>
                  <div class="v-feature-discovery__content">
                    { slots.default?.(...args) ?? props.text }
                  </div>
                </>
              ),
          }}
        </VOverlay>
      )
    })

    return forwardRefs({}, overlay)
  },
})

export type VFeatureDiscovery = InstanceType<typeof VFeatureDiscovery>
