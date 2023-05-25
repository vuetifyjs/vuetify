// Styles
import './VColorPickerCanvas.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import { clamp, convertToUnit, defineComponent, getEventCoordinates, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { HSV } from '@/util'

export const makeVColorPickerCanvasProps = propsFactory({
  color: {
    type: Object as PropType<HSV | null>,
  },
  disabled: Boolean,
  dotSize: {
    type: [Number, String],
    default: 10,
  },
  height: {
    type: [Number, String],
    default: 150,
  },
  width: {
    type: [Number, String],
    default: 300,
  },

  ...makeComponentProps(),
}, 'v-color-picker-canvas')

export const VColorPickerCanvas = defineComponent({
  name: 'VColorPickerCanvas',

  props: makeVColorPickerCanvasProps(),

  emits: {
    'update:color': (color: HSV) => true,
    'update:position': (hue: any) => true,
  },

  setup (props, { emit }) {
    const isInteracting = shallowRef(false)
    const isOutsideUpdate = shallowRef(false)
    const dotPosition = ref({ x: 0, y: 0 })

    const dotStyles = computed(() => {
      const { x, y } = dotPosition.value
      const radius = parseInt(props.dotSize, 10) / 2

      return {
        width: convertToUnit(props.dotSize),
        height: convertToUnit(props.dotSize),
        transform: `translate(${convertToUnit(x - radius)}, ${convertToUnit(y - radius)})`,
      }
    })

    const canvasRef = ref<HTMLCanvasElement | null>()
    const canvasWidth = shallowRef(parseFloat(props.width))
    const canvasHeight = shallowRef(parseFloat(props.height))
    const { resizeRef } = useResizeObserver(entries => {
      if (!resizeRef.value?.offsetParent) return

      const { width, height } = entries[0].contentRect

      canvasWidth.value = width
      canvasHeight.value = height
    })

    function updateDotPosition (x: number, y: number, rect: DOMRect) {
      const { left, top, width, height } = rect
      dotPosition.value = {
        x: clamp(x - left, 0, width),
        y: clamp(y - top, 0, height),
      }
    }

    function handleClick (e: MouseEvent) {
      if (props.disabled || !canvasRef.value) return

      updateDotPosition(e.clientX, e.clientY, canvasRef.value.getBoundingClientRect())
    }

    function handleMouseDown (e: MouseEvent | TouchEvent) {
      // To prevent selection while moving cursor
      e.preventDefault()

      if (props.disabled) return

      isInteracting.value = true

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleMouseMove)
      window.addEventListener('touchend', handleMouseUp)
    }

    function handleMouseMove (e: MouseEvent | TouchEvent) {
      if (props.disabled || !canvasRef.value) return

      isInteracting.value = true

      const coords = getEventCoordinates(e)

      updateDotPosition(coords.clientX, coords.clientY, canvasRef.value.getBoundingClientRect())
    }

    function handleMouseUp () {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleMouseMove)
      window.removeEventListener('touchend', handleMouseUp)
    }

    watch(dotPosition, () => {
      if (isOutsideUpdate.value) {
        isOutsideUpdate.value = false
        return
      }

      if (!canvasRef.value) return

      const { x, y } = dotPosition.value

      emit('update:color', {
        h: props.color?.h ?? 0,
        s: clamp(x, 0, canvasWidth.value) / canvasWidth.value,
        v: 1 - clamp(y, 0, canvasHeight.value) / canvasHeight.value,
        a: props.color?.a ?? 1,
      })
    })

    function updateCanvas () {
      if (!canvasRef.value) return

      const canvas = canvasRef.value
      const ctx = canvas.getContext('2d')

      if (!ctx) return

      const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      saturationGradient.addColorStop(0, 'hsla(0, 0%, 100%, 1)') // white
      saturationGradient.addColorStop(1, `hsla(${props.color?.h ?? 0}, 100%, 50%, 1)`)
      ctx.fillStyle = saturationGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      valueGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0)') // transparent
      valueGradient.addColorStop(1, 'hsla(0, 0%, 0%, 1)') // black
      ctx.fillStyle = valueGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    watch(() => props.color?.h, updateCanvas, { immediate: true })
    watch(() => [canvasWidth.value, canvasHeight.value], (newVal, oldVal) => {
      updateCanvas()
      dotPosition.value = {
        x: dotPosition.value.x * newVal[0] / oldVal[0],
        y: dotPosition.value.y * newVal[1] / oldVal[1],
      }
    }, { flush: 'post' })

    watch(() => props.color, () => {
      if (isInteracting.value) {
        isInteracting.value = false
        return
      }

      isOutsideUpdate.value = true

      dotPosition.value = props.color ? {
        x: props.color.s * canvasWidth.value,
        y: (1 - props.color.v) * canvasHeight.value,
      } : { x: 0, y: 0 }
    }, { deep: true, immediate: true })

    onMounted(() => updateCanvas())

    useRender(() => (
      <div
        ref={ resizeRef }
        class={[
          'v-color-picker-canvas',
          props.class,
        ]}
        style={ props.style }
        onClick={ handleClick }
        onMousedown={ handleMouseDown }
        onTouchstart={ handleMouseDown }
      >
        <canvas
          ref={ canvasRef }
          width={ canvasWidth.value }
          height={ canvasHeight.value }
        />
        { props.color && (
          <div
            class={[
              'v-color-picker-canvas__dot',
              {
                'v-color-picker-canvas__dot--disabled': props.disabled,
              },
            ]}
            style={ dotStyles.value }
          />
        )}
      </div>
    ))

    return {}
  },
})

export type VColorPickerCanvas = InstanceType<typeof VColorPickerCanvas>
