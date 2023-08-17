// Styles
import './VDatePickerControls.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VSpacer } from '@/components/VGrid'

// Composables
import { useDate } from '@/labs/date'

// Utilities
import { computed } from 'vue'
import { dateEmits, makeDateProps } from '../VDateInput/composables'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

export const makeVDatePickerControlsProps = propsFactory({
  nextIcon: {
    type: [String],
    default: '$next',
  },
  prevIcon: {
    type: [String],
    default: '$prev',
  },
  expandIcon: {
    type: [String],
    default: '$expand',
  },
  collapseIcon: {
    type: [String],
    default: '$collapse',
  },
  range: {
    default: false,
    type: [Boolean, String],
    validator: (v: any) => v === false || ['start', 'end'].includes(v),
  },
  max: null,
  min: null,
  ...omit(makeDateProps(), ['modelValue', 'inputMode']),
}, 'VDatePickerControls')

export const VDatePickerControls = genericComponent()({
  name: 'VDatePickerControls',

  props: makeVDatePickerControlsProps(),

  emits: {
    ...omit(dateEmits, ['update:modelValue', 'update:inputMode']),
  },

  setup (props, { emit }) {
    const adapter = useDate()
    const monthAndYear = computed(() => {
      const month = props.range === 'end' ? adapter.addMonths(props.displayDate, 1) : props.displayDate
      return adapter.format(month, 'monthAndYear')
    })
    const minDate = computed(() => props.min && adapter.isValid(props.min) ? adapter.date(props.min) : null)
    const maxDate = computed(() => props.max && adapter.isValid(props.max) ? adapter.date(props.max) : null)

    useRender(() => {
      const prevBtn = (
        <VBtn
          variant="text"
          icon={ props.prevIcon }
          disabled={ minDate.value && adapter.isAfter(minDate.value, adapter.addDays(adapter.startOfMonth(props.displayDate), -1)) }
          onClick={ () => emit('update:displayDate', adapter.addMonths(props.displayDate, -1)) }
        />
      )

      const nextBtn = (
        <VBtn
          variant="text"
          icon={ props.nextIcon }
          disabled={ maxDate.value && adapter.isAfter(adapter.addDays(adapter.endOfMonth(props.displayDate), 1), maxDate.value) }
          onClick={ () => emit('update:displayDate', adapter.addMonths(props.displayDate, 1)) }
        />
      )

      return (
        <div class="v-date-picker-controls">
          { props.viewMode === 'month' && props.range === 'start' && prevBtn }
          { !!props.range && <VSpacer key="range-spacer" /> }
          <div class="v-date-picker-controls__date">{ monthAndYear.value }</div>
          <VBtn
            key="expand-btn"
            variant="text"
            icon={ props.viewMode === 'month' ? props.expandIcon : props.collapseIcon }
            onClick={ () => emit('update:viewMode', props.viewMode === 'month' ? 'year' : 'month') }
          />
          <VSpacer />
          { (props.viewMode === 'month' && !props.range) && (
            <div class="v-date-picker-controls__month" key="month-buttons">
              { prevBtn }
              { nextBtn }
            </div>
          )}
          { props.viewMode === 'month' && props.range === 'end' && nextBtn }
        </div>
      )
    })

    return {}
  },
})

export type VDatePickerControls = InstanceType<typeof VDatePickerControls>
