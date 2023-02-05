// Styles
import './VDatePickerControls.sass'

// Components
import { VSpacer } from '@/components/VGrid'
import { VIcon } from '@/components/VIcon'

// Composables
import { useDate } from '@/composables/date'

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
    viewMode: String,
    displayDate: null,
  },

  emits: {
    'update:displayDate': (date: any) => true,
    'update:viewMode': (viewMode: any) => true,
  },

  setup (props, { emit }) {
    const { adapter } = useDate()
    const monthAndYear = computed(() => {
      const month = props.range === 'end' ? adapter.value.addMonths(props.displayDate, 1) : props.displayDate
      return adapter.value.format(month, 'monthAndYear')
    })

    useRender(() => {
      const prevBtn = (
        <VIcon
          icon={ props.prevIcon }
          onClick={ () => emit('update:displayDate', adapter.value.addMonths(props.displayDate, -1)) }
        />
      )

      const nextBtn = (
        <VIcon
          icon={ props.nextIcon }
          onClick={ () => emit('update:displayDate', adapter.value.addMonths(props.displayDate, 1)) }
        />
      )

      return (
        <div class="v-date-picker-controls">
          { props.viewMode === 'month' && props.range === 'start' && prevBtn }
          { !!props.range && <VSpacer key="range-spacer" /> }
          <div class="v-date-picker-controls__date">{ monthAndYear.value }</div>
          <VIcon
            key="expand-btn"
            icon={ props.viewMode === 'month' ? props.expandIcon : props.collapseIcon }
            onClick={ () => emit('update:viewMode', props.viewMode === 'month' ? 'years' : 'month') }
          />
          <VSpacer />
          { (props.viewMode === 'month' && !props.range) && (
            <div key="month-buttons">
              { prevBtn }
              { nextBtn }
            </div>
          ) }
          { props.viewMode === 'month' && props.range === 'end' && nextBtn }
        </div>
      )
    })

    return {}
  },
})
