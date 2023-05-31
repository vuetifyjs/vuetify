// Styles
import './VDatePickerControls.sass'

// Components
import { VSpacer } from '@/components/VGrid'
import { VBtn } from '@/components/VBtn'

// Composables
import { useDate } from '@/labs/date'

// Utilities
import { computed } from 'vue'
import { defineComponent, omit, useRender } from '@/util'
import { dateEmits, makeDateProps } from '../VDateField/composables'

export const VDatePickerControls = defineComponent({
  name: 'VDatePickerControls',

  props: {
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
      type: [String, Boolean],
      validator: (v: any) => v === false || ['start', 'end'].includes(v),
    },
    ...omit(makeDateProps(), ['modelValue', 'inputMode']),
  },

  emits: {
    ...omit(dateEmits, ['update:modelValue', 'update:inputMode']),
  },

  setup (props, { emit }) {
    const adapter = useDate()
    const monthAndYear = computed(() => {
      const month = props.range === 'end' ? adapter.addMonths(props.displayDate, 1) : props.displayDate
      return adapter.format(month, 'monthAndYear')
    })

    useRender(() => {
      const prevBtn = (
        <VBtn
          variant="text"
          size="small"
          icon={ props.prevIcon }
          onClick={ () => emit('update:displayDate', adapter.addMonths(props.displayDate, -1)) }
        />
      )

      const nextBtn = (
        <VBtn
          variant="text"
          size="small"
          icon={ props.nextIcon }
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
            size="small"
            icon={ props.viewMode === 'month' ? props.expandIcon : props.collapseIcon }
            onClick={ () => emit('update:viewMode', props.viewMode === 'month' ? 'year' : 'month') }
          />
          <VSpacer />
          { (props.viewMode === 'month' && !props.range) && (
            <div key="month-buttons">
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
