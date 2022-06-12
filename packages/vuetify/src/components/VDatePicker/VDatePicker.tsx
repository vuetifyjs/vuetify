// Styles

// Components
import { VDatePickerControls } from './VDatePickerControls'
import { VDatePickerHeader } from './VDatePickerHeader'
import { VDatePickerMonth } from './VDatePickerMonth'
import { VDatePickerYears } from './VDatePickerYears'
import { VPicker } from '../VPicker'
import { VTextField } from '../VTextField'

// Composables
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { createDatePicker } from './composables'

// Utilites
import { computed } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const VDatePicker = defineComponent({
  name: 'VDatePicker',

  props: {
    color: String,
    input: {
      type: String as PropType<'keyboard' | 'calendar'>,
      default: 'calendar',
    },
    mode: {
      type: String as PropType<'month' | 'years'>,
      default: 'month',
    },
    modelValue: null,
    displayDate: null,
    locale: null,
    ...makeTransitionProps({
      transition: 'fade',
    }),
  },

  setup (props) {
    const { mode, input } = createDatePicker(props)
    const headerTitle = computed(() => 'select date')
    const headerText = computed(() => 'foo')

    useRender(() => (
      <VPicker
        width="350"
        v-slots={{
          header: () => (
            <VDatePickerHeader
              color={ props.color }
              title={ headerTitle.value }
              text={ headerText.value }
            />
          ),
          default: () => input.value === 'calendar' ? (
            <>
              <VDatePickerControls />
              <MaybeTransition transition={ props.transition } mode="out-in">
                { mode.value === 'month' ? (
                  <VDatePickerMonth
                    locale={ props.locale }
                  />
                ) : (
                  <VDatePickerYears
                    height="350"
                    locale={ props.locale }
                  />
                ) }
              </MaybeTransition>
            </>
          ) : (
            <VTextField label="Enter date" placeholder="yyyy/mm/dd" />
          ),
          actions: () => 'actions',
        }}
      />
    ))

    return {}
  },
})
