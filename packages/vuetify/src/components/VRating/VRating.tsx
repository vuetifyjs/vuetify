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
import { createRange, keyCodes, makeProps } from '@/util'

// Types
import type { ComponentPublicInstance, Prop, Ref } from 'vue'

export default defineComponent({
  name: 'VRating',

  props: makeProps({
    ariaLabel: {
      type: String,
      default: '$vuetify.rating.ariaLabel',
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
    const rating = useProxiedModel(props, 'modelValue') as any as Ref<number> // TODO: Why is type not working?
    const length = computed(() => Number(props.length))
    const hoverIndex = ref(-1)

    const icons = computed(() => {
      function isHalfEvent (e: MouseEvent): boolean {
        const rect = (e?.target as HTMLElement).getBoundingClientRect()
        const isHalf = !!rect && (e.pageX - rect.left) < rect.width / 2

        // TODO: handle rtl
        const isRtl = false
        // return isRtl ? !isHalf : isHalf
        return isRtl ? !isHalf : isHalf
      }

      function genHoverIndex (e: MouseEvent, i: number) {
        const isHalf = props.halfIncrements && isHalfEvent(e)

        return i + (isHalf ? 0.5 : 1)
      }

      function createSlotProps (index: number) {
        const isFilled = Math.floor(rating.value) > index
        const isHovered = Math.floor(hoverIndex.value) > index
        const isHovering = props.hover && hoverIndex.value > -1
        const isFullIcon = isHovering ? isHovered : isFilled
        const isHalfFilled = !isFilled && (rating.value - index) % 1 > 0
        const isHalfHovered = !isHovered && (hoverIndex.value - index) % 1 > 0
        const isHalfIcon = isHovering ? isHalfHovered : isHalfFilled

        const icon = isFullIcon ? props.fullIcon
          : isHalfIcon ? props.halfIcon
          : props.emptyIcon

        function onMouseenter (e: MouseEvent): void {
          hoverIndex.value = genHoverIndex(e, index)
        }

        function onMouseleave (): void {
          hoverIndex.value = -1
        }

        return {
          onClick: (e: MouseEvent) => {
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
          },
          onMouseenter: props.hover ? onMouseenter : undefined,
          onMouseleave: props.hover ? onMouseleave : undefined,
          onMousemove: props.hover && props.halfIncrements ? onMouseenter : undefined,
          // TODO: fix when locale is done
          // ariaLabel: this.$vuetify.lang.t(props.iconLabel, index + 1, length.value)
          ariaLabel: String(index + 1),
          color: isFilled || isHalfFilled || isHovered ? props.color : props.backgroundColor,
          density: props.density,
          disabled: props.disabled,
          hasLabels: !!props.itemLabels?.length || !!slots['item-label'],
          icon,
          index,
          isFilled,
          isHalfFilled,
          isHalfHovered,
          isHovered,
          label: props.itemLabels && props.itemLabels[index],
          readonly: props.readonly,
          ripple: props.ripple,
          size: props.size,
          tabindex: props.readonly ? -1 : undefined,
          value: rating.value,
        }
      }

      return createRange(length.value).map(createSlotProps)
    })

    const { refs, updateRef } = useRefs<ComponentPublicInstance>()

    function onKeydown (e: KeyboardEvent) {
      const increment = props.halfIncrements ? 0.5 : 1
      if (e.keyCode === keyCodes.left && rating.value > 0) {
        rating.value -= increment
        nextTick(() => refs.value[Math.floor(rating.value)]?.$el.focus())
      } else if (e.keyCode === keyCodes.right && rating.value < length.value) {
        rating.value += increment
        nextTick(() => refs.value[Math.floor(rating.value - 0.5)]?.$el.focus())
      }
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
        {icons.value.map(iconProps => (
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
                ref={(e: any) => updateRef(e, iconProps.index)}
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
            )}
          </div>
        ))}
      </props.tag>
    )
  },
})
