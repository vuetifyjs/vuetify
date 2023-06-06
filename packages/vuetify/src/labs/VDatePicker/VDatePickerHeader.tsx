// Styles
import './VDatePickerHeader.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
export type VDatePickerHeaderSlots = {
  default: never
  prepend: never
  append: never
}

export const makeVDatePickerHeaderProps = propsFactory({
  prependIcon: String,
  appendIcon: {
    type: String,
    default: '$edit'
  },
  color: String,
  text: String,
}, 'VDatePickerHeader')

export const VDatePickerHeader = genericComponent<VDatePickerHeaderSlots>()({
  name: 'VDatePickerHeader',

  props: makeVDatePickerHeaderProps(),

  emits: {
    'click:prepend': () => true,
    'click:append': () => true,
  },

  setup (props, { emit, slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    function onClickAppend () {
      emit('click:append')
    }

    useRender(() => {
      const hasContent = !!(slots.default || props.text)
      const hasAppend = !!(slots.append || props.appendIcon)

      return (
        <div
          class={[
            'v-date-picker-header',
            backgroundColorClasses.value,
          ]}
          style={ backgroundColorStyles.value }
        >
          { slots.prepend && (
            <div class="v-date-picker-header__prepend">
              { slots.prepend() }
            </div>
          )}

          { hasContent && (
            <div class="v-date-picker-header__content">
              { slots.default?.() ?? props.text }
            </div>
          )}

          { hasAppend && (
            <div class="v-date-picker-header__append">
              { !slots.append ? (
                <VBtn
                  icon={ props.appendIcon }
                  variant="text"
                  onClick={ onClickAppend }
                />
              ) : (
                <VDefaultsProvider
                  key="append-defaults"
                  disabled={ !props.appendIcon }
                  defaults={{
                    VBtn: {
                      icon: props.appendIcon,
                      variant: 'text',
                    }
                  }}
                >
                  { slots.append?.() }
                </VDefaultsProvider>
              )}
            </div>
          )}
        </div>
      )
    })

    return {}
  },
})

export type VDatePickerHeader = InstanceType<typeof VDatePickerHeader>
