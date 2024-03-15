// Styles
import './VDatePickerYears.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, onMounted, ref, watchEffect } from 'vue'
import { convertToUnit, createRange, genericComponent, propsFactory, useRender } from '@/util'

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
  height: [String, Number],
  min: null as any as PropType<unknown>,
  max: null as any as PropType<unknown>,
  modelValue: Number,
}, 'VDatePickerYears')

export const VDatePickerYears = genericComponent<VDatePickerYearsSlots>()({
  name: 'VDatePickerYears',

  props: makeVDatePickerYearsProps(),

  emits: {
    'update:modelValue': (year: number) => true,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const model = useProxiedModel(props, 'modelValue')
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
        }
      })
    })

    watchEffect(() => {
      model.value = model.value ?? adapter.getYear(adapter.date())
    })

    const yearRef = ref<VBtn>()
    onMounted(async () => {
      await nextTick()
      yearRef.value?.$el.scrollIntoView({ block: 'center' })
    })

    useRender(() => (
      <div
        class="v-date-picker-years"
        style={{
          height: convertToUnit(props.height),
        }}
      >
        <div class="v-date-picker-years__content">
          { years.value.map((year, i) => {
            const btnProps = {
              ref: model.value === year.value ? yearRef : undefined,
              active: model.value === year.value,
              color: model.value === year.value ? props.color : undefined,
              rounded: true,
              text: year.text,
              variant: model.value === year.value ? 'flat' : 'text',
              onClick: () => {
                if (model.value === year.value) {
                  emit('update:modelValue', model.value)
                  return
                }
                model.value = year.value
              },
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
