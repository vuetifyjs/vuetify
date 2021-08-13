// Styles
import './VMenu.sass'

// Utilities
import {
  defineComponent,
} from '@/util'
import { makeTransitionProps } from '@/composables/transition'
import { VDialogTransition, VOverlay } from '@/components'
import { useProxiedModel } from '@/composables/proxiedModel'

export default defineComponent({
  name: 'VMenu',

  props: {
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    closeOnContentClick: {
      type: Boolean,
      default: true,
    },
    disableKeys: Boolean,
    modelValue: Boolean,
    openOnClick: {
      type: Boolean,
      default: true,
    },
    openOnHover: Boolean,

    ...makeTransitionProps({
      transition: { component: VDialogTransition },
    } as const),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')

    return () => {
      return (
        <VOverlay
          v-model={ isActive.value }
          class={[
            'v-menu',
          ]}
          transition={ props.transition }
          absolute
          positionStrategy="connected"
          scrollStrategy="reposition"
          scrim={ false }
          aria-role="dialog"
          aria-modal="true"
          activatorProps={{
            'aria-haspopup': 'menu',
            'aria-expanded': String(isActive.value),
          }}
          { ...attrs }
          v-slots={{
            default: slots.default,
            activator: slots.activator,
          }}
        />
      )
    }
  },
})
