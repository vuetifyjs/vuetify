// Styles
import './VBottomSheet.sass'

// Components
import { makeVDialogProps, VDialog } from '@/components/VDialog/VDialog'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VBottomSheet = genericComponent()({
  name: 'VBottomSheet',

  props: {
    inset: Boolean,

    ...makeVDialogProps({
      contentClass: 'v-bottom-sheet__content',
      transition: 'bottom-sheet-transition',
    }),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')

    useRender(() => {
      const [dialogProps] = VDialog.filterProps(props)

      return (
        <VDialog
          class={[
            'v-bottom-sheet',
            {
              'v-bottom-sheet--inset': props.inset,
            },
          ]}
          { ...dialogProps }
          v-model={ isActive.value }
          v-slots={{
            activator: slots.activator,
            default: slots.default,
          }}
        />
      )
    })

    return {}
  },
})

export type VBottomSheet = InstanceType<typeof VBottomSheet>
