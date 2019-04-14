// Styles
import './VColorPickerCanvas.sass'

// Mixins
import Measurable from '../../mixins/measurable'

// Helpers
import { clamp, convertToUnit, throttle } from '../../util/helpers'
import { fromHsva, VColorPickerColor } from './util'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

function renderHsv (canvas: HTMLCanvasElement, hue: number) {
  const ctx = canvas.getContext('2d')

  if (!ctx) return

  const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
  saturationGradient.addColorStop(0, 'white')
  saturationGradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 1)`)
  ctx.fillStyle = saturationGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  valueGradient.addColorStop(0, 'transparent')
  valueGradient.addColorStop(1, 'black')
  ctx.fillStyle = valueGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

export default Measurable.extend({
  name: 'v-color-picker-canvas',

  props: {
    color: Object as PropValidator<VColorPickerColor>,
    dotSize: {
      type: Number,
      default: 10
    },
    disabled: Boolean
  },

  data () {
    return {
      boundingRect: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      } as ClientRect,
      dotX: 0,
      dotY: 0,
      dragging: false,
      internalValue: this.color
    }
  },

  computed: {
    dotPosition (): [number, number] {
      return [
        this.internalValue.hsva.s * this.boundingRect.width,
        (1 - this.internalValue.hsva.v) * this.boundingRect.height
      ]
    }
  },

  watch: {
    color (v: VColorPickerColor) {
      this.internalValue = v
      this.updateCanvas()
    },
    internalValue (v: VColorPickerColor) {
      this.$emit('update:color', v)
    }
  },

  mounted () {
    this.updateBoundingRect()

    this.$nextTick(() => {
      this.updateCanvas()
    })
  },

  methods: {
    getLocalPosition (x: number, y: number): number[] {
      return [
        clamp(x - this.boundingRect.left, 0, this.boundingRect.width),
        clamp(y - this.boundingRect.top, 0, this.boundingRect.height)
      ]
    },
    updateInternalValue (x: number, y: number) {
      const [s, v] = [
        x / this.boundingRect.width,
        1 - y / this.boundingRect.height
      ]

      this.internalValue = fromHsva({
        h: this.internalValue.hue,
        s,
        v,
        a: this.internalValue.alpha
      })
    },
    updateCanvas () {
      renderHsv(this.$refs.canvas as HTMLCanvasElement, this.internalValue.hue)
    },
    updateBoundingRect () {
      this.boundingRect = this.$el.getBoundingClientRect()
    },
    handleClick (e: MouseEvent) {
      if (this.disabled) return

      this.updateBoundingRect()
      const [x, y] = this.getLocalPosition(e.clientX, e.clientY)
      this.updateInternalValue(x, y)
    },
    handleMouseDown (e: MouseEvent) {
      if (this.disabled) return

      // To prevent selection while moving cursor
      e.preventDefault()

      this.updateBoundingRect()
      window.addEventListener('mousemove', this.handleMouseMove)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseMove: throttle(function (e: MouseEvent) {
      // TODO: I could not find a way to type this
      // @ts-ignore
      if (this.disabled) return

      // @ts-ignore
      const [x, y] = this.getLocalPosition(e.clientX, e.clientY)

      // @ts-ignore
      this.updateInternalValue(x, y)
    }, 25),
    handleMouseUp (e: MouseEvent) {
      window.removeEventListener('mousemove', this.handleMouseMove)
      window.removeEventListener('mouseup', this.handleMouseUp)
    },
    genCanvas (): VNode {
      return this.$createElement('canvas', {
        ref: 'canvas',
        attrs: {
          width: this.boundingRect.width,
          height: this.boundingRect.height
        }
      })
    },
    genDot (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__canvas-dot',
        style: {
          width: convertToUnit(this.dotSize),
          height: convertToUnit(this.dotSize),
          top: convertToUnit(this.dotPosition[1] - (this.dotSize / 2)),
          left: convertToUnit(this.dotPosition[0] - (this.dotSize / 2))
        },
        class: {
          'v-color-picker__canvas-dot--disabled': this.disabled
        }
      })
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-color-picker__canvas',
      on: {
        click: this.handleClick,
        mousedown: this.handleMouseDown
      },
      style: this.measurableStyles
    }, [
      this.genCanvas(),
      this.genDot()
    ])
  }
})
