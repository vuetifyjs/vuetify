// Styles
import './VBottomSheet.sass'

// Components
import { makeVDialogProps, VDialog } from '@/components/VDialog/VDialog'

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

  setup (props, { slots }) {
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
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VBottomSheet = InstanceType<typeof VBottomSheet>
