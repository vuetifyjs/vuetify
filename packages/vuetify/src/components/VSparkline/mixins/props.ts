import Vue from 'vue'
import { Prop } from 'vue/types/options'

import { SparklineItem } from '../VSparkline'

export default Vue.extend({
  props: {
    autoDraw: Boolean,
    autoDrawDuration: {
      type: Number,
      default: 2000
    },
    autoDrawEasing: {
      type: String,
      default: 'ease'
    },
    color: {
      type: String,
      default: 'blue'
    },
    gradient: {
      type: Array as Prop<string[]>,
      default: () => ([])
    },
    gradientDirection: {
      type: String as Prop<'top' | 'bottom' | 'left' | 'right'>,
      validator: (val: string) => ['top', 'bottom', 'left', 'right'].includes(val),
      default: 'top'
    },
    height: Number,
    lineWidth: Number,
    padding: {
      type: Number,
      default: 8
    },
    smooth: [Boolean, Number],
    showLabel: Boolean,
    value: {
      type: Array as Prop<SparklineItem[]>,
      default: () => ([])
    },
    width: Number
  }
})
