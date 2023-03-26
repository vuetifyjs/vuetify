// Styles
import './VBottomSheet.sass'

// Components
import { makeVDialogProps, VDialog } from '@/components/VDialog/VDialog'

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
        >
          {{
            activator: slots.activator,
            default: slots.default,
          }}
        </VDialog>
      )
    })

    return {}
  },
})

export type VBottomSheet = InstanceType<typeof VBottomSheet>

// import './VBottomSheet.sass'

// // Extensions
// import VDialog from '../VDialog/VDialog'

// /* @vue/component */
// export default VDialog.extend({
//   name: 'v-bottom-sheet',

//   props: {
//     inset: Boolean,
//     maxWidth: [String, Number],
//     transition: {
//       type: String,
//       default: 'bottom-sheet-transition',
//     },
//   },

//   computed: {
//     classes (): object {
//       return {
//         ...VDialog.options.computed.classes.call(this),
//         'v-bottom-sheet': true,
//         'v-bottom-sheet--inset': this.inset,
//       }
//     },
//   },
// })
