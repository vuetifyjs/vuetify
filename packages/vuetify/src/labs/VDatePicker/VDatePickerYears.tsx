// Styles
import './VDatePickerYears.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useDate } from '@/composables/date'

// Utilities
import { convertToUnit, createRange, defineComponent, useRender } from '@/util'
import { computed, onMounted, ref } from 'vue'

export const VDatePickerYears = defineComponent({
  name: 'VDatePickerYears',

  props: {
    min: Number,
    max: Number,
    viewMode: String,
    height: [String, Number],
    displayDate: null,
  },

  emits: {
    'update:displayDate': (date: any) => true,
    'update:viewMode': (date: any) => true,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    const displayYear = computed(() => adapter.value.getYear(props.displayDate))
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
                emit('update:displayDate', adapter.value.setYear(props.displayDate, year))
                emit('update:viewMode', 'month')
              } }
            >{ year }</VBtn>
          ))}
        </div>
      </div>
    ))

    return {}
  },
})
