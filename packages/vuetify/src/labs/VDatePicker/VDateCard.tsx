// Styles
import './VDateCard.sass'

// Components
import { VDatePickerControls } from './VDatePickerControls'
import { VDatePickerMonth } from './VDatePickerMonth'
import { VDatePickerYears } from './VDatePickerYears'
import { VCard } from '@/components/VCard'

// Composables
import { createDatePicker } from './composables'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const VDateCard = defineComponent({
  name: 'VDateCard',

  props: {
    color: String,
    inputMode: {
      type: String as PropType<'keyboard' | 'calendar'>,
      default: 'calendar',
    },
    viewMode: {
      type: String as PropType<'month' | 'year'>,
      default: 'month',
    },
    modelValue: null,
    displayDate: null,
    ...makeTransitionProps({
      transition: 'fade',
    }),
    range: Boolean,
  },

  emits: {
    'update:modelValue': (value: any) => true,
    'update:displayDate': (value: any) => true,
    'update:viewMode': (mode: 'month' | 'year') => true,
    'update:inputMode': (value: any) => true,
  },

  setup (props, { emit }) {
    createDatePicker(props)

    useRender(() => (
      <VCard
        class="v-date-card"
      >
        <VDatePickerControls
          displayDate={ props.displayDate }
          onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
          viewMode={ props.viewMode }
          onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
        />
        <MaybeTransition transition={ props.transition } mode="out-in">
          { props.viewMode === 'month' ? (
            <div class="v-date-card__month">
              <VDatePickerMonth
                modelValue={ props.modelValue }
                onUpdate:modelValue={ modelValue => emit('update:modelValue', modelValue) }
                displayDate={ props.displayDate }
                onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
              />
            </div>
          ) : (
            <VDatePickerYears
              displayDate={ props.displayDate }
              onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
              viewMode={ props.viewMode }
              onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
            />
          )}
        </MaybeTransition>
      </VCard>
    ))

    return {}
  },
})
