// Styles
import './VDatePickerHeader.sass'

// Components
import { VBtn } from '@/components'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { useDatePicker } from './composables'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VDatePickerHeader = defineComponent({
  name: 'VDatePickerHeader',

  props: {
    color: String,
    title: String,
    text: String,
    keyboardIcon: {
      type: String,
      default: '$edit',
    },
    calendarIcon: {
      type: String,
      default: 'mdi-home',
    },
    showInputSwitch: Boolean,
  },

  emits: {
    'update:input': (input: string) => true,
  },

  setup (props, { emit }) {
    const { input } = useDatePicker()
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    useRender(() => (
      <div
        class={[
          'v-date-picker-header',
          backgroundColorClasses.value,
        ]}
        style={backgroundColorStyles.value}
      >
        <div class="v-date-picker-header__wrapper">
          <div class="v-date-picker-header__title">
            { props.title }
          </div>
          <div class="v-date-picker-header__text">
            <div>{ props.text }</div>
            <VBtn
              variant="text"
              icon={ input.value === 'keyboard' ? props.calendarIcon : props.keyboardIcon }
              onClick={ () => input.value = input.value === 'keyboard' ? 'calendar' : 'keyboard' }
            />
          </div>
        </div>
      </div>
    ))

    return {}
  },
})
