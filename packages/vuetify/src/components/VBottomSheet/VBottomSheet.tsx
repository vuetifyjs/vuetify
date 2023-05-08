// Styles
import './VBottomSheet.sass'

// Components
import { makeVDialogProps, VDialog } from '@/components/VDialog/VDialog'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const makeVBottomSheetProps = propsFactory({
  inset: Boolean,

  ...makeVDialogProps({
    contentClass: 'v-bottom-sheet__content',
    transition: 'bottom-sheet-transition',
  }),
}, 'v-bottom-sheet')

export const VBottomSheet = genericComponent<OverlaySlots>()({
  name: 'VBottomSheet',

  props: makeVBottomSheetProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')

    useRender(() => {
      const [dialogProps] = VDialog.filterProps(props)

      return (
        <VDialog
          { ...dialogProps }
          v-model={ isActive.value }
          class={[
            'v-bottom-sheet',
            {
              'v-bottom-sheet--inset': props.inset,
            },
          ]}
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VBottomSheet = InstanceType<typeof VBottomSheet>
