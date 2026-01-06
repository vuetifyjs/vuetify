// Styles
import './VHeatmap.scss'

// Composables
import { useDate } from '@/composables'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

interface HeatmapDay {
  dateText: string
  value: number
  color?: string
}

interface HeatmapMonth {
  label: string
  columns: number
  weekOffset: number
  columnClass: Record<string, boolean>
  days: HeatmapDay[]
}

export type VHeatmapThreshold = {
  min: number
  color: string
}

export type VHeatmapSlots = {
  tooltip: { item: HeatmapDay }
}

export const makeVHeatmapProps = propsFactory({
  year: {
    type: Number,
    default: () => new Date().getFullYear(),
  },
  startMonth: {
    type: Number,
    default: 0,
  },
  monthLimit: {
    type: Number,
    default: 12,
  },
  cellSize: {
    type: Number,
    default: 26,
  },
  values: {
    type: Array as PropType<number[][]>,
    default: () => [],
  },
  thresholds: {
    type: Array as PropType<VHeatmapThreshold[]>,
    default: () => [],
  },
  firstWeekday: {
    type: Number,
    default: 0,
  },
  separateMonths: {
    type: Boolean,
    default: true,
  },

  ...makeThemeProps(),
}, 'VHeatmap')

export const VHeatmap = genericComponent<VHeatmapSlots>()({
  name: 'VHeatmap',

  props: makeVHeatmapProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const adapter = useDate()

    const monthLabels = Array.from({ length: 12 }).map((_, i) => adapter.format(new Date(2024, i, 11), 'monthShort'))

    const weekdayLabels = toRef(() =>
      Array.from({ length: 7 }).map((_, i) => adapter.format(new Date(2024, 10, 11 + i + props.firstWeekday), 'weekdayShort'))
    )

    function colorFromValue (v: number) {
      return props.thresholds.findLast(({ min }) => v >= min)?.color
    }

    const visibleMonths = computed<HeatmapMonth[]>(() => (props.values ?? [])
      .map((_, monthIndex) => {
        const month = props.startMonth + monthIndex
        const offset = (new Date(props.year, month, 1).getDay() + (6 - props.firstWeekday)) % 7
        const daysCount = new Date(props.year, month + 1, 0).getDate()
        return {
          label: monthLabels[(12 + month) % 12],
          columns: Math.ceil((offset + daysCount) / 7),
          weekOffset: offset,
          columnClass: {
            'v-heatmap-month--aligned': offset === 0 && monthIndex > 0,
            'v-heatmap-month--shifted': offset > 0 && monthIndex > 0,
          },
          days: Array.from({ length: daysCount })
            .map((_, day) => {
              const date = new Date(props.year, month, day)
              const value = props.values[monthIndex]?.at(day) ?? 0
              return {
                dateText: adapter.format(date, 'fullDate'),
                value,
                color: colorFromValue(value),
              }
            }),
        }
      })
    )

    useRender(() => (
      <div
        class={[
          'v-heatmap',
          {
            'v-heatmap--merged-months': !props.separateMonths,
            'v-heatmap--separated-months': props.separateMonths,
          },
          themeClasses.value,
        ]}
        style={{
          '--v-heatmap-cell-size': `${props.cellSize}px`,
          '--v-heatmap-month-limit': props.monthLimit,
        }}
      >
        <div class="v-heatmap__weekdays">
          { weekdayLabels.value.map(d => (
            <span key={ d }>{ d }</span>
          ))}
        </div>

        <div class="v-heatmap__months">
          { visibleMonths.value.map((m, i) => (
            <span
              key={ i }
              data-offset={ m.weekOffset }
              class={ m.columnClass }
            >
              { m.label }
            </span>
          ))}
        </div>

        { props.values && (
          <div class="v-heatmap__squares" key="values">
            { visibleMonths.value.map((m, i) => (
              <div
                key={ i }
                class={['v-heatmap__month-days', m.columnClass]}
                style={{ '--v-heatmap-cell-columns': m.columns }}
              >
                { Array.from({ length: m.weekOffset }).map((_, j) => (
                  <div key={ `o-${j}` } class="v-heatmap__offset-cell" />
                ))}
                { m.days.map((d, j) => (
                  <div
                    key={ `d-${j}` }
                    class={[
                      'v-heatmap__cell',
                      { 'v-heatmap__cell--empty': !d.color },
                    ]}
                    style={{ backgroundColor: d.color }}
                  >
                    { slots.tooltip?.({ item: d }) }
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div class="v-heatmap__legend">
          <div class="v-heatmap__legend-label">Less</div>
          <div class="v-heatmap__cell v-heatmap__cell--empty" />
          { props.thresholds.map(({ min, color }) => (
            <div
              key={ min }
              class="v-heatmap__cell"
              style={{ backgroundColor: String(color) }}
            />
          ))}
          <div class="v-heatmap__legend-label">More</div>
        </div>
      </div>
    ))
  },
})

export type VHeatmap = InstanceType<typeof VHeatmap>
