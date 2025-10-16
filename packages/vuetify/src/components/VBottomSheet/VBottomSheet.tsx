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
    transition: 'bottom-sheet-transition',
  }),
}, 'VBottomSheet')

export const VBottomSheet = genericComponent<OverlaySlots>()({
  name: 'VBottomSheet',

  props: makeVBottomSheetProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')

    useRender(() => {
      const dialogProps = VDialog.filterProps(props)

      return (
        <VDialog
          { ...dialogProps }
          contentClass={[
            'v-bottom-sheet__content',
            props.contentClass,
          ]}
          v-model={ isActive.value }
          class={[
            'v-bottom-sheet',
            {
              'v-bottom-sheet--inset': props.inset,
            },
            props.class,
          ]}
          style={ props.style }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VBottomSheet = InstanceType<typeof VBottomSheet>
