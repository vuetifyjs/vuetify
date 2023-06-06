// Styles
import './VPicker.sass'

// Components
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'
import { VPickerActions } from './VPickerActions'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'
import { VPickerTitle } from './VPickerTitle'

// Types
export type VPickerSlots = {
  header: never
  default: never
  controls: never
  actions: never
  title: never
}

export const makeVPickerProps = propsFactory({
  landscape: Boolean,
  title: String,

  ...makeVSheetProps(),
}, 'VPicker')

export const VPicker = genericComponent<VPickerSlots>()({
  name: 'VPicker',

  props: makeVPickerProps(),

  setup (props, { slots }) {
    useRender(() => {
      const [sheetProps] = VSheet.filterProps(props)
      const hasTitle = !!(props.title || slots.title)

      return (
        <VSheet
          { ...sheetProps }
          class={[
            'v-picker',
            {
              'v-picker--landscape': props.landscape,
              'v-picker--with-actions': !!slots.actions,
            },
          ]}
        >
          { hasTitle && (
            <VPickerTitle>
              { slots.title?.() ?? props.title }
            </VPickerTitle>
          )}

          { slots.header && (
            <div class="v-picker__header">
              { slots.header() }
            </div>
          )}

          { slots.controls && (
            <div class="v-picker__controls">
              { slots.controls() }
            </div>
          )}

          { slots.default && (
            <div class="v-picker__body">
              { slots.default() }
            </div>
          )}

          { slots.actions && (
            <VPickerActions v-slots={{ default: slots.actions }} />
          )}
        </VSheet>
      )
    })

    return {}
  },
})

export type VPicker = InstanceType<typeof VPicker>
