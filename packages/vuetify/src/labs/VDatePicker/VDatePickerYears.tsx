// Styles
import './VDatePickerYears.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useDate } from '@/labs/date'

// Utilities
import { computed, onMounted, ref } from 'vue'
import { convertToUnit, createRange, genericComponent, propsFactory, useRender } from '@/util'

export const makeVDatePickerYearsProps = propsFactory({
  color: String,
  height: [String, Number],
  displayDate: null,
  min: [Number, String, Date],
  max: [Number, String, Date],
}, 'VDatePickerYears')

export const VDatePickerYears = genericComponent()({
  name: 'VDatePickerYears',

  props: makeVDatePickerYearsProps(),

  emits: {
    'update:displayDate': (date: any) => true,
    'click:mode': () => true,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    const displayYear = computed(() => adapter.getYear(props.displayDate ?? new Date()))
    const years = computed(() => {
      const min = props.min ? adapter.date(props.min).getFullYear() : displayYear.value - 100
      const max = props.max ? adapter.date(props.max).getFullYear() : displayYear.value + 50

      return createRange(max - min, min)
    })

    const yearRef = ref<VBtn>()
    onMounted(() => {
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
          { years.value.map(year => {
            function onClick () {
              emit('update:displayDate', adapter.setYear(props.displayDate, year))
              emit('click:mode')
            }

            return (
              <VBtn
                ref={ year === displayYear.value ? yearRef : undefined }
                active={ year === displayYear.value }
                color={ year === displayYear.value ? props.color : undefined }
                rounded="xl"
                text={ String(year) }
                variant={ year === displayYear.value ? 'flat' : 'text' }
                onClick={ onClick }
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
