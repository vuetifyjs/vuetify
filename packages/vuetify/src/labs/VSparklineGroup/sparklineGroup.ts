// Utilities
import { computed, shallowRef, toValue } from 'vue'
import { linearTicks, niceDomain, toPosition } from './scale'
import { clamp } from '@/util'

// Types
import type { InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import type { ChartAxisConfig, ChartTick } from './scale'

export type SparklineSeriesType = 'trend' | 'bar'

export interface SparklineGroupSeries {
  type: SparklineSeriesType
  values: number[]
  color?: string
  shared: boolean
}

export interface SparklineGroupItem extends SparklineGroupSeries {
  index: number
  value: number
}

export interface SparklineGroupProvide {
  register: (series: () => SparklineGroupSeries) => () => void
  width: Readonly<Ref<number>>
  height: Readonly<Ref<number>>
  domain: Readonly<Ref<[number, number]>>
  fraction: Readonly<Ref<number | null>>
  interactive: Readonly<Ref<boolean>>
}

export const VSparklineGroupSymbol: InjectionKey<SparklineGroupProvide> = Symbol.for('vuetify:v-sparkline-group')

export function indexAt (type: SparklineSeriesType, length: number, fraction: number) {
  return type === 'bar'
    ? clamp(Math.floor(fraction * length), 0, length - 1)
    : Math.round(fraction * (length - 1))
}

export function fractionAt (type: SparklineSeriesType, length: number, index: number) {
  return type === 'bar'
    ? (index + 0.5) / length
    : index / Math.max(length - 1, 1)
}

export interface SparklineGroupOptions {
  min?: MaybeRefOrGetter<number | undefined>
  max?: MaybeRefOrGetter<number | undefined>
  xAxis?: MaybeRefOrGetter<ChartAxisConfig>
  yAxis?: MaybeRefOrGetter<ChartAxisConfig>
  width: MaybeRefOrGetter<number>
  height: MaybeRefOrGetter<number>
  interactive?: MaybeRefOrGetter<boolean>
}

export function createSparklineGroup (options: SparklineGroupOptions) {
  const sources = shallowRef<(() => SparklineGroupSeries)[]>([])
  const series = computed(() => sources.value.map(source => source()).filter(s => s.values.length))
  const primary = computed(() => series.value[0])

  function register (source: () => SparklineGroupSeries) {
    sources.value = [...sources.value, source]
    return () => {
      sources.value = sources.value.filter(s => s !== source)
    }
  }

  const xAxis = computed(() => toValue(options.xAxis) ?? {})
  const yAxis = computed(() => toValue(options.yAxis) ?? {})
  const ticks = computed(() => yAxis.value.ticks ?? 5)

  const domain = computed<[number, number]>(() => {
    const values = series.value.filter(s => s.shared).flatMap(s => s.values)
    const min = toValue(options.min) ?? Math.min(...values)
    const max = toValue(options.max) ?? Math.max(...values)
    if (!Number.isFinite(min) || !Number.isFinite(max)) return [0, 1]
    const [niceMin, niceMax] = niceDomain(min, max, ticks.value)
    return [toValue(options.min) ?? niceMin, toValue(options.max) ?? niceMax]
  })

  const yTicks = computed<ChartTick[]>(() => {
    const format = yAxis.value.format ?? String
    return linearTicks(...domain.value, ticks.value).map(value => ({
      value,
      position: toPosition(value, domain.value),
      label: format(value),
    }))
  })

  const xTicks = computed<ChartTick[]>(() => {
    const { labels, ticks = 5, format = String } = xAxis.value
    if (labels?.length) {
      return labels.map((label, i) => ({ value: i, position: i / Math.max(labels.length - 1, 1), label }))
    }
    const length = primary.value?.values.length ?? 0
    const count = Math.min(ticks, length)
    return Array.from({ length: count }, (_, i) => {
      const value = Math.round(i * (length - 1) / Math.max(count - 1, 1))
      return { value, position: positionOf(value), label: format(value) }
    })
  })

  const index = shallowRef<number | null>(null)

  const fraction = computed(() => {
    if (index.value === null || !primary.value) return null
    return fractionAt(primary.value.type, primary.value.values.length, index.value)
  })

  const items = computed<SparklineGroupItem[]>(() => {
    if (fraction.value === null) return []
    return series.value.map(s => {
      const itemIndex = indexAt(s.type, s.values.length, fraction.value!)
      return { ...s, index: itemIndex, value: s.values[itemIndex] }
    })
  })

  function select (value: number | null) {
    index.value = value
  }

  function selectAt (target: number) {
    if (!primary.value) return
    index.value = indexAt(primary.value.type, primary.value.values.length, clamp(target, 0, 1))
  }

  function step (direction: -1 | 1) {
    if (!primary.value) return
    const last = primary.value.values.length - 1
    const current = index.value ?? (direction === 1 ? -1 : last + 1)
    index.value = clamp(current + direction, 0, last)
  }

  function positionOf (itemIndex: number) {
    return primary.value ? fractionAt(primary.value.type, primary.value.values.length, itemIndex) : 0
  }

  const provided: SparklineGroupProvide = {
    register,
    width: computed(() => toValue(options.width)),
    height: computed(() => toValue(options.height)),
    domain,
    fraction,
    interactive: computed(() => !!toValue(options.interactive)),
  }

  return { provided, series, primary, domain, xTicks, yTicks, index, fraction, items, select, selectAt, step, positionOf }
}
