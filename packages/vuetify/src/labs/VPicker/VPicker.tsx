// Styles
import './VPicker.sass'

// Components
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
export type VPickerSlots = {
  header: never
  default: never
  actions: never
}

export const makeVPickerProps = propsFactory({
  landscape: Boolean,

  ...makeVSheetProps(),
}, 'VPicker')

export const VPicker = genericComponent<VPickerSlots>()({
  name: 'VPicker',

  props: makeVPickerProps(),

  setup (props, { slots }) {
    useRender(() => {
      const [sheetProps] = VSheet.filterProps(props)

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
          { slots.header && (
            <div class="v-picker__header">
              { slots.header() }
            </div>
          )}

          <div class="v-picker__body">
            { slots.default?.() }
          </div>

          { slots.actions && (
            <div class="v-picker__actions">
              { slots.actions() }
            </div>
          )}
        </VSheet>
      )
    })

    return {}
  },
})

export type VPicker = InstanceType<typeof VPicker>
