// Styles
import './VDatePickerYears.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useDate } from '@/labs/date'

// Utilities
import { computed, onMounted, ref } from 'vue'
import { convertToUnit, createRange, genericComponent, propsFactory, useRender } from '@/util'

export const makeVDatePickerYearsViewProps = propsFactory({
  min: Number,
  max: Number,
  height: [String, Number],
  displayDate: null,
}, 'VDatePickerYearsView')

export const VDatePickerYearsView = genericComponent()({
  name: 'VDatePickerYearsView',

  props: makeVDatePickerYearsViewProps(),

  emits: {
    'update:displayDate': (date: any) => true,
    'update:viewMode': (date: any) => true,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    const displayYear = computed(() => adapter.getYear(props.displayDate))
    const years = computed(() => {
      const min = props.min ?? displayYear.value - 50 - 2
      const max = props.max ?? displayYear.value + 50

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
          { years.value.map(year => (
            <VBtn
              ref={ year === displayYear.value ? yearRef : undefined }
              variant="flat"
              rounded="xl"
              color={ year === displayYear.value ? 'primary' : undefined }
              onClick={ () => {
                emit('update:displayDate', adapter.setYear(props.displayDate, year))
                emit('update:viewMode', 'month')
              }}
            >{ year }</VBtn>
          ))}
        </div>
      </div>
    ))

    return {}
  },
})

export type VDatePickerYearsView = InstanceType<typeof VDatePickerYearsView>
