// Styles
import './VDatePickerHeader.sass'

// Components
import { VBtn } from '../../components/VBtn'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { computed } from 'vue'
import { dateEmits, makeDateProps } from '../VDateInput/composables'
import { useDate } from '@/labs/date'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

export const makeVDatePickerHeaderProps = propsFactory({
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
  range: [Boolean, String],

  ...omit(makeDateProps(), ['displayDate', 'viewMode']),
}, 'VDatePickerHeader')

export const VDatePickerHeader = genericComponent()({
  name: 'VDatePickerHeader',

  props: makeVDatePickerHeaderProps(),

  emits: {
    ...omit(dateEmits, ['update:modelValue', 'update:viewMode', 'update:modelValue']),
  },

  setup (props, { emit }) {
    const { t } = useLocale()
    const adapter = useDate()

    const headerText = computed(() => {
      if (props.header) return props.header

      if (!props.modelValue?.length) return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}header`)

      if (props.modelValue.length === 1) return adapter.format(props.modelValue[0], 'normalDateWithWeekday')

      return props.modelValue.map(date => adapter.format(date, 'monthAndDate')).join(' - ')
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
        ]}
      >
        <div class="v-date-picker-header__wrapper">
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

export type VDatePickerHeader = InstanceType<typeof VDatePickerHeader>
