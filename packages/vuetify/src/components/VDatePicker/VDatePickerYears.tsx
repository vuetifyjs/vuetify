// Styles
import './VDatePickerYears.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useDate } from '@/composables/date'
import { useGridSelection } from '@/composables/gridSelection'
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import vIntersect from '@/directives/intersect'

// Utilities
import { computed, useId, watchEffect } from 'vue'
import { convertToUnit, createRange, genericComponent, propsFactory, templateRef, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

// Types
export type VDatePickerYearsSlots = {
  year: {
    year: {
      text: string
      value: number
    }
    i: number
    props: {
      active: boolean
      color?: string
      rounded: boolean
      text: string
      variant: 'flat' | 'text'
      onClick: () => void
    }
  }
}

export const makeVDatePickerYearsProps = propsFactory({
  color: String,
  columns: {
    type: Number,
    default: 3,
  },
  height: [String, Number],
  min: null as any as PropType<unknown>,
  max: null as any as PropType<unknown>,
  modelValue: Number,
  allowedYears: [Array, Function] as PropType<number[] | ((date: number) => boolean)>,
}, 'VDatePickerYears')

export const VDatePickerYears = genericComponent<VDatePickerYearsSlots>()({
  name: 'VDatePickerYears',

  props: makeVDatePickerYearsProps(),

  directives: { vIntersect },

  emits: {
    'update:modelValue': (year: number) => true,
    escape: () => true,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const model = useProxiedModel(props, 'modelValue')
    const containerRef = templateRef()
    const uid = useId()

    const years = computed(() => {
      const year = adapter.getYear(adapter.date())

      let min = year - 100
      let max = year + 52

      if (props.min) {
        min = adapter.getYear(adapter.date(props.min))
      }

      if (props.max) {
        max = adapter.getYear(adapter.date(props.max))
      }

      let date = adapter.startOfYear(adapter.date())

      date = adapter.setYear(date, min)

      return createRange(max - min + 1, min).map(i => {
        const text = adapter.format(date, 'year')
        date = adapter.setYear(date, adapter.getYear(date) + 1)

        return {
          text,
          value: i,
          isDisabled: !isYearAllowed(i),
        }
      })
    })

    watchEffect(() => {
      model.value = model.value ?? adapter.getYear(adapter.date())
    })

    function isYearAllowed (year: number) {
      if (Array.isArray(props.allowedYears) && props.allowedYears.length) {
        return props.allowedYears.includes(year)
      }

      if (typeof props.allowedYears === 'function') {
        return props.allowedYears(year)
      }

      return true
    }

    function onYearSelect (value: number) {
      if (model.value === value) emit('update:modelValue', value)
      else model.value = value
    }

    const { containerProps, containerEl, selectItem } = useGridSelection<number>({
      items: () => years.value,
      columns: () => props.columns,
      initialValue: current => current ?? model.value ?? adapter.getYear(adapter.date()),
      itemAttribute: 'data-v-year',
      onSelect: onYearSelect,
      onEscape: () => emit('escape'),
    })

    function scrollToSelected () {
      const container = containerRef.el
      const target = containerEl.value?.querySelector<HTMLElement>(`[data-v-year="${model.value}"]`)
      if (!container || !target) return

      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()

      container.scrollTop += (targetRect.top - containerRect.top) - (container.clientHeight / 2) + (targetRect.height / 2)
    }

    useRender(() => (
      <div
        class="v-date-picker-years"
        ref={ containerRef }
        tabindex={ -1 }
        v-intersect={[{
          handler: scrollToSelected,
        }, null, ['once']]}
        style={{
          height: convertToUnit(props.height),
        }}
      >
        <div
          class="v-date-picker-years__content"
          style={{ '--v-date-picker-years-columns': props.columns }}
          { ...containerProps.value }
        >
          { years.value.map((year, i) => {
            const btnProps = {
              id: `${uid}-year-${year.value}`,
              active: model.value === year.value,
              color: model.value === year.value ? props.color : undefined,
              rounded: true,
              tabindex: -1,
              text: year.text,
              disabled: year.isDisabled,
              variant: model.value === year.value ? 'flat' : 'text',
              'data-v-year': year.value,
              onMousedown: (e: MouseEvent) => e.preventDefault(), // preserve virtual focus
              onClick: () => selectItem(year.value),
            } as const

            return slots.year?.({
              year,
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

export type VDatePickerYears = InstanceType<typeof VDatePickerYears>
