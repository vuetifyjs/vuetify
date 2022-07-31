// Styles
import './VDateRangePickerHeader.sass'

// Components
import { VBtn } from '@/components'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { useDatePicker } from './composables'

// Utilities
import { defineComponent, useRender } from '@/util'
import { computed } from 'vue'
import { useLocale } from '@/composables/locale'

export const VDateRangePickerHeader = defineComponent({
  name: 'VDateRangePickerHeader',

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
      default: '$calendar',
    },
    closeIcon: {
      type: String,
      default: '$close',
    },
    showInputSwitch: Boolean,
  },

  emits: {
    cancel: () => true,
    save: () => true,
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

      return model.value.map(date => adapter.value.format(date, 'shortDate')).join(' - ')
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
          'v-date-range-picker-header',
          backgroundColorClasses.value,
          `v-date-range-picker-header--${input.value}`,
        ]}
        style={backgroundColorStyles.value}
      >
        { input.value === 'calendar' && (
          <div key="calendar-buttons" class="v-date-range-picker-header__buttons">
            <VBtn
              variant="text"
              icon={ props.closeIcon }
              onClick={ () => emit('cancel') }
            />
            <VBtn
              variant="text"
              onClick={ () => emit('save') }
            >
              Save
            </VBtn>
          </div>
        ) }
        <div class="v-date-range-picker-header__wrapper">
          <div class="v-date-range-picker-header__title">
            { titleText.value }
          </div>
          <div class="v-date-range-picker-header__text">
            <div
              class="v-date-range-picker-header__date"
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
