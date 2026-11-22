// Components
import { makeVDatePickerMonthProps, VDatePickerMonth } from '@/components/VDatePicker/VDatePickerMonth'
import { VDateRangePickerVirtualScroll } from './VDateRangePickerVirtualScroll'

// Composables
import { useDateRangeMonths } from './dateRangePicker'
import { useCalendar } from '@/composables/calendar'
import { computeColor } from '@/composables/color'
import { useDate } from '@/composables/date'
import { injectDefaults } from '@/composables/defaults'
import { useProxiedModel } from '@/composables/proxiedModel'
import { genOverlays } from '@/composables/variant'

// Utilities
import { toRef } from 'vue'
import { genericComponent, noop, propsFactory, useRender } from '@/util'

// Types
import type { VBtn } from '@/components/VBtn'
import type { VDatePickerMonthSlots } from '@/components/VDatePicker/VDatePickerMonth'

export const VDateRangePickerMonths = genericComponent()({
  name: 'VDateRangePickerMonths',

  props: propsFactory({
    ...makeVDatePickerMonthProps(),
  }, 'VDateRangePickerMonths')(),

  emits: {
    'update:modelValue': (_value: unknown[]) => true,
    'update:month': (_value: number) => true,
    'update:year': (_value: number) => true,
    'update:previewValue': (_value: unknown) => true,
  },

  setup (props) {
    const adapter = useDate()
    const defaults = injectDefaults()
    const { model, weekdayLabels } = useCalendar(props)
    const preview = useProxiedModel(props, 'previewValue')
    const { months, virtualRef, monthRef, onBoundaryNavigate, onInteraction, onScroll } = useDateRangeMonths(props, model)
    const daySlot = toRef(() => (
      props.events || defaults.value?.global || defaults.value?.VBtn || defaults.value?.VDatePickerMonth
        ? undefined
        : renderDay
    ))

    function onUpdateModel (value: readonly unknown[]) {
      if (!props.readonly && !props.disabled) model.value = value
    }

    function onUpdatePreview (value: unknown) {
      if (model.value.length === 1 || value === undefined) preview.value = value
    }

    function renderDay ({ props: dayProps, item }: VDatePickerMonthSlots['day']) {
      const { color, variant = 'text', disabled, readonly, icon, ripple, class: dayClass, ...attrs } = dayProps as VBtn['$props']
      const colors = computeColor({ [['elevated', 'flat'].includes(variant) ? 'background' : 'text']: color })

      return (
        <button
          { ...attrs }
          type="button"
          class={[
            'v-btn v-btn--icon v-btn--density-default v-btn--size-default',
            `v-btn--variant-${variant}`,
            { 'v-btn--disabled': disabled, 'v-btn--readonly': readonly },
            colors.class,
            dayClass,
          ]}
          style={[colors.style, attrs.style]}
          disabled={ disabled || undefined }
        >
          { genOverlays(true, 'v-btn') }
          <span class="v-btn__content" data-no-activator="">{ item.localized }</span>
        </button>
      )
    }

    useRender(() => (
      <div class={['v-date-range-picker__calendar', { 'v-date-range-picker__calendar--show-week': props.showWeek }]}>
        { !props.hideWeekdays && (
          <div
            key="weekdays"
            class="v-date-range-picker__weekdays"
            style={{ '--v-date-picker-days-in-week': props.weekdays.length }}
            aria-hidden="true"
          >
            { props.showWeek && (
              <div key="weeks" class="v-date-picker-month__weeks">
                <div class="v-date-picker-month__day">&nbsp;</div>
              </div>
            )}
            <div class="v-date-picker-month__days-row">
              { weekdayLabels.value.map(day => <div class="v-date-picker-month__day v-date-picker-month__weekday">{ day }</div>) }
            </div>
          </div>
        )}
        <VDateRangePickerVirtualScroll
          ref={ virtualRef }
          class="v-date-range-picker__months"
          items={ months.value }
          itemKey="index"
          itemHeight={ 320 }
          _overscan={ 2 }
          onScrollPassive={ onScroll }
          onWheelPassive={ onInteraction }
          onTouchstartPassive={ onInteraction }
          onPointerdown={ onInteraction }
          onKeydownCapture={ onInteraction }
        >
          {{
            default: ({ item }) => (
              <div class="v-date-range-picker__month">
                <div class="v-date-range-picker__month-title">{ adapter.format(item.date, 'monthAndYear') }</div>
                <VDatePickerMonth
                  { ...VDatePickerMonth.filterProps(props) }
                  ref={ monthRef(item.index) }
                  modelValue={ model.value }
                  onUpdate:modelValue={ onUpdateModel }
                  month={ item.month }
                  year={ item.year }
                  onUpdate:month={ noop }
                  onUpdate:year={ noop }
                  multiple="range"
                  noAutoNavigation
                  hideWeekdays
                  showAdjacentMonths={ false }
                  transition=""
                  previewValue={ preview.value }
                  onUpdate:previewValue={ onUpdatePreview }
                  onBoundaryNavigate={ onBoundaryNavigate }
                  v-slots={{ day: daySlot.value }}
                />
              </div>
            ),
          }}
        </VDateRangePickerVirtualScroll>
      </div>
    ))

    return {}
  },
})
