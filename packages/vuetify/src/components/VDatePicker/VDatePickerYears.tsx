// Styles
import './VDatePickerYears.sass'

// Components
import { VBtn } from '../VBtn'

// Composables
import { useDatePicker } from './composables'

// Utilities
import { convertToUnit, createRange, defineComponent, useRender } from '@/util'
import { computed, onMounted, ref } from 'vue'

export const VDatePickerYears = defineComponent({
  name: 'VDatePickerYears',

  props: {
    min: Number,
    max: Number,
    mode: String,
    height: [String, Number],
  },

  emits: {
    'update:displayDate': (date: any) => true,
    'update:mode': (date: any) => true,
  },

  setup (props, { emit }) {
    const { displayDate, adapter } = useDatePicker()
    const displayYear = computed(() => adapter.value.getYear(displayDate.value))
    const years = computed(() => {
      const min = props.min ?? displayYear.value - 50 - 2
      const max = props.max ?? displayYear.value + 50

      return createRange(max - min, min)
    })

    const yearRef = ref<VBtn>()
    onMounted(() => {
      yearRef.value?.$el.scrollIntoView()
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
              variant="contained-flat"
              rounded="xl"
              color={ year === displayYear.value ? 'primary' : undefined }
              onClick={ () => {
                emit('update:displayDate', adapter.value.setYear(displayDate.value, year))
                emit('update:mode', 'month')
              } }
            >{ year }</VBtn>
          ))}
        </div>
      </div>
    ))

    return {}
  },
})
