// Styles
import './VRating.sass'

// Components
import { VBtn } from '../VBtn'

// Composables
import { makeDensityProps } from '@/composables/density'
import { makeSizeProps } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useRefs } from '@/composables/refs'

// Utilities
import { computed, defineComponent, nextTick, ref } from 'vue'
import { clamp, createRange, keyCodes, makeProps } from '@/util'

// Types
import type { ComponentPublicInstance, Prop } from 'vue'
import { useRtl } from '@/composables/rtl'
import { useLocale } from '@/composables/locale'

export default defineComponent({
  name: 'VRating',

  props: makeProps({
    ariaLabel: {
      type: String,
      default: '$vuetify.rating.ariaLabel.icon',
    },
    backgroundColor: {
      type: String,
      default: 'accent',
    },
    color: {
      type: String,
      default: 'primary',
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

  setup (props, { slots }) {
    const { t } = useLocale()
    const { isRtl } = useRtl()
    const rating = useProxiedModel(props, 'modelValue')
    const { refs, updateRef } = useRefs<ComponentPublicInstance>()

    const range = computed(() => createRange(Number(props.length)))
    const hoverIndex = ref(-1)

    function isHalfEvent (e: MouseEvent): boolean {
      const rect = (e?.target as HTMLElement).getBoundingClientRect()
      const isHalf = !!rect && (e.pageX - rect.left) < rect.width / 2

      return isRtl.value ? !isHalf : isHalf
    }

    function genHoverIndex (e: MouseEvent, i: number) {
      const isHalf = props.halfIncrements && isHalfEvent(e)

      return i + (isHalf ? 0.5 : 1)
    }

    const itemState = computed(() => range.value.map(index => {
      const isHovering = props.hover && hoverIndex.value > -1

      const isFilled = Math.floor(rating.value) > index
      const isHovered = Math.floor(hoverIndex.value) > index
      const isHalfFilled = !isFilled && (rating.value - index) % 1 > 0
      const isHalfHovered = !isHovered && (hoverIndex.value - index) % 1 > 0

      const isFullIcon = isHovering ? isHovered : isFilled
      const isHalfIcon = isHovering ? isHalfHovered : isHalfFilled

      const icon = isFullIcon ? props.fullIcon
        : isHalfIcon ? props.halfIcon
        : props.emptyIcon

      const color = isFilled || isHalfFilled || isHovered ? props.color : props.backgroundColor

      return { isFilled, isHovered, isHalfFilled, isHalfHovered, icon, color }
    }))

    const eventState = computed(() => range.value.map(index => {
      function onMouseenter (e: MouseEvent): void {
        hoverIndex.value = genHoverIndex(e, index)
      }

      function onMouseleave (): void {
        hoverIndex.value = -1
      }

      function onClick (e: MouseEvent) {
        if (props.readonly) return

        // If detail === 0 then click is triggered by keyboard
        if (e.detail === 0) {
          const currentIndex = Math.floor(rating.value)
          if (rating.value - 1 === index && props.clearable) {
            rating.value = 0
          } else if (currentIndex !== index || !props.halfIncrements) {
            rating.value = index + (props.halfIncrements ? 0.5 : 1)
          } else {
            rating.value += 0.5
          }
        } else {
          const newValue = genHoverIndex(e, index)
          if (props.clearable && rating.value === newValue) {
            rating.value = 0
          } else {
            rating.value = newValue
          }
        }
      }

      return {
        onClick,
        onMouseenter: props.hover ? onMouseenter : undefined,
        onMouseleave: props.hover ? onMouseleave : undefined,
        onMousemove: props.hover && props.halfIncrements ? onMouseenter : undefined,
        ref: (e: any) => updateRef(e, index),
      }
    }))

    const icons = computed(() => range.value.map(index => ({
      ariaLabel: t(props.ariaLabel, index + 1, range.value.length),
      density: props.density,
      disabled: props.disabled,
      hasLabels: !!props.itemLabels?.length || !!slots['item-label'],
      index,
      label: props.itemLabels && props.itemLabels[index],
      readonly: props.readonly,
      ripple: props.ripple,
      size: props.size,
      tabindex: props.readonly ? -1 : undefined,
      value: rating.value,
      ...itemState.value[index],
      ...eventState.value[index],
    })))

    function updateFocus () {
      const index = Math.floor(rating.value - 0.5)
      const el = refs.value[index]?.$el ?? refs.value[index]
      el?.focus()
    }

    function onKeydown (e: KeyboardEvent) {
      if (![keyCodes.left, keyCodes.right].includes(e.keyCode)) return

      let increment = props.halfIncrements ? 0.5 : 1

      increment = e.keyCode === keyCodes.left ? -increment : increment
      increment = isRtl.value ? -increment : increment

      rating.value = clamp(rating.value + increment, 0, range.value.length)
      nextTick(updateFocus)
    }

    return () => (
      <props.tag
        class={[
          'v-rating',
          {
            'v-rating--readonly': props.readonly,
          },
        ]}
        onKeydown={onKeydown}
      >
        { icons.value.map(iconProps => (
          <div
            key={iconProps.index}
            class={[
              'v-rating__item',
              {
                'v-rating__item--bottom': props.itemLabelPosition === 'bottom',
              },
            ]}
          >
            {
              !iconProps.hasLabels ? undefined
              : slots['item-label'] ? slots['item-label'](iconProps)
              : iconProps.label ? <span>{iconProps.label}</span>
              : <span>&nbsp;</span>
            }
            { slots.item ? slots.item(iconProps) : (
              <VBtn
                ref={iconProps.ref}
                color={iconProps.color}
                ripple={iconProps.ripple}
                size={iconProps.size}
                icon={iconProps.icon}
                onClick={iconProps.onClick}
                onMouseenter={iconProps.onMouseenter}
                onMouseleave={iconProps.onMouseleave}
                onMousemove={iconProps.onMousemove}
                aria-label={iconProps.ariaLabel}
                disabled={iconProps.disabled}
                density={iconProps.density}
                tabindex={iconProps.tabindex}
              />
            ) }
          </div>
        )) }
      </props.tag>
    )
  },
})
