// Styles
import './VTooltip.sass'

// Utilities
import {
  defineComponent, getUid,
} from '@/util'
import { makeTransitionProps } from '@/composables/transition'
import { VOverlay } from '@/components'
import { useProxiedModel } from '@/composables/proxiedModel'
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { StrategyProps } from '@/components/VOverlay/positionStrategies'

export default defineComponent({
  name: 'VTooltip',

  props: {
    id: String,
    modelValue: Boolean,
    text: String,

    anchor: {
      type: String as PropType<StrategyProps['anchor']>,
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

    const uid = getUid()

    const id = computed(() => props.id || `v-tooltip-${uid}`)

    const anchor = computed(() => {
      return props.anchor.split(' ').length > 1
        ? props.anchor
        : props.anchor + ' center' as StrategyProps['anchor']
    })

    const origin = computed(() => {
      return (
        props.origin === 'auto' ||
        props.origin === 'overlap' ||
        props.origin.split(' ').length > 1 ||
        props.anchor.split(' ').length > 1
      ) ? props.origin
        : props.origin + ' center' as StrategyProps['origin']
    })

    const transition = computed(() => {
      if (props.transition) return props.transition
      return isActive.value ? 'scale-transition' : 'fade-transition'
    })

    return () => {
      return (
        <VOverlay
          v-model={ isActive.value }
          class={[
            'v-tooltip',
          ]}
          id={ id.value }
          transition={ transition.value }
          absolute
          positionStrategy="connected"
          scrollStrategy="reposition"
          anchor={ anchor.value }
          origin={ origin.value }
          min-width={ 0 }
          offset={ 10 }
          scrim={ false }
          aria-role="dialog"
          aria-modal="true"
          activatorProps={{
            'aria-describedby': id,
          }}
          { ...attrs }
          v-slots={{
            activator: slots.activator,
          }}
        >
          { slots.default?.() ?? props.text }
        </VOverlay>
      )
    }
  },
})
