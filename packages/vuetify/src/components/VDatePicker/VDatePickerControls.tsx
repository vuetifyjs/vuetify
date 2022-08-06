// Styles
import './VDatePickerControls.sass'

// Components
import { VSpacer } from '../VGrid'
import { VIcon } from '../VIcon'

// Composables
import { useDatePicker } from './composables'

// Utilities
import { computed } from 'vue'
import { defineComponent, useRender } from '@/util'

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
  },

  setup (props, { emit }) {
    const { displayDate, mode, adapter } = useDatePicker()
    const monthAndYear = computed(() => {
      const month = props.range === 'end' ? adapter.value.addMonths(displayDate.value, 1) : displayDate.value
      return adapter.value.format(month, 'monthAndYear')
    })

    useRender(() => {
      const prevBtn = (
        <VIcon
          icon={ props.prevIcon }
          onClick={ () => displayDate.value = adapter.value.addMonths(displayDate.value, -1) }
        />
      )

      const nextBtn = (
        <VIcon
          icon={ props.nextIcon }
          onClick={ () => displayDate.value = adapter.value.addMonths(displayDate.value, 1) }
        />
      )

      return (
        <div class="v-date-picker-controls">
          { mode.value === 'month' && props.range === 'start' && prevBtn }
          { !!props.range && <VSpacer key="range-spacer" /> }
          <div class="v-date-picker-controls__date">{ monthAndYear.value }</div>
          <VIcon
            key="expand-btn"
            icon={ mode.value === 'month' ? props.expandIcon : props.collapseIcon }
            onClick={ () => mode.value = mode.value === 'month' ? 'years' : 'month' }
          />
          <VSpacer />
          { (mode.value === 'month' && !props.range) && (
            <div key="month-buttons">
              { prevBtn }
              { nextBtn }
            </div>
          ) }
          { mode.value === 'month' && props.range === 'end' && nextBtn }
        </div>
      )
    })

    return {}
  },
})
