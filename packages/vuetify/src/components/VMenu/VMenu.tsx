// Styles
import './VMenu.sass'

// Directives
import ClickOutside from '@/directives/click-outside'
import Resize from '@/directives/resize'

// Utilities
import {
  defineComponent,
} from '@/util'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeTransitionProps } from '@/composables/transition'
import { VDialogTransition, VOverlay } from '@/components'
import { useProxiedModel } from '@/composables/proxiedModel'
import { withDirectives } from 'vue'

export default defineComponent({
  name: 'VMenu',

  directives: {
    ClickOutside,
    Resize,
  },

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
      transition: false,
    }),
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
