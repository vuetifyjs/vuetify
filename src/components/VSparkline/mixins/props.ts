import Vue from 'vue'
import { Prop } from 'vue/types/options'

import { SparklineItem } from '../VSparkline'

export default Vue.extend({
  props: {
    data: {
      type: Array as Prop<SparklineItem[]>,
      required: true
    },
    gradient: {
      type: Array as Prop<string[]>,
      required: true
    },
    gradientDirection: {
      type: String as Prop<'top' | 'bottom' | 'left' | 'right'>,
      validator: (val: string) => ['top', 'bottom', 'left', 'right'].includes(val),
      default: 'top'
    },
    autoDraw: Boolean,
    autoDrawDuration: {
      type: Number,
      default: 2000
    },
    autoDrawEasing: {
      type: String,
      default: 'ease'
    },
    height: Number,
    width: Number,
    padding: {
      type: Number,
      default: 8
    },
    smooth: [Boolean, Number],
    lineWidth: Number,
    showLabel: Boolean
  }
})
