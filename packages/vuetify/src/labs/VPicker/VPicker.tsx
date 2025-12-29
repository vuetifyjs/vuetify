// Styles
import './VPicker.sass'

// Components
import { VPickerTitle } from './VPickerTitle'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Composables
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { genericComponent, propsFactory, renderSlot, useRender } from '@/util'

// Types
export type VPickerSlots = {
  header: never
  default: never
  actions: never
  title: never
}

export const makeVPickerProps = propsFactory({
  bgColor: String,
  divided: Boolean,
  landscape: Boolean,
  title: String,
  hideHeader: Boolean,
  hideTitle: Boolean,

  ...makeVSheetProps(),
}, 'VPicker')

export const VPicker = genericComponent<VPickerSlots>()({
  name: 'VPicker',

  props: makeVPickerProps(),

  setup (props, { slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.color)
    useRender(() => {
      const sheetProps = VSheet.filterProps(props)
      const hasTitle = !props.hideTitle && !!(props.title || slots.title)

      return (
        <VSheet
          { ...sheetProps }
          color={ props.bgColor }
          class={[
            'v-picker',
            {
              'v-picker--divided': props.divided,
              'v-picker--landscape': props.landscape,
              'v-picker--with-actions': !!slots.actions,
            },
            props.class,
          ]}
          style={ props.style }
        >
          { !props.hideHeader ? (
            <div
              key="header"
              class={[
                'v-picker__header-wrapper',
                backgroundColorClasses.value,
              ]}
              style={[
                backgroundColorStyles.value,
              ]}
            >
              { hasTitle ? (
                <VPickerTitle key="picker-title">
                  { renderSlot(slots.title, undefined, () => props.title) }
                </VPickerTitle>
              ) : undefined }

              { slots.header ? (
                <div class="v-picker__header">
                  { slots.header() }
                </div>
              ) : undefined }
            </div>
          ) : undefined }

          <div class="v-picker__body">
            { slots.default?.() }
          </div>

          { slots.actions ? (
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
          ) : undefined }
        </VSheet>
      )
    })

    return {}
  },
})

export type VPicker = InstanceType<typeof VPicker>
