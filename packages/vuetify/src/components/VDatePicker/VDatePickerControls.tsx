// Styles
import './VDatePickerControls.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VSpacer } from '@/components/VGrid'

// Composables
import { IconValue } from '@/composables/icons'

// Utilities
import { computed } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

type ControlVariant = 'docked' | 'modal'

export const makeVDatePickerControlsProps = propsFactory({
  active: {
    type: [String, Array] as PropType<string | string[]>,
    default: undefined,
  },
  controlHeight: [Number, String],
  controlVariant: {
    type: String as PropType<ControlVariant>,
    default: 'modal',
  },
  noMonthPicker: Boolean,
  disabled: {
    type: [Boolean, String, Array] as PropType<boolean | string | string[] | null>,
    default: null,
  },
  nextIcon: {
    type: IconValue,
    default: '$next',
  },
  prevIcon: {
    type: IconValue,
    default: '$prev',
  },
  modeIcon: {
    type: IconValue,
    default: '$subgroup',
  },
  text: String,
  monthText: String,
  yearText: String,
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
    'click:prev-year': () => true,
    'click:next-year': () => true,
  },

  setup (props, { emit, slots }) {
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

    function onClickPrevMonth () {
      emit('click:prev')
    }

    function onClickNextMonth () {
      emit('click:next')
    }

    function onClickPrevYear () {
      emit('click:prev-year')
    }

    function onClickNextYear () {
      emit('click:next-year')
    }

    function onClickYear () {
      emit('click:year')
    }

    function onClickMonth () {
      emit('click:month')
    }

    useRender(() => {
      const innerDefaults = {
        VBtn: {
          density: 'comfortable',
          variant: 'text',
        },
      }

      const prevMonth = (
        <VBtn
          data-testid="prev-month"
          disabled={ disablePrev.value }
          icon={ props.prevIcon }
          onClick={ onClickPrevMonth }
        />
      )

      const nextMonth = (
        <VBtn
          data-testid="next-month"
          disabled={ disableNext.value }
          icon={ props.nextIcon }
          onClick={ onClickNextMonth }
        />
      )

      const prevYear = (
        <VBtn
          data-testid="prev-year"
          disabled={ disablePrev.value }
          icon={ props.prevIcon }
          onClick={ onClickPrevYear }
        />
      )

      const nextYear = (
        <VBtn
          data-testid="next-year"
          disabled={ disableNext.value }
          icon={ props.nextIcon }
          onClick={ onClickNextYear }
        />
      )

      const onlyMonthBtn = (
        <VBtn
          class="v-date-picker-controls__only-month-btn"
          data-testid="year-btn"
          density="default"
          disabled={ disableMonth.value }
          text={ props.monthText }
          appendIcon={ props.modeIcon }
          onClick={ onClickMonth }
        />
      )

      const onlyYearBtn = (
        <VBtn
          class="v-date-picker-controls__only-year-btn"
          data-testid="year-btn"
          density="default"
          disabled={ disableYear.value }
          text={ props.yearText }
          appendIcon={ props.modeIcon }
          onClick={ onClickYear }
        />
      )

      const monthYearBtn = (
        <VBtn
          class="v-date-picker-controls__year-btn"
          data-testid="year-btn"
          density="default"
          disabled={ disableYear.value }
          text={ props.text }
          appendIcon={ props.modeIcon }
          rounded
          onClick={ onClickYear }
        />
      )

      const monthYearSplit = (
        <>
          <VBtn
            class="v-date-picker-controls__month-btn"
            data-testid="month-btn"
            height="36"
            disabled={ disableMonth.value }
            text={ props.text }
            rounded
            onClick={ onClickMonth }
          />
          <VBtn
            class="v-date-picker-controls__mode-btn"
            data-testid="year-btn"
            disabled={ disableYear.value }
            icon={ props.modeIcon }
            onClick={ onClickYear }
          />
        </>
      )

      const modalControls = (
        <>
          { props.noMonthPicker ? monthYearBtn : monthYearSplit }

          <VSpacer />

          <div class="v-date-picker-controls__month">
            { prevMonth }
            { nextMonth }
          </div>
        </>
      )

      const dockedControls = (
        <>
          <div class="v-date-picker-controls__month">
            { prevMonth }
            { onlyMonthBtn }
            { nextMonth }
          </div>

          <VSpacer />

          <div class="v-date-picker-controls__year">
            { prevYear }
            { onlyYearBtn }
            { nextYear }
          </div>
        </>
      )

      return (
        <VDefaultsProvider defaults={ innerDefaults }>
          <div
            class={[
              'v-date-picker-controls',
              `v-date-picker-controls--variant-${props.controlVariant}`,
            ]}
            style={{
              '--v-date-picker-controls-height': convertToUnit(props.controlHeight),
            }}
          >
            { slots.default?.() ?? (
              <>
                { props.controlVariant === 'modal' && modalControls }
                { props.controlVariant === 'docked' && dockedControls }
              </>
            )}
          </div>
        </VDefaultsProvider>
      )
    })

    return {}
  },
})

export type VDatePickerControls = InstanceType<typeof VDatePickerControls>
