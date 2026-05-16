// Composables
import { useDate } from '@/composables/date'
import { useRangePicker } from '@/composables/rangePicker'

// Utilities
import { computed, shallowRef, toRef, watch } from 'vue'

// Types
import type { Ref } from 'vue'

function toYearMonth (year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

function compareYearMonth (a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0
}

export interface MonthPickerProps {
  min?: string
  max?: string
  multiple?: boolean | 'range'
  allowedMonths?: number[] | ((date: number) => boolean)
}

export function useMonthPicker (props: MonthPickerProps, model: Ref<readonly string[]>) {
  const adapter = useDate()

  const viewMode = shallowRef<'months' | 'years'>('months')
  const year = shallowRef<number>(adapter.getYear(adapter.date()))

  const range = useRangePicker({
    multiple: toRef(() => props.multiple),
    model,
    compare: compareYearMonth,
  })

  function setYear (v: number) {
    year.value = v
    // Brief delay so the year-button click feedback is visible before the view swaps
    setTimeout(() => { viewMode.value = 'months' }, 100)
  }

  function getMonthValue (monthIndex: number): string {
    return toYearMonth(year.value, monthIndex)
  }

  function selectMonth (monthIndex: number) {
    range.select(getMonthValue(monthIndex))
  }

  const disablePrevYear = computed(() => {
    if (viewMode.value === 'years') return true
    if (!props.min) return false
    const minYear = parseInt(props.min.split('-')[0], 10)
    return year.value <= minYear
  })

  const disableNextYear = computed(() => {
    if (viewMode.value === 'years') return true
    if (!props.max) return false
    const maxYear = parseInt(props.max.split('-')[0], 10)
    return year.value >= maxYear
  })

  function prevYear () {
    if (disablePrevYear.value) return
    setYear(year.value - 1)
  }

  function nextYear () {
    if (disableNextYear.value) return
    setYear(year.value + 1)
  }

  function toggleViewMode () {
    viewMode.value = viewMode.value === 'years' ? 'months' : 'years'
  }

  watch(model, val => {
    if (val.length === 0) return
    const last = val[val.length - 1]
    const [y] = last.split('-').map(v => parseInt(v, 10))
    year.value = y
  }, { immediate: true })

  return {
    viewMode,
    year,
    disablePrevYear,
    disableNextYear,
    setYear,
    selectMonth,
    prevYear,
    nextYear,
    toggleViewMode,
    getMonthValue,
    range,
  }
}
