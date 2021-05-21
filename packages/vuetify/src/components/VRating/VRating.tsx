// Styles
import './VRating.sass'

// Components
import { VBtn } from '../VBtn'

// Composables
import { makeDensityProps } from '@/composables/density'
import { makeSizeProps } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { useProxiedModel } from '@/composables/proxiedModel'
// import { useRefs } from '@/composables/refs'
// import { useRtl } from '@/composables/rtl'
// import { useLocale } from '@/composables/locale'
import { useTheme } from '@/composables/theme'

// Utilities
import { computed, defineComponent, ref } from 'vue'
import { createRange, makeProps } from '@/util'

// Types
import type { Prop } from 'vue'

export default defineComponent({
  name: 'VRating',

  props: makeProps({
    name: {
      type: String,
      required: true,
    },
    itemAriaLabel: {
      type: String,
      default: '$vuetify.rating.ariaLabel.item',
    },
    bgColor: {
      type: String,
    },
    color: {
      type: String,
    },
    clearable: Boolean,
    disabled: Boolean,
    emptyIcon: {
      type: String,
      default: '$ratingEmpty',
    },
    fullIcon: {
      type: String,
      default: '$ratingFull',
    },
    halfIcon: {
      type: String,
      default: '$ratingHalf',
    },
    halfIncrements: Boolean,
    hover: Boolean,
    length: {
      type: [Number, String],
      default: 5,
    },
    readonly: Boolean,
    modelValue: {
      type: Number,
      default: 0,
    },
    itemLabels: Array as Prop<string[]>,
    itemLabelPosition: {
      type: String,
      default: 'top',
      validator: (v: any) => ['top', 'bottom'].includes(v),
    },
    ripple: {
      type: Boolean,
      default: true,
    },
    ...makeDensityProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
  }),

  emits: {
    'update:modelValue': (value: number) => true,
  },

  setup (props, { slots }) {
    // const { t } = useLocale()
    // const { isRtl } = useRtl()
    const { themeClasses } = useTheme()
    // const { refs, updateRef } = useRefs<ComponentPublicInstance>()
    const rating = useProxiedModel(props, 'modelValue')

    const range = computed(() => createRange(Number(props.length), 1))
    const increments = computed(() => range.value.flatMap(v => props.halfIncrements ? [v - 0.5, v] : [v]))
    const hoverIndex = ref(-1)
    const focusIndex = ref(-1)

    // function isHalfEvent (e: MouseEvent): boolean {
    //   const rect = (e?.target as HTMLElement).getBoundingClientRect()
    //   const isHalf = !!rect && (e.pageX - rect.left) < rect.width / 2

    //   return isRtl.value ? !isHalf : isHalf
    // }

    // function genHoverIndex (e: MouseEvent, i: number) {
    //   const isHalf = props.halfIncrements && isHalfEvent(e)

    //   return i + (isHalf ? 0.5 : 1)
    // }

    const itemState = computed(() => increments.value.map(value => {
      const isHovering = props.hover && hoverIndex.value > -1

      const isFilled = rating.value >= value
      const isHovered = hoverIndex.value >= value

      const isFullIcon = isHovering ? isHovered : isFilled

      const icon = isFullIcon ? props.fullIcon : props.emptyIcon

      const color = isFilled || isHovered ? props.color : props.bgColor

      return { isFilled, isHovered, icon, color }
    }))

    const eventState = computed(() => [0, ...increments.value].map(value => {
      function onMouseenter () {
        hoverIndex.value = value
      }

      function onMouseleave () {
        hoverIndex.value = -1
      }

      function onFocus () {
        if (value === 0 && rating.value === 0) {
          firstRef.value?.focus()
        } else {
          focusIndex.value = value
        }
      }

      function onBlur () {
        focusIndex.value = -1
      }

      function onChange (e: Event) {
        rating.value = value
      }

      return {
        onMouseenter: props.hover ? onMouseenter : undefined,
        onMouseleave: props.hover ? onMouseleave : undefined,
        onFocus,
        onBlur,
        onChange,
      }
    }))

    // const items = computed(() => range.value.map(index => ({
    //   ariaLabel: t(props.itemAriaLabel, index + 1, range.value.length),
    //   density: props.density,
    //   disabled: props.disabled,
    //   hasLabels: !!props.itemLabels?.length || !!slots['item-label'],
    //   index,
    //   label: props.itemLabels && props.itemLabels[index],
    //   readonly: props.readonly,
    //   ripple: props.ripple,
    //   size: props.size,
    //   tabindex: props.readonly ? -1 : undefined,
    //   text: true,
    //   value: rating.value,
    //   ...itemState.value[index],
    //   ...eventState.value[index],
    // })))

    // function updateFocus () {
    //   const index = Math.floor(rating.value - 0.5)
    //   const el = refs.value[index]?.$el ?? refs.value[index]
    //   el?.focus()
    // }

    // function onKeydown (e: KeyboardEvent) {
    //   if (![keyCodes.left, keyCodes.right].includes(e.keyCode)) return

    //   let increment = props.halfIncrements ? 0.5 : 1

    //   increment = e.keyCode === keyCodes.left ? -increment : increment
    //   increment = isRtl.value ? -increment : increment

    //   rating.value = clamp(rating.value + increment, 0, range.value.length)
    //   nextTick(updateFocus)
    // }

    function VRatingItem ({ value, index, showStar = true }: { value: number, index: number, showStar?: boolean }) {
      const { onMouseenter, onMouseleave, onChange, onFocus, onBlur } = eventState.value[index + 1]

      return (
        <>
          <label
            for={`${props.name}-${String(value).replace('.', '-')}`}
            class={{
              'v-rating__item--half': props.halfIncrements && value % 1 > 0,
              'v-rating__item--full': props.halfIncrements && value % 1 === 0,
            }}
          >
            <span class="v-rating--hidden">{value} Stars</span>
            { showStar && (
              <VBtn
                tag="span"
                tabindex="-1"
                icon={itemState.value[index].icon}
                color={itemState.value[index].color}
                plain
                size={props.size}
                onMouseenter={onMouseenter}
                onMouseleave={onMouseleave}
                ripple={false}
                density={props.density}
              />
            ) }
          </label>
          <input
            class="v-rating--hidden"
            name={props.name}
            id={`${props.name}-${String(value).replace('.', '-')}`}
            type="radio"
            value={value}
            checked={rating.value === value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={index === 0 ? firstRef : undefined}
          />
        </>
      )
    }

    const firstRef = ref<HTMLElement>()

    return () => {
      const hasLabels = !!props.itemLabels?.length

      return (
        <props.tag
          class={[
            'v-rating',
            {
              'v-rating--readonly': props.readonly,
            },
            themeClasses.value,
          ]}
        >
          <VRatingItem value={0} index={-1} showStar={false} />
          { range.value.map((value, i) => (
            <div class="v-rating__wrapper">
              { !hasLabels ? undefined
              : slots['item-label'] ? slots['item-label']()
              : props.itemLabels?.[i] ? <span>{props.itemLabels?.[i]}</span>
              : <span>&nbsp;</span>
              }
              <div
                class={[
                  'v-rating__item',
                  {
                    'v-rating__item--focused': Math.ceil(focusIndex.value) === value,
                  },
                ]}
              >
                { props.halfIncrements ? (
                  <>
                    <VRatingItem value={value - 0.5} index={i * 2} />
                    <VRatingItem value={value} index={(i * 2) + 1} />
                  </>
                ) : (
                  <VRatingItem value={value} index={i} />
                ) }
              </div>
            </div>
          ))}
        </props.tag>
      )
    }
  },
})
