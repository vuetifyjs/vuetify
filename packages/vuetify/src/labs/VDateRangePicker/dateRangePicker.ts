// Composables
import { useCalendarRange } from '@/composables/calendar'
import { useDate } from '@/composables/date'
import { useRtl } from '@/composables/locale'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, nextTick, onMounted, onScopeDispose, shallowRef, watch } from 'vue'
import { clamp, createRange, isFunction } from '@/util'

// Types
import type { Ref } from 'vue'
import type { VDatePickerMonth } from '@/components/VDatePicker/VDatePickerMonth'
import type { VVirtualScroll } from '@/components/VVirtualScroll'
import type { CalendarProps } from '@/composables/calendar'

export function useDateRangeMonths (props: CalendarProps, model: Ref<readonly unknown[]>) {
  const adapter = useDate()
  const { isRtl } = useRtl()
  const { minDate, maxDate, clampDate } = useCalendarRange(props)
  const virtualRef = shallowRef<VVirtualScroll>()
  const monthRefs = new Map<number, VDatePickerMonth>()
  let pendingFocus: string | undefined
  let anchorDate: unknown
  let anchoring = true
  let scrolling = false
  let scrollTop = 0
  let frame = -1
  let scrollFrame = -1

  function monthIndex (date: unknown) {
    return adapter.getYear(date) * 12 + adapter.getMonth(date)
  }

  const selection = computed(() => model.value.map(value => adapter.date(value)).filter(value => adapter.isValid(value)))
  const firstIndex = computed(() => minDate.value
    ? monthIndex(minDate.value)
    : Math.min((adapter.getYear(adapter.date()) - 100) * 12, ...selection.value.map(monthIndex))
  )
  const lastIndex = computed(() => maxDate.value
    ? monthIndex(maxDate.value)
    : Math.max((adapter.getYear(adapter.date()) + 52) * 12 + 11, ...selection.value.map(monthIndex))
  )
  const months = computed(() => createRange(Math.max(0, lastIndex.value - firstIndex.value + 1), firstIndex.value).map(index => {
    const year = Math.floor(index / 12)
    const month = index % 12
    const date = adapter.setMonth(adapter.setYear(adapter.startOfYear(adapter.date()), year), month)

    return { index, year, month, date }
  }))

  function scrollToDate (date: unknown) {
    if (!virtualRef.value || !months.value.length) return
    const index = clamp(monthIndex(date) - firstIndex.value, 0, months.value.length - 1)
    scrolling = true
    virtualRef.value?.scrollToIndex(index)
    nextTick(() => {
      scrollTop = virtualRef.value?.$el.scrollTop ?? 0
      cancelAnimationFrame(scrollFrame)
      scrollFrame = requestAnimationFrame(() => scrolling = false)
    })
  }

  function scrollToSelection () {
    scrollToDate(anchorDate ?? clampDate(selection.value[0] ?? adapter.date()))
  }

  function focusDate (iso: string) {
    const month = monthRefs.get(monthIndex(adapter.date(iso)))
    if (month) {
      pendingFocus = undefined
      month.focusItem(iso)
    } else {
      pendingFocus = iso
      anchorDate = adapter.date(iso)
      anchoring = true
      scrollToDate(anchorDate)
    }
  }

  function setMonthRef (index: number, month: VDatePickerMonth | null) {
    if (!month) {
      monthRefs.delete(index)
      return
    }

    monthRefs.set(index, month)
    if (pendingFocus && monthIndex(adapter.date(pendingFocus)) === index) {
      const iso = pendingFocus
      nextTick(() => focusDate(iso))
    }
  }

  function isDateDisabled (date: unknown) {
    if (props.disabled) return true
    if (minDate.value && adapter.isBefore(adapter.endOfDay(date), minDate.value)) return true
    if (maxDate.value && adapter.isAfter(date, maxDate.value)) return true
    if (!props.weekdays.includes(adapter.toJsDate(date).getDay())) return true
    if (Array.isArray(props.allowedDates) && props.allowedDates.length) {
      return !props.allowedDates.some(value => adapter.isSameDay(adapter.date(value), date))
    }
    return isFunction(props.allowedDates) && !props.allowedDates(date)
  }

  function onBoundaryNavigate ({ direction, targetIsoDate }: {
    direction: 'up' | 'down' | 'left' | 'right'
    targetIsoDate: string
  }) {
    let target = adapter.date(targetIsoDate)
    const step = direction === 'up' ? -7 : direction === 'down' ? 7
      : (direction === 'left' ? -1 : 1) * (isRtl.value ? -1 : 1)

    const targetMonth = monthIndex(target)
    while (monthIndex(target) === targetMonth) {
      if (monthIndex(target) < firstIndex.value || monthIndex(target) > lastIndex.value) return
      if (minDate.value && adapter.isBefore(adapter.endOfDay(target), minDate.value)) return
      if (maxDate.value && adapter.isAfter(target, maxDate.value)) return
      if (!isDateDisabled(target)) {
        focusDate(adapter.toISO(target))
        return
      }
      target = adapter.addDays(target, step)
    }
  }

  function onInteraction () {
    anchoring = false
    cancelAnimationFrame(frame)
  }

  function onScroll () {
    if (!scrolling || Math.abs((virtualRef.value?.$el.scrollTop ?? 0) - scrollTop) > 1) onInteraction()
  }

  function alignSelection () {
    if (!anchoring) return
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => anchoring && scrollToSelection())
  }

  // Remeasuring virtual rows can move the selected month while a dialog is opening.
  useResizeObserver(() => virtualRef.value?.$el.firstElementChild, alignSelection, { box: 'border-box' })
  onMounted(alignSelection)
  onScopeDispose(() => {
    if (frame >= 0) cancelAnimationFrame(frame)
    if (scrollFrame >= 0) cancelAnimationFrame(scrollFrame)
  })
  watch([firstIndex, lastIndex], () => {
    anchorDate = undefined
    anchoring = true
    nextTick(scrollToSelection)
  })
  watch(model, (value, previous) => {
    const changed = value.find((date, index) => !previous[index] || !adapter.isSameDay(adapter.date(date), adapter.date(previous[index])))
    if (!changed || !adapter.isValid(adapter.date(changed))) return

    const iso = adapter.toISO(adapter.date(changed))
    const day = monthRefs.get(monthIndex(adapter.date(changed)))?.$el.querySelector(`[data-v-date="${iso}"]`)
    const container = virtualRef.value?.$el
    if (day && container) {
      const bounds = container.getBoundingClientRect()
      const dayBounds = day.getBoundingClientRect()
      if (dayBounds.top >= bounds.top && dayBounds.bottom <= bounds.bottom) return
    }
    anchorDate = clampDate(adapter.date(changed))
    anchoring = true
    scrollToDate(anchorDate)
  }, { flush: 'post' })

  return { months, virtualRef, setMonthRef, onBoundaryNavigate, onInteraction, onScroll }
}
