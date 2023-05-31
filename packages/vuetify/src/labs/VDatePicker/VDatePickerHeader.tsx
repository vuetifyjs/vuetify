// Styles
import './VDatePickerHeader.sass'

// Components
import { VBtn } from '../../components/VBtn'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { useLocale } from '@/composables/locale'

// Utilities
import { computed } from 'vue'
import { dateEmits, makeDateProps } from '../VDateField/composables'
import { useDate } from '@/labs/date'
import { defineComponent, omit, useRender } from '@/util'

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
      default: '$calendar',
    },
    showInputSwitch: Boolean,
    range: Boolean,
    ...omit(makeDateProps(), ['displayDate', 'viewMode']),
  },

  emits: {
    ...omit(dateEmits, ['update:modelValue', 'update:viewMode', 'update:modelValue']),
  },

  setup (props, { emit }) {
    const { t } = useLocale()
    const adapter = useDate()
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const headerText = computed(() => {
      if (props.header) return props.header

      if (!props.modelValue?.length) return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}header.placeholder`)

      if (props.modelValue.length === 1) return adapter.format(props.modelValue[0], 'normalDateWithWeekday')

      return props.modelValue.map(date => adapter.format(date, 'monthAndDate')).join(' - ')
    })

    const titleText = computed(() => {
      if (props.title) return props.title

      if (!props.modelValue?.length) return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}title.placeholder`)

      return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}title.selected`)
    })

    function handleHeaderClick () {
      if (!props.modelValue.length) return

      const date = props.modelValue[0]

      emit('update:displayDate', date)
    }

    useRender(() => (
      <div
        class={[
          'v-date-picker-header',
          backgroundColorClasses.value,
        ]}
        style={ backgroundColorStyles.value }
      >
        <div class="v-date-picker-header__wrapper">
          <div class="v-date-picker-header__title">
            { titleText.value }
          </div>
          <div class="v-date-picker-header__text">
            <div
              class="v-date-picker-header__date"
              onClick={ handleHeaderClick }
            >
              { headerText.value }
            </div>
            <VBtn
              variant="text"
              icon={ props.inputMode === 'keyboard' ? props.calendarIcon : props.keyboardIcon }
              onClick={ () => emit('update:inputMode', props.inputMode === 'keyboard' ? 'calendar' : 'keyboard') }
            />
          </div>
        </div>
      </div>
    ))

    return {}
  },
})
