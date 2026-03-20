// Composables
import { useDate } from '@/composables/date'

// Utilities
import { computed, shallowRef, watch } from 'vue'
import { clamp } from '@/util'

// Types
import type { Ref } from 'vue'

export function useMonthPicker (props: {
  min?: string
  max?: string
  allowedMonths?: number[] | ((date: number) => boolean)
}, model: Ref<string | null>) {
  const adapter = useDate()

  const viewMode = shallowRef<'months' | 'years'>('months')
  const month = shallowRef<number | null>(null)
  const year = shallowRef<number>(adapter.getYear(adapter.date()))
  const yearTransitionName = shallowRef<string | undefined>(undefined)

  const headerText = computed(() => {
    if (!model.value) return ''
    return adapter.format(adapter.parseISO(`${model.value}-01`), 'monthAndYear')
  })

  function setYear (v: number, withTransition?: boolean) {
    yearTransitionName.value = withTransition
      ? `scroll-x-${v < year.value ? 'reverse-' : ''}transition`
      : undefined
    year.value = v
    updateModel()
    setTimeout(() => { viewMode.value = 'months' }, 100)
  }

  function setMonth (v: number) {
    month.value = v
    updateModel()
  }

  function prevYear () {
    setYear(year.value - 1, true)
  }

  function nextYear () {
    setYear(year.value + 1, true)
  }

  function toggleViewMode () {
    viewMode.value = viewMode.value === 'years' ? 'months' : 'years'
  }

  watch(model, val => {
    if (!val) {
      year.value = adapter.getYear(adapter.date())
      month.value = null
      return
    }
    const [y, m] = val.split('-').map((v: string) => parseInt(v))
    year.value = y
    month.value = clamp(m - 1, 0, 11)
  }, { immediate: true })

  function updateModel () {
    if (year.value && month.value !== null) {
      model.value = `${year.value}-${String(month.value + 1).padStart(2, '0')}`
    }
  }

  return {
    viewMode,
    month,
    year,
    yearTransitionName,
    headerText,
    setYear,
    setMonth,
    prevYear,
    nextYear,
    toggleViewMode,
  }
}
