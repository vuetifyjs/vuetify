// Styles
import './VPicker.sass'

// Components
import { VPickerTitle } from './VPickerTitle'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Composables
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
export type VPickerSlots = {
  header: never
  default: never
  actions: never
  title: never
}

export const makeVPickerProps = propsFactory({
  bgColor: String,
  landscape: Boolean,
  title: String,
  hideHeader: Boolean,

  ...makeVSheetProps(),
}, 'VPicker')

export const VPicker = genericComponent<VPickerSlots>()({
  name: 'VPicker',

  props: makeVPickerProps(),

  setup (props, { slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    useRender(() => {
      const sheetProps = VSheet.filterProps(props)
      const hasTitle = !!(props.title || slots.title)

      return (
        <VSheet
          { ...sheetProps }
          color={ props.bgColor }
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
          { !props.hideHeader && (
            <div
              key="header"
              class={[
                backgroundColorClasses.value,
              ]}
              style={[
                backgroundColorStyles.value,
              ]}
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
            </div>
          )}

          <div class="v-picker__body">
            { slots.default?.() }
          </div>

          { slots.actions && (
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
