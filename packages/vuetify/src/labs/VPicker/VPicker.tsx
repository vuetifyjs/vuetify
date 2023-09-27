// Styles
import './VPicker.sass'

// Components
import { VPickerTitle } from './VPickerTitle'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Utilities
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
export type VPickerSlots = {
  header: never
  default: never
  actions: never
  title: never
}

export const makeVPickerProps = propsFactory({
  landscape: Boolean,
  title: String,

  ...omit(makeVSheetProps(), ['color']),
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
            props.class,
          ]}
          style={ props.style }
        >
          { hasTitle && (
            <VPickerTitle key="picker-title">
              { slots.title?.() ?? props.title }
            </VPickerTitle>
          )}

          { slots.header && (
            <div class="v-picker__header">
              { slots.header() }
            </div>
          )}

          <div class="v-picker__body">
            { slots.default?.() }
          </div>

          { slots.actions?.()[0]?.children && (
            <VDefaultsProvider
              defaults={{
                VBtn: {
                  slim: true,
                  variant: 'text',
                },
              }}
            >
              <div class="v-picker__actions">
                { slots.actions() }
              </div>
            </VDefaultsProvider>
          )}
        </VSheet>
      )
    })

    return {}
  },
})

export type VPicker = InstanceType<typeof VPicker>
