// Styles
import './VTimePickerClock.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useTextColor } from '@/composables/color'
import { useLocale } from '@/composables/locale'

// Utilities
import { computed, onScopeDispose, ref, watch } from 'vue'
import { debounce, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VTimePickerViewMode } from './shared'
interface Point {
  x: number
  y: number
}

export const makeVTimePickerClockProps = propsFactory({
  allowedValues: Function as PropType<(value: number) => boolean>,
  ampm: Boolean,
  color: {
    type: String,
    default: 'surface-variant',
  },
  disabled: Boolean,
  displayedValue: null,
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
  viewMode: {
    type: String as PropType<VTimePickerViewMode>,
    default: 'hour',
  },
}, 'VTimePickerClock')

export const VTimePickerClock = genericComponent()({
  name: 'VTimePickerClock',

  props: makeVTimePickerClockProps(),

  emits: {
    change: (val: number) => true,
    input: (val: number) => true,
  },

  setup (props, { emit }) {
    const { t } = useLocale()
    const clockRef = ref<HTMLElement | null>(null)
    const innerClockRef = ref<HTMLElement | null>(null)
    const inputValue = ref<number | undefined>(undefined)
    const isDragging = ref(false)
    const valueOnMouseDown = ref(null as number | null)
    const valueOnMouseUp = ref(null as number | null)
    const emitChangeDebounced = debounce((value: number) => emit('change', value), 750)

    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)

    const count = computed(() => props.max - props.min + 1)
    const roundCount = computed(() => props.double ? (count.value / 2) : count.value)
    const degreesPerUnit = computed(() => 360 / roundCount.value)
    const degrees = computed(() => degreesPerUnit.value * Math.PI / 180)
    const displayedValue = computed(() => props.modelValue == null ? props.min : props.modelValue)
    const innerRadiusScale = computed(() => 0.62)

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

    function update (value: number) {
      if (inputValue.value !== value) {
        inputValue.value = value
      }
      emit('input', value)
    }

    function isAllowed (value: number) {
      return !props.allowedValues || props.allowedValues(value)
    }

    function wheel (e: WheelEvent) {
      if (!props.scrollable || props.disabled) return

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

      emitChangeDebounced(value)
    }

    function isInner (value: number) {
      return props.double && (value - props.min >= roundCount.value)
    }

    function handScale (value: number) {
      return isInner(value) ? innerRadiusScale.value : 1
    }

    function getPosition (value: number) {
      const rotateRadians = props.rotate * Math.PI / 180
      return {
        x: Math.sin((value - props.min) * degrees.value + rotateRadians) * handScale(value),
        y: -Math.cos((value - props.min) * degrees.value + rotateRadians) * handScale(value),
      }
    }

    function angleToValue (angle: number, insideClick: boolean): number {
      const value = (
        Math.round(angle / degreesPerUnit.value) +
        (insideClick ? roundCount.value : 0)
      ) % count.value + props.min

      // Necessary to fix edge case when selecting left part of the value(s) at 12 o'clock
      if (angle < (360 - degreesPerUnit.value / 2)) return value

      return insideClick ? props.max - roundCount.value + 1 : props.min
    }

    function getTransform (i: number) {
      const { x, y } = getPosition(i)
      return {
        left: `${Math.round(50 + x * 50)}%`,
        top: `${Math.round(50 + y * 50)}%`,
      }
    }

    function euclidean (p0: Point, p1: Point) {
      const dx = p1.x - p0.x
      const dy = p1.y - p0.y

      return Math.sqrt(dx * dx + dy * dy)
    }

    function angle (center: Point, p1: Point) {
      const value = 2 * Math.atan2(p1.y - center.y - euclidean(center, p1), p1.x - center.x)
      return Math.abs(value * 180 / Math.PI)
    }

    function setMouseDownValue (value: number) {
      if (valueOnMouseDown.value === null) {
        valueOnMouseDown.value = value
      }

      valueOnMouseUp.value = value
      update(value)
    }

    function onDragMove (e: MouseEvent | TouchEvent) {
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

    function onMouseDown (e: MouseEvent | TouchEvent) {
      if (props.disabled) return

      e.preventDefault()

      window.addEventListener('mousemove', onDragMove)
      window.addEventListener('touchmove', onDragMove)
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('touchend', onMouseUp)
      valueOnMouseDown.value = null
      valueOnMouseUp.value = null
      isDragging.value = true
      onDragMove(e)
    }

    function onMouseUp (e: MouseEvent | TouchEvent) {
      e.stopPropagation()
      removeListeners()

      isDragging.value = false
      if (valueOnMouseUp.value !== null && isAllowed(valueOnMouseUp.value)) {
        emit('change', valueOnMouseUp.value)
      }
    }

    function removeListeners () {
      window.removeEventListener('mousemove', onDragMove)
      window.removeEventListener('touchmove', onDragMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchend', onMouseUp)
    }

    onScopeDispose(removeListeners)

    function findNextAllowed (current: number, delta: number): number {
      let value = current
      const maxIterations = count.value
      for (let i = 0; i < maxIterations; i++) {
        value = ((value - props.min + delta + count.value) % count.value) + props.min
        if (isAllowed(value)) return value
      }
      return current
    }

    function onSpinbuttonKeydown (e: KeyboardEvent) {
      if (props.disabled || props.readonly) return

      let newValue: number | null = null
      const current = displayedValue.value

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowRight':
          newValue = findNextAllowed(current, 1)
          break
        case 'ArrowDown':
        case 'ArrowLeft':
          newValue = findNextAllowed(current, -1)
          break
        case 'Enter':
          e.preventDefault()
          emit('change', current)
          return
      }

      if (newValue !== null && newValue !== current) {
        e.preventDefault()
        update(newValue)
      }
    }

    useRender(() => {
      return (
        <div
          role="spinbutton"
          tabindex={ props.disabled || props.readonly ? -1 : 0 }
          aria-label={ t(`$vuetify.timePicker.${props.viewMode}`) }
          aria-valuemin={ props.min }
          aria-valuemax={ props.max }
          aria-valuenow={ displayedValue.value }
          aria-disabled={ props.disabled || undefined }
          aria-readonly={ props.readonly || undefined }
          class={[
            {
              'v-time-picker-clock': true,
              'v-time-picker-clock--indeterminate': props.modelValue == null,
              'v-time-picker-clock--readonly': props.readonly,
            },
          ]}
          onKeydown={ onSpinbuttonKeydown }
          onMousedown={ onMouseDown }
          onTouchstart={ onMouseDown }
          onWheel={ wheel }
          ref={ clockRef }
        >
          <div class="v-time-picker-clock__inner" ref={ innerClockRef }>
            <div
              class={[
                {
                  'v-time-picker-clock__hand': true,
                  'v-time-picker-clock__hand--inner': isInner(props.modelValue as number),
                },
                textColorClasses.value,
              ]}
              style={[
                {
                  transform: `rotate(${props.rotate + degreesPerUnit.value * (displayedValue.value - props.min)}deg) scaleY(${handScale(displayedValue.value)})`,
                },
                textColorStyles.value,
              ]}
            />

            {
              genChildren.value.map(value => {
                const isActive = value === displayedValue.value
                const isDisabled = props.disabled || !isAllowed(value)

                return (
                  <VBtn
                    aria-hidden="true"
                    tabindex={ -1 }
                    class={[
                      'v-time-picker-clock__item',
                      {
                        'v-time-picker-clock__item--active': isActive,
                      },
                    ]}
                    color={ isActive ? props.color : '' }
                    disabled={ isDisabled }
                    style={[getTransform(value)]}
                    variant={ isActive ? 'flat' : 'text' }
                  >
                    { props.format(value) }
                  </VBtn>
                )
              })
            }
          </div>
        </div>
      )
    })
  },
})

export type VTimePickerClock = InstanceType<typeof VTimePickerClock>
