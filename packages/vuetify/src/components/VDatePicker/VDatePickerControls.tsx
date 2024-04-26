// Styles
import './VDatePickerControls.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VSpacer } from '@/components/VGrid'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVDatePickerControlsProps = propsFactory({
  active: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined,
  },
  disabled: {
    type: [Boolean, String, Array] as PropType<boolean | string | string[]>,
    default: false,
  },
  nextIcon: {
    type: [String],
    default: '$next',
  },
  prevIcon: {
    type: [String],
    default: '$prev',
  },
  modeIcon: {
    type: [String],
    default: '$subgroup',
  },
  text: String,
  viewMode: {
    type: String as PropType<'month' | 'months' | 'year'>,
    default: 'month',
  },
}, 'VDatePickerControls')

export const VDatePickerControls = genericComponent()({
  name: 'VDatePickerControls',

  props: makeVDatePickerControlsProps(),

  emits: {
    'click:year': () => true,
    'click:month': () => true,
    'click:prev': () => true,
    'click:next': () => true,
    'click:text': () => true,
  },

  setup (props, { emit }) {
    const disableMonth = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('text')
        : !!props.disabled
    })
    const disableYear = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('mode')
        : !!props.disabled
    })
    const disablePrev = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('prev')
        : !!props.disabled
    })
    const disableNext = computed(() => {
      return Array.isArray(props.disabled)
        ? props.disabled.includes('next')
        : !!props.disabled
    })

    function onClickPrev () {
      emit('click:prev')
    }

    function onClickNext () {
      emit('click:next')
    }

    function onClickYear () {
      emit('click:year')
    }

    function onClickMonth () {
      emit('click:month')
    }

    useRender(() => {
      // TODO: add slot support and scope defaults
      return (
        <div
          class={[
            'v-date-picker-controls',
          ]}
        >
          <VBtn
            class="v-date-picker-controls__month-btn"
            disabled={ disableMonth.value }
            text={ props.text }
            variant="text"
            rounded
            onClick={ onClickMonth }
          ></VBtn>

          <VBtn
            key="mode-btn"
            class="v-date-picker-controls__mode-btn"
            disabled={ disableYear.value }
            density="comfortable"
            icon={ props.modeIcon }
            variant="text"
            onClick={ onClickYear }
          />

          <VSpacer key="mode-spacer" />

          <div
            key="month-buttons"
            class="v-date-picker-controls__month"
          >
            <VBtn
              disabled={ disablePrev.value }
              icon={ props.prevIcon }
              variant="text"
              onClick={ onClickPrev }
            />

            <VBtn
              disabled={ disableNext.value }
              icon={ props.nextIcon }
              variant="text"
              onClick={ onClickNext }
            />
          </div>
        </div>
      )
    })

    return {}
  },
})

export type VDatePickerControls = InstanceType<typeof VDatePickerControls>
