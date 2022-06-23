// Styles
import './VTooltip.sass'

// Components
import { VOverlay } from '@/components/VOverlay'

// Composables
import { makeTransitionProps } from '@/composables/transition'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'

// Utilities
import { computed } from 'vue'
import { genericComponent, getUid, useRender } from '@/util'

// Types
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'
import type { PropType } from 'vue'
import type { StrategyProps } from '@/components/VOverlay/locationStrategies'

export const VTooltip = genericComponent<new () => {
  $slots: OverlaySlots
}>()({
  name: 'VTooltip',

  inheritAttrs: false,

  props: {
    id: String,
    modelValue: Boolean,
    text: String,

    location: {
      type: String as PropType<StrategyProps['location']>,
      default: 'end',
    },
    origin: {
      type: String as PropType<StrategyProps['origin']>,
      default: 'auto',
    },

    ...makeTransitionProps({
      transition: false,
    } as const),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { scopeId } = useScopeId()

    const uid = getUid()
    const id = computed(() => props.id || `v-tooltip-${uid}`)

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

    useRender(() => (
      <VOverlay
        v-model={ isActive.value }
        class={[
          'v-tooltip',
        ]}
        id={ id.value }
        transition={ transition.value }
        absolute
        locationStrategy="connected"
        scrollStrategy="reposition"
        location={ location.value }
        origin={ origin.value }
        min-width={ 0 }
        offset={ 10 }
        scrim={ false }
        persistent
        open-on-click={ false }
        open-on-hover
        close-on-back={ false }
        role="tooltip"
        eager
        activatorProps={{
          'aria-describedby': id.value,
        }}
        { ...scopeId }
        { ...attrs }
      >
        {{
          activator: slots.activator,
          default: (...args) => slots.default?.(...args) ?? props.text,
        }}
      </VOverlay>
    ))

    return {}
  },
})

export type VTooltip = InstanceType<typeof VTooltip>
