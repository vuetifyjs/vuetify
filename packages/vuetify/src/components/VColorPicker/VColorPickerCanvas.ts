// Types
import Vue, { VNode } from 'vue'
import { clamp, deepEqual } from '../../util/helpers'
import { HSVA } from '../../util/colorUtils'
import { PropValidator } from 'vue/types/options'

function renderHsv (canvas: HTMLCanvasElement, hue: number) {
  const ctx = canvas.getContext('2d')

  if (!ctx) return

  const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
  saturationGradient.addColorStop(0, `hsla(0, 0%, 100%, 1)`)
  saturationGradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 1)`)
  ctx.fillStyle = saturationGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
  valueGradient.addColorStop(0, `hsla(0, 0%, 100%, 0)`)
  valueGradient.addColorStop(1, `hsla(0, 0%, 0%, 1) `)
  ctx.fillStyle = valueGradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

export default Vue.extend({
  name: 'v-color-picker-canvas',

  props: {
    hue: Number,
    value: Array as PropValidator<number[]>,
    dotSize: {
      type: Number,
      default: 10
    }
  },

  data: () => ({
    boundingRect: {} as ClientRect,
    dotX: 0,
    dotY: 0,
    dragging: false,
    internalValue: [0, 0]
  }),

  watch: {
    hue (v: number) {
      this.updateCanvas()
    },
    value: {
      handler (v: HSVA) {
        if (deepEqual(this.internalValue, v)) return
        this.internalValue = v
      },
      immediate: true
    },
    internalValue (v: any) {
      this.updateCanvas()
      this.updateDot()
      this.$emit('input', v)
    }
  },

  mounted () {
    this.updateBoundingRect()

    this.$nextTick(() => {
      this.updateCanvas()
      this.updateDot()
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
      this.internalValue = [
        x / this.boundingRect.width,
        1 - y / this.boundingRect.height
      ]
    },
    updateCanvas () {
      renderHsv(this.$refs.canvas as HTMLCanvasElement, this.hue)
    },
    updateDot () {
      this.dotX = this.internalValue[0] * this.boundingRect.width
      this.dotY = (1 - this.internalValue[1]) * this.boundingRect.height
    },
    updateBoundingRect () {
      this.boundingRect = this.$el.getBoundingClientRect()
    },
    handleClick (e: MouseEvent) {
      this.updateBoundingRect()
      const [x, y] = this.getLocalPosition(e.clientX, e.clientY)
      this.updateInternalValue(x, y)
    },
    handleMouseDown (e: MouseEvent) {
      this.updateBoundingRect()
      window.addEventListener('mousemove', this.handleMouseMove)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseMove (e: MouseEvent) {
      const [x, y] = this.getLocalPosition(e.clientX, e.clientY)
      this.updateInternalValue(x, y)
    },
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
          width: `${this.dotSize}px`,
          height: `${this.dotSize}px`,
          top: `${this.dotY - (this.dotSize / 2)}px`,
          left: `${this.dotX - (this.dotSize / 2)}px`
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
      }
    }, [
      this.genCanvas(),
      this.genDot()
    ])
  }
})
