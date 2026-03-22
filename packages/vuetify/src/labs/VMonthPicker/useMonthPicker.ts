// Composables
import { useDate } from '@/composables/date'
import { useRangePicker } from '@/composables/rangePicker'

// Utilities
import { computed, shallowRef, toRef, watch } from 'vue'
import { wrapInArray } from '@/util'

// Types
import type { Ref } from 'vue'

function toYearMonth (year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

function compareYearMonth (a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0
}

export function useMonthPicker (props: {
  min?: string
  max?: string
  multiple?: boolean | 'range'
  allowedMonths?: number[] | ((date: number) => boolean)
}, model: Ref<string | string[] | null>) {
  const adapter = useDate()

  const viewMode = shallowRef<'months' | 'years'>('months')
  const year = shallowRef<number>(adapter.getYear(adapter.date()))
  const yearTransitionName = shallowRef<string | undefined>(undefined)

  // Internal array model for range picker
  const arrayModel: Ref<string[]> = computed({
    get () {
      if (model.value == null) return []
      return wrapInArray(model.value)
    },
    set (v: string[]) {
      if (!props.multiple) {
        model.value = v[0] ?? null
      } else {
        model.value = v
      }
    },
  })

  const range = useRangePicker({
    multiple: toRef(() => props.multiple),
    model: arrayModel,
    compare: compareYearMonth,
  })

  const headerText = computed(() => {
    const values = arrayModel.value
    if (values.length === 0) return ''
    if (props.multiple === 'range' && values.length === 2) {
      const start = adapter.format(adapter.parseISO(`${values[0]}-01`), 'monthAndYear')
      const end = adapter.format(adapter.parseISO(`${values[1]}-01`), 'monthAndYear')
      return `${start} – ${end}`
    }
    const last = values[values.length - 1]
    return adapter.format(adapter.parseISO(`${last}-01`), 'monthAndYear')
  })

  function setYear (v: number, withTransition?: boolean) {
    yearTransitionName.value = withTransition
      ? `scroll-x-${v < year.value ? 'reverse-' : ''}transition`
      : undefined
    year.value = v
    setTimeout(() => { viewMode.value = 'months' }, 100)
  }

  function selectMonth (monthIndex: number) {
    const value = toYearMonth(year.value, monthIndex)
    range.select(value)
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

  // Sync displayed year from model
  watch(() => arrayModel.value, val => {
    if (val.length === 0) {
      year.value = adapter.getYear(adapter.date())
      return
    }
    const last = val[val.length - 1]
    const [y] = last.split('-').map((v: string) => parseInt(v))
    year.value = y
  }, { immediate: true })

  // Helpers for month buttons
  function getMonthValue (monthIndex: number): string {
    return toYearMonth(year.value, monthIndex)
  }

  function isMonthSelected (monthIndex: number): boolean {
    return range.isSelected(getMonthValue(monthIndex))
  }

  function isMonthRangeStart (monthIndex: number): boolean {
    return range.isRangeStart(getMonthValue(monthIndex))
  }

  function isMonthRangeEnd (monthIndex: number): boolean {
    return range.isRangeEnd(getMonthValue(monthIndex))
  }

  function isMonthRangeMiddle (monthIndex: number): boolean {
    return range.isRangeMiddle(getMonthValue(monthIndex))
  }

  return {
    viewMode,
    year,
    yearTransitionName,
    headerText,
    setYear,
    selectMonth,
    prevYear,
    nextYear,
    toggleViewMode,
    isMonthSelected,
    isMonthRangeStart,
    isMonthRangeEnd,
    isMonthRangeMiddle,
  }
}
