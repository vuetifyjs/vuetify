// Styles
import './VMenu.sass'

// Components
import { VOverlay } from '@/components/VOverlay'
import { VDialogTransition } from '@/components/transitions'

// Composables
import { makeTransitionProps } from '@/composables/transition'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { genericComponent, getUid } from '@/util'

// Types
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const VMenu = genericComponent<new () => {
  $slots: OverlaySlots
}>()({
  name: 'VMenu',

  inheritAttrs: false,

  props: {
    // TODO
    // closeOnClick: {
    //   type: Boolean,
    //   default: true,
    // },
    // closeOnContentClick: {
    //   type: Boolean,
    //   default: true,
    // },
    disableKeys: Boolean,
    modelValue: Boolean,
    id: String,

    ...makeTransitionProps({
      transition: { component: VDialogTransition },
    } as const),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')

    const uid = getUid()
    const id = computed(() => props.id || `v-menu-${uid}`)

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
          activatorProps={{
            'aria-haspopup': 'menu',
            'aria-expanded': String(isActive.value),
            'aria-owns': id.value,
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

export type VMenu = InstanceType<typeof VMenu>
