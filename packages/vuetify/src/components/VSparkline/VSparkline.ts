import Vue from 'vue'
import { PropValidator } from 'vue/types/options'

import bar from './Bar'
import trend from './Trend'

const COMPONENTS = {
  bar,
  trend
}

export type SparklineItem = number | { value: number }

export interface Boundary {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export interface Point {
  x: number
  y: number
  value: number
}

export default Vue.extend({
  name: 'v-sparkline',

  functional: true,

  props: {
    type: {
      type: String,
      default: 'trend',
      validator: (val: string) => ['trend', 'bar'].includes(val)
    } as PropValidator<'trend' | 'bar'>
  },

  render (h, { props, data }) {
    return h('div', {
      staticClass: 'sparkline'
    }, [
      h(COMPONENTS[props.type], data)
    ])
  }
})
