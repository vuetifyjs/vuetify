// Styles
import './VDatePickerControls.sass'

// Components
import { VSpacer } from '../VGrid'
import { VBtn } from '../VBtn'

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
    showPrevNextButtons: Boolean,
  },

  setup (props, { emit }) {
    const { displayDate, mode, adapter } = useDatePicker()
    const monthAndYear = computed(() => adapter.value.format(displayDate.value, 'monthAndYear'))

    useRender(() => (
      <div class="v-date-picker-controls">
        <div class="v-date-picker-controls__date">{ monthAndYear.value }</div>
        <VBtn
          size="x-small"
          variant="plain"
          icon={ mode.value === 'month' ? props.expandIcon : props.collapseIcon }
          onClick={ () => mode.value = mode.value === 'month' ? 'years' : 'month' }
        />
        <VSpacer />
        { props.showPrevNextButtons && (
          <div>
            <VBtn
              size="x-small"
              variant="plain"
              icon={ props.prevIcon }
              onClick={ () => displayDate.value = adapter.value.addMonths(displayDate.value, -1) }
            />
            <VBtn
              size="x-small"
              variant="plain"
              icon={ props.prevIcon }
              onClick={ () => displayDate.value = adapter.value.addMonths(displayDate.value, 1) }
            />
          </div>
        ) }
      </div>
    ))

    return {}
  },
})
