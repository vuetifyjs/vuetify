// Styles
import './VChartAxis.sass'

// Components
import { VFadeTransition } from '@/components/transitions'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { ChartTick } from './scale'

export type VChartAxisSlots = {
  tick: { tick: ChartTick }
}

export const makeVChartAxisProps = propsFactory({
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
  },
  ticks: {
    type: Array as PropType<readonly ChartTick[]>,
    default: () => ([]),
  },
}, 'VChartAxis')

export const VChartAxis = genericComponent<VChartAxisSlots>()({
  name: 'VChartAxis',

  props: makeVChartAxisProps(),

  setup (props, { slots }) {
    useRender(() => (
      <div
        class={['v-chart-axis', `v-chart-axis--${props.direction}`]}
        aria-hidden="true"
      >
        <VFadeTransition group>
          { props.ticks.map(tick => (
            <div
              key={ tick.label }
              class="v-chart-axis__tick"
              style={{ '--v-chart-axis-position': tick.position }}
            >
              { slots.tick?.({ tick }) ?? tick.label }
            </div>
          ))}
        </VFadeTransition>
      </div>
    ))
  },
})

export type VChartAxis = InstanceType<typeof VChartAxis>
