// Styles
import './VDatePickerHeader.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { EventProp, genericComponent, propsFactory, useRender } from '@/util'

// Types
export type VDatePickerHeaderSlots = {
  prepend: never
  default: never
  append: never
}

export const makeVDatePickerHeaderProps = propsFactory({
  appendIcon: String,
  color: String,
  header: String,
  transition: String,
  onClick: EventProp<[MouseEvent]>(),
}, 'VDatePickerHeader')

export const VDatePickerHeader = genericComponent<VDatePickerHeaderSlots>()({
  name: 'VDatePickerHeader',

  props: makeVDatePickerHeaderProps(),

  emits: {
    click: () => true,
    'click:append': () => true,
  },

  setup (props, { emit, slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    function onClick () {
      emit('click')
    }

    function onClickAppend () {
      emit('click:append')
    }

    useRender(() => {
      const hasContent = !!(slots.default || props.header)
      const hasAppend = !!(slots.append || props.appendIcon)

      return (
        <div
          class={[
            'v-date-picker-header',
            {
              'v-date-picker-header--clickable': !!props.onClick,
            },
            backgroundColorClasses.value,
          ]}
          style={ backgroundColorStyles.value }
          onClick={ onClick }
        >
          { slots.prepend && (
            <div key="prepend" class="v-date-picker-header__prepend">
              { slots.prepend() }
            </div>
          )}

          { hasContent && (
            <MaybeTransition key="content" name={ props.transition }>
              <div key={ props.header } class="v-date-picker-header__content">
                { slots.default?.() ?? props.header }
              </div>
            </MaybeTransition>
          )}

          { hasAppend && (
            <div class="v-date-picker-header__append">
              { !slots.append ? (
                <VBtn
                  key="append-btn"
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
                    },
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
