export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    gradient: {
      type: Array,
      required: true
    },
    gradientDirection: {
      type: String,
      validator: val => ['top', 'bottom', 'left', 'right'].indexOf(val) > -1,
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
    lineWidth: Number
  }
}