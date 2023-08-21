// Styles
import './VDateRangePickerHeader.sass'

// Components
import { VBtn } from '../../components/VBtn'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { useLocale } from '@/composables/locale'
import { useDate } from '@/labs/date'
import { makeDateProps } from '@/labs/VDateInput/composables'

// Utilities
import { computed } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

export const makeVDateRangePickerHeaderProps = propsFactory({
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
  range: null,
  ...omit(makeDateProps(), ['viewMode', 'format']),
}, 'VDateRangePickerHeader')

export const VDateRangePickerHeader = genericComponent()({
  name: 'VDateRangePickerHeader',

  props: makeVDateRangePickerHeaderProps(),

  emits: {
    cancel: () => true,
    save: () => true,
    'update:inputMode': (input: string) => true,
    'update:displayDate': (date: any) => true,
  },

  setup (props, { emit }) {
    const { t } = useLocale()
    const adapter = useDate()
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    const headerText = computed(() => {
      if (props.header) return props.header

      if (!props.modelValue.length) return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}header.placeholder`)

      if (props.modelValue.length === 1) return adapter.format(props.modelValue[0], 'normalDateWithWeekday')

      return props.modelValue.map((date: any) => adapter.format(date, 'shortDate')).join(' - ')
    })

    const titleText = computed(() => {
      if (props.title) return props.title

      if (!props.modelValue.length) return t(`$vuetify.datePicker.${props.range ? 'range.' : ''}title.placeholder`)

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
          'v-date-range-picker-header',
          backgroundColorClasses.value,
          `v-date-range-picker-header--${props.inputMode}`,
        ]}
        style={ backgroundColorStyles.value }
      >
        { props.inputMode === 'calendar' && (
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
        )}
        <div class="v-date-range-picker-header__wrapper">
          <div class="v-date-range-picker-header__title">
            { titleText.value }
          </div>
          <div class="v-date-range-picker-header__text">
            <div
              class="v-date-range-picker-header__date"
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

export type VDateRangePickerHeader = InstanceType<typeof VDateRangePickerHeader>
