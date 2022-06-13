// Styles
import './VDatePickerHeader.sass'

// Components
import { VBtn } from '@/components'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { useDatePicker } from './composables'

// Utilities
import { defineComponent, useRender } from '@/util'
import { computed } from 'vue'
import { useLocale } from '@/composables/locale'

export const VDatePickerHeader = defineComponent({
  name: 'VDatePickerHeader',

  props: {
    color: String,
    title: String,
    header: String,
    keyboardIcon: {
      type: String,
      default: '$edit',
    },
    calendarIcon: {
      type: String,
      default: 'mdi-home',
    },
    showInputSwitch: Boolean,
    range: Boolean,
  },

  emits: {
    'update:input': (input: string) => true,
  },

  setup (props, { emit }) {
    const { t } = useLocale()
    const { input, model, adapter, displayDate } = useDatePicker()
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const headerText = computed(() => {
      if (props.header) return props.header

      if (!model.value.length) return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}header.placeholder`)

      if (model.value.length === 1) return adapter.value.format(model.value[0], 'normalDateWithWeekday')

      return model.value.map(date => adapter.value.format(date, 'monthAndDate')).join(' - ')
    })

    const titleText = computed(() => {
      if (props.title) return props.title

      if (!model.value.length) return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}title.placeholder`)

      return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}title.selected`)
    })

    function scrollToDisplayDate () {
      if (!model.value.length) return

      const date = model.value[0]

      displayDate.value = date
    }

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
            { titleText.value }
          </div>
          <div class="v-date-picker-header__text">
            <div
              class="v-date-picker-header__date"
              onClick={ scrollToDisplayDate }
            >
              { headerText.value }
            </div>
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
