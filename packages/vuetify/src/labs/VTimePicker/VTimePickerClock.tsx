// StylesthisValue
// Styles
import './VTimePickerClock.sass'

// Utilities
import { computed, ref, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
interface Point {
  x: number
  y: number
}

export const makeVTimePickerClockProps = propsFactory({
  allowedValues: Function as PropType<(value: number) => boolean>,
  ampm: Boolean,
  color: String,
  disabled: Boolean,
  displayedValue: {
    default: null,
  },
  double: Boolean,
  format: {
    type: Function,
    default: (val: string | number) => val,
  },
  max: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  scrollable: Boolean,
  readonly: Boolean,
  rotate: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: Number,
  },
}, 'VTimePickerClock')

export const VTimePickerClock = genericComponent()({
  name: 'VTimePickerClock',

  props: makeVTimePickerClockProps(),

  emits: {
    change: (val: number) => val,
    input: (val: number) => val,
  },

  setup (props, { emit }) {
    const clockRef = ref<HTMLElement | null>(null)
    const innerClockRef = ref<HTMLElement | null>(null)
    const inputValue = ref<number | undefined>(undefined)
    const isDragging = ref(false)
    const valueOnMouseDown = ref(null as number | null)
    const valueOnMouseUp = ref(null as number | null)

    const count = computed(() => props.max - props.min + 1)
    const roundCount = computed(() => props.double ? (count.value / 2) : count.value)
    const degreesPerUnit = computed(() => 360 / roundCount.value)
    const degrees = computed(() => degreesPerUnit.value * Math.PI / 180)
    const displayedValue = computed(() => props.modelValue == null ? props.min : props.modelValue)
    const innerRadiusScale = computed(() => 0.62)

    const update = (value: number) => {
      if (inputValue.value !== value) {
        inputValue.value = value
        emit('input', value)
      }
    }

    const isAllowed = (value: number) => {
      return !props.allowedValues || props.allowedValues(value)
    }

    const wheel = (e: WheelEvent) => {
      e.preventDefault()

      const delta = Math.sign(-e.deltaY || 1)
      let value = displayedValue.value
      do {
        value = value + delta
        value = (value - props.min + count.value) % count.value + props.min
      } while (!isAllowed(value) && value !== displayedValue.value)

      if (value !== props.displayedValue) {
        update(value)
      }
    }

    const isInner = (value: number) => {
      return props.double && (value - props.min >= roundCount.value)
    }

    const handScale = (value: number) => {
      return isInner(value) ? innerRadiusScale.value : 1
    }

    const getPosition = (value: number) => {
      const rotateRadians = props.rotate * Math.PI / 180
      return {
        x: Math.sin((value - props.min) * degrees.value + rotateRadians) * handScale(value),
        y: -Math.cos((value - props.min) * degrees.value + rotateRadians) * handScale(value),
      }
    }

    const angleToValue = (angle: number, insideClick: boolean): number => {
      const value = (
        Math.round(angle / degreesPerUnit.value) +
        (insideClick ? roundCount.value : 0)
      ) % count.value + props.min

      // Necessary to fix edge case when selecting left part of the value(s) at 12 o'clock
      if (angle < (360 - degreesPerUnit.value / 2)) return value

      return insideClick ? props.max - roundCount.value + 1 : props.min
    }

    const getTransform = (i: number) => {
      const { x, y } = getPosition(i)
      return {
        left: `${50 + x * 50}%`,
        top: `${50 + y * 50}%`,
      }
    }

    const euclidean = (p0: Point, p1: Point) => {
      const dx = p1.x - p0.x
      const dy = p1.y - p0.y

      return Math.sqrt(dx * dx + dy * dy)
    }

    const angle = (center: Point, p1: Point) => {
      const value = 2 * Math.atan2(p1.y - center.y - euclidean(center, p1), p1.x - center.x)
      return Math.abs(value * 180 / Math.PI)
    }

    const setMouseDownValue = (value: number) => {
      if (valueOnMouseDown.value === null) {
        valueOnMouseDown.value = value
      }

      valueOnMouseUp.value = value
      update(value)
    }

    const onDragMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      if ((!isDragging.value && e.type !== 'click') || !clockRef.value) return
      const { width, top, left } = clockRef.value?.getBoundingClientRect()
      const { width: innerWidth }: DOMRect = innerClockRef.value?.getBoundingClientRect() ?? { width: 0 } as DOMRect
      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e
      const center = { x: width / 2, y: -width / 2 }
      const coords = { x: clientX - left, y: top - clientY }
      const handAngle = Math.round(angle(center, coords) - props.rotate + 360) % 360
      const insideClick = props.double && euclidean(center, coords) < (innerWidth as number + innerWidth * innerRadiusScale.value) / 4
      const checksCount = Math.ceil(15 / degreesPerUnit.value)
      let value

      for (let i = 0; i < checksCount; i++) {
        value = angleToValue(handAngle + i * degreesPerUnit.value, insideClick)
        if (isAllowed(value)) return setMouseDownValue(value)

        value = angleToValue(handAngle - i * degreesPerUnit.value, insideClick)
        if (isAllowed(value)) return setMouseDownValue(value)
      }
    }

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()

      valueOnMouseDown.value = null
      valueOnMouseUp.value = null
      isDragging.value = true
      onDragMove(e)
    }

    const onMouseUp = (e: MouseEvent | TouchEvent) => {
      e.stopPropagation()

      isDragging.value = false
      if (valueOnMouseUp.value !== null && isAllowed(valueOnMouseUp.value)) {
        emit('change', valueOnMouseUp.value)
      }
    }

    const genChildren = computed(() => {
      const children = []
      for (let value = props.min; value <= props.max; value = value + props.step) {
        children.push(value)
      }
      return children
    })

    watch(() => props.modelValue, val => {
      inputValue.value = val
    })

    useRender(() => {
      return (
        <div
          class={{
            'v-time-picker-clock': true,
            'v-time-picker-clock--indeterminate': props.modelValue == null,
          }}
          onMousedown={ (e: MouseEvent) => onMouseDown(e) }
          onMouseup={ (e: MouseEvent) => onMouseUp(e) }
          onMouseleave={ (e: MouseEvent) => (isDragging.value && onMouseUp(e)) }
          onTouchstart={ (e: TouchEvent) => onMouseDown(e) }
          onTouchend={ (e: TouchEvent) => onMouseUp(e) }
          onMousemove={ (e: MouseEvent) => onDragMove(e) }
          onTouchmove={ (e: TouchEvent) => onDragMove(e) }
          onWheel={ (e: WheelEvent) => (props.scrollable && wheel(e)) }
          ref={ clockRef }
        >
          <div class="v-time-picker-clock__inner" ref={ innerClockRef }>
            <div
              class={{ 'v-time-picker-clock__hand': true, 'v-time-picker-clock__hand--inner': isInner(props.modelValue as number) }}
              style={{
                background: props.modelValue != null ? props.color ? props.color : 'accent' : '',
                transform: `rotate(${props.rotate + degreesPerUnit.value * (displayedValue.value - props.min)}deg) scaleY(${handScale(displayedValue.value)})`,
              }}
            ></div>
            {
              genChildren.value.map(value => (
                <div
                  class={{
                    'v-time-picker-clock__item': true,
                    'v-time-picker-clock__item--active': value === displayedValue.value,
                    'v-time-picker-clock__item--disabled': props.disabled || !isAllowed(value),
                  }}
                  style={{
                    ...getTransform(value),
                    color: value === props.modelValue
                      ? props.color
                        ? props.color
                        : 'accent'
                      : undefined,
                  }}
                ><span>{ props.format(value) }</span></div>
              ))
            }
          </div>
        </div>
      )
    })
  },
})

export type VTimePickerClock = InstanceType<typeof VTimePickerClock>
