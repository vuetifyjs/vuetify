// Styles
import './VDatePickerMonths.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useDate } from '@/composables/date'
import { useGridKeyboardSelection } from '@/composables/gridKeyboardSelection'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useVirtualFocus } from '@/composables/virtualFocus'

// Utilities
import { computed, ref, shallowRef, useId, watchEffect } from 'vue'
import { convertToUnit, createRange, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VDatePickerMonthsSlots = {
  month: {
    month: {
      text: string
      value: number
    }
    i: number
    props: {
      onClick: () => void
    }
  }
}

export const makeVDatePickerMonthsProps = propsFactory({
  color: String,
  columns: {
    type: Number,
    default: 2,
  },
  height: [String, Number],
  min: null as any as PropType<unknown>,
  max: null as any as PropType<unknown>,
  modelValue: Number,
  year: Number,
  allowedMonths: [Array, Function] as PropType<number[] | ((date: number) => boolean)>,
}, 'VDatePickerMonths')

export const VDatePickerMonths = genericComponent<VDatePickerMonthsSlots>()({
  name: 'VDatePickerMonths',

  props: makeVDatePickerMonthsProps(),

  emits: {
    'update:modelValue': (date: any) => true,
    escape: () => true,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const model = useProxiedModel(props, 'modelValue')
    const contentRef = ref<HTMLElement>()
    const hasFocusIn = shallowRef(false)
    const uid = useId()

    const months = computed(() => {
      let date = adapter.startOfYear(adapter.date())
      if (props.year) {
        date = adapter.setYear(date, props.year)
      }
      return createRange(12).map(i => {
        const text = adapter.format(date, 'monthShort')
        const label = adapter.format(date, 'month')
        const isDisabled =
          !!(
            !isMonthAllowed(i) ||
            (props.min && adapter.isAfter(adapter.startOfMonth(adapter.date(props.min)), date)) ||
            (props.max && adapter.isAfter(date, adapter.startOfMonth(adapter.date(props.max))))
          )
        date = adapter.getNextMonth(date)

        return {
          isDisabled,
          text,
          label,
          value: i,
        }
      })
    })

    watchEffect(() => {
      model.value = model.value ?? adapter.getMonth(adapter.date())
    })

    const virtualFocus = useVirtualFocus(
      () => months.value.map(month => ({
        id: month.value,
        disabled: month.isDisabled,
        el: () => contentRef.value?.querySelector<HTMLElement>(`[data-v-month="${month.value}"]`),
      })),
      {
        control: contentRef,
        columns: () => props.columns,
      }
    )

    function isMonthAllowed (month: number) {
      if (Array.isArray(props.allowedMonths) && props.allowedMonths.length) {
        return props.allowedMonths.includes(month)
      }

      if (typeof props.allowedMonths === 'function') {
        return props.allowedMonths(month)
      }

      return true
    }

    function onFocusin (e: FocusEvent) {
      const grid = contentRef.value
      if (!grid || grid.contains(e.relatedTarget as Node)) return

      hasFocusIn.value = true
      const cur = model.value ?? adapter.getMonth(adapter.date())
      virtualFocus.highlight(cur)
      virtualFocus.focusHighlighted()
    }

    function onFocusout (e: FocusEvent) {
      if (!contentRef.value?.contains(e.relatedTarget as Node)) {
        hasFocusIn.value = false
        virtualFocus.clear()
      }
    }

    function onActivate () {
      const id = virtualFocus.highlightedId.value as number
      const month = months.value.find(m => m.value === id)
      if (!month || month.isDisabled) return

      if (model.value === id) emit('update:modelValue', model.value)
      else model.value = id
    }

    function onMonthClick (i: number) {
      virtualFocus.highlight(i)
      virtualFocus.focusHighlighted()
      if (model.value === i) {
        emit('update:modelValue', model.value)
        return
      }
      model.value = i
    }

    const onContainerKeydown = useGridKeyboardSelection(virtualFocus, {
      onEscape: () => emit('escape'),
      onActivate,
    })

    useRender(() => (
      <div
        class="v-date-picker-months"
        style={{
          height: convertToUnit(props.height),
        }}
      >
        <div
          ref={ contentRef }
          class="v-date-picker-months__content"
          style={{ '--v-date-picker-months-columns': props.columns }}
          tabindex={ hasFocusIn.value ? -1 : 0 }
          onKeydown={ onContainerKeydown }
          onFocusin={ onFocusin }
          onFocusout={ onFocusout }
        >
          { months.value.map((month, i) => {
            const btnProps = {
              id: `${uid}-month-${i}`,
              active: model.value === i,
              ariaLabel: month.label,
              color: model.value === i ? props.color : undefined,
              disabled: month.isDisabled,
              rounded: true,
              tabindex: -1,
              text: month.text,
              variant: model.value === month.value ? 'flat' : 'text',
              'data-v-month': month.value,
              onMousedown: (e: MouseEvent) => e.preventDefault(), // preserve virtual focus
              onClick: () => onMonthClick(i),
            } as const

            return slots.month?.({
              month,
              i,
              props: btnProps,
            }) ?? (
              <VBtn
                key="month"
                { ...btnProps }
              />
            )
          })}
        </div>
      </div>
    ))

    return {}
  },
})

export type VDatePickerMonths = InstanceType<typeof VDatePickerMonths>
