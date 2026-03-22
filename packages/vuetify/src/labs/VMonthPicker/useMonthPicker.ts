// Composables
import { useDate } from '@/composables/date'
import { useLocale } from '@/composables/locale'
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
  const { t } = useLocale()

  const viewMode = shallowRef<'months' | 'years'>('months')
  const year = shallowRef<number>(adapter.getYear(adapter.date()))

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
    if (values.length === 0) {
      return props.multiple === 'range'
        ? t('$vuetify.monthPicker.range.title')
        : t('$vuetify.monthPicker.header')
    }
    if (props.multiple === 'range' && values.length === 2) {
      const startDate = adapter.parseISO(`${values[0]}-01`)
      const endDate = adapter.parseISO(`${values[1]}-01`)
      const start = `${adapter.format(startDate, 'monthShort')} ${adapter.format(startDate, 'year')}`
      const end = `${adapter.format(endDate, 'monthShort')} ${adapter.format(endDate, 'year')}`
      return `${start} – ${end}`
    }
    if (props.multiple && values.length > 1) {
      return t('$vuetify.monthPicker.itemsSelected', values.length)
    }
    const last = values[values.length - 1]
    return adapter.format(adapter.parseISO(`${last}-01`), 'monthAndYear')
  })

  function setYear (v: number) {
    year.value = v
    setTimeout(() => { viewMode.value = 'months' }, 100)
  }

  function selectMonth (monthIndex: number) {
    const value = toYearMonth(year.value, monthIndex)
    range.select(value)
  }

  const disablePrevYear = computed(() => {
    if (!props.min) return false
    const minYear = parseInt(props.min.split('-')[0])
    return year.value <= minYear
  })

  const disableNextYear = computed(() => {
    if (!props.max) return false
    const maxYear = parseInt(props.max.split('-')[0])
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

  // Sync displayed year from model
  watch(() => arrayModel.value, val => {
    if (val.length === 0) return
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

  function previewMonth (monthIndex: number) {
    range.setPreview(getMonthValue(monthIndex))
  }

  function clearPreview () {
    range.clearPreview()
  }

  function isMonthPreviewStart (monthIndex: number): boolean {
    return range.isPreviewStart(getMonthValue(monthIndex))
  }

  function isMonthPreviewEnd (monthIndex: number): boolean {
    return range.isPreviewEnd(getMonthValue(monthIndex))
  }

  function isMonthPreviewMiddle (monthIndex: number): boolean {
    return range.isPreviewMiddle(getMonthValue(monthIndex))
  }

  function isMonthPreviewed (monthIndex: number): boolean {
    return range.isPreviewedRange(getMonthValue(monthIndex))
  }

  return {
    viewMode,
    year,
    headerText,
    disablePrevYear,
    disableNextYear,
    setYear,
    selectMonth,
    prevYear,
    nextYear,
    toggleViewMode,
    isMonthSelected,
    isMonthRangeStart,
    isMonthRangeEnd,
    isMonthRangeMiddle,
    previewMonth,
    clearPreview,
    isMonthPreviewStart,
    isMonthPreviewEnd,
    isMonthPreviewMiddle,
    isMonthPreviewed,
  }
}
