import './VProgressLinear.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makePositionProps, usePosition } from '@/composables/position'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { useIntersectionObserver } from '@/composables/intersectionObserver'
import { useTheme } from '@/composables/theme'
import { useRtl } from '@/composables/rtl'

// Utilities
import { computed, defineComponent, Transition } from 'vue'
import { clamp, convertToUnit, makeProps } from '@/util'

export default defineComponent({
  name: 'VProgressLinear',

  props: makeProps({
    active: {
      type: Boolean,
      default: true,
    },
    bgColor: {
      type: String,
      default: null,
    },
    bgOpacity: {
      type: [Number, String],
      default: 0.3,
    },
    bufferValue: {
      type: [Number, String],
      default: 100,
    },
    color: {
      type: String,
      default: 'primary',
    },
    height: {
      type: [Number, String],
      default: 4,
    },
    indeterminate: Boolean,
    query: Boolean,
    reverse: Boolean,
    stream: Boolean,
    striped: Boolean,
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
  }),

  emits: {
    'update:modelValue': (value: number) => true,
  },

  setup (props, ctx) {
    const { isRtl } = useRtl()
    const { themeClasses } = useTheme()
    const { textColorClasses, textColorStyles } = useTextColor(props, 'color')
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(computed(() => props.bgColor || props.color))
    const { backgroundColorClasses: barColorClasses, backgroundColorStyles: barColorStyles } = useBackgroundColor(props, 'color')
    const { roundedClasses } = useRounded(props, 'v-progress-linear')
    const { positionClasses, positionStyles } = usePosition(props, 'v-progress-linear')
    const { intersectionRef, isIntersecting } = useIntersectionObserver()

    const height = computed(() => parseInt(props.height, 10))
    const normalizedBuffer = computed(() => clamp(parseFloat(props.bufferValue), 0, 100))
    const normalizedValue = computed(() => clamp(parseFloat(props.modelValue), 0, 100))
    const isReversed = computed(() => isRtl.value !== props.reverse)
    const transition = computed(() => props.indeterminate ? 'fade-transition' : 'slide-x-transition')

    function handleClick (e: MouseEvent) {
      if (!intersectionRef.value) return
      const target = e.target as HTMLElement
      const { left } = target.getBoundingClientRect()
      const { width } = intersectionRef.value.getBoundingClientRect()

      ctx.emit('update:modelValue', (left + e.offsetX) / width * 100)
    }

    return () => (
      <props.tag
        ref={intersectionRef}
        class={[
          'v-progress-linear',
          {
            'v-progress-linear--query': props.query,
            'v-progress-linear--reverse': isReversed.value,
            'v-progress-linear--striped': props.striped,
            'v-progress-linear--active': props.active && isIntersecting.value,
          },
          positionClasses.value,
          roundedClasses.value,
          themeClasses.value,
        ]}
        style={{
          height: props.active ? convertToUnit(height.value) : 0,
          ...positionStyles.value,
        }}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={ props.indeterminate ? undefined : normalizedValue.value }
        onClick={ handleClick }
      >
        { props.stream && (
          <div
            class={[
              'v-progress-linear__stream',
              textColorClasses.value,
            ]}
            style={{
              ...textColorStyles.value,
              width: convertToUnit(100 - normalizedBuffer.value, '%'),
              borderTop: `${convertToUnit(height.value)} dotted`,
              top: `calc(50% - ${convertToUnit(height.value / 2)}px)`,
              [isReversed.value ? 'left' : 'right']: convertToUnit(-height.value * 2),
              // TODO: Fix typing
              // @ts-ignore
              '--v-progress-linear-stream-to': convertToUnit(height.value * 2 * (isReversed.value ? 1 : -1)),
            }}
          />
        ) }
        <div
          class={[
            'v-progress-linear__background',
            backgroundColorClasses.value,
          ]}
          style={{
            ...backgroundColorStyles.value,
            opacity: parseFloat(props.bgOpacity),
            [isReversed.value ? 'right' : 'left']: convertToUnit(props.indeterminate ? 0 : normalizedValue.value, '%'),
            width: convertToUnit(props.indeterminate ? 100 : normalizedBuffer.value - normalizedValue.value, '%'),
          }}
        />
        <Transition name={ transition.value }>
          { !props.indeterminate ? (
            <div
              class={[
                'v-progress-linear__determinate',
                barColorClasses.value,
              ]}
              style={{
                ...barColorStyles.value,
                width: convertToUnit(normalizedValue.value, '%'),
              }}
            />
          ) : (
            <div
              class={[
                'v-progress-linear__indeterminate',
              ]}
            >
              { ['long', 'short'].map(bar => (
                <div
                  key={ bar }
                  class={[
                    'v-progress-linear__indeterminate',
                    bar,
                    barColorClasses.value,
                  ]}
                  style={ barColorStyles.value }
                />
              )) }
            </div>
          ) }
        </Transition>
        { ctx.slots.default && (
          <div class="v-progress-linear__content">
            { ctx.slots.default({ modelValue: normalizedValue.value, bufferValue: normalizedBuffer.value }) }
          </div>
        ) }
      </props.tag>
    )
  },
})
