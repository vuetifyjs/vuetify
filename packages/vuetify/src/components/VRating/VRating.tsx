// Styles
import './VRating.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps } from '@/composables/density'
import { IconValue } from '@/composables/icons'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeSizeProps } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, shallowRef } from 'vue'
import { clamp, createRange, genericComponent, getUid, propsFactory, useRender } from '@/util'

// Types
import type { Prop } from 'vue'
import type { Variant } from '@/composables/variant'

type VRatingItemSlot = {
  value: number
  index: number
  isFilled: boolean
  isHovered: boolean
  icon: IconValue
  color?: string
  props: Record<string, unknown>
  rating: number
}

type VRatingItemLabelSlot = {
  value: number
  index: number
  label?: string
}

type VRatingSlots = {
  item: VRatingItemSlot
  'item-label': VRatingItemLabelSlot
}

export const makeVRatingProps = propsFactory({
  name: String,
  itemAriaLabel: {
    type: String,
    default: '$vuetify.rating.ariaLabel.item',
  },
  activeColor: String,
  color: String,
  clearable: Boolean,
  disabled: Boolean,
  emptyIcon: {
    type: IconValue,
    default: '$ratingEmpty',
  },
  fullIcon: {
    type: IconValue,
    default: '$ratingFull',
  },
  halfIncrements: Boolean,
  hover: Boolean,
  length: {
    type: [Number, String],
    default: 5,
  },
  readonly: Boolean,
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  itemLabels: Array as Prop<string[]>,
  itemLabelPosition: {
    type: String,
    default: 'top',
    validator: (v: any) => ['top', 'bottom'].includes(v),
  },
  ripple: Boolean,

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VRating')

export const VRating = genericComponent<VRatingSlots>()({
  name: 'VRating',

  props: makeVRatingProps(),

  emits: {
    'update:modelValue': (value: number | string) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const { themeClasses } = provideTheme(props)
    const rating = useProxiedModel(props, 'modelValue')
    const normalizedValue = computed(() => clamp(parseFloat(rating.value), 0, Number(props.length)))

    const range = computed(() => createRange(Number(props.length), 1))
    const increments = computed(() => range.value.flatMap(v => props.halfIncrements ? [v - 0.5, v] : [v]))
    const hoverIndex = shallowRef(-1)

    const itemState = computed(() => increments.value.map(value => {
      const isHovering = props.hover && hoverIndex.value > -1
      const isFilled = normalizedValue.value >= value
      const isHovered = hoverIndex.value >= value
      const isFullIcon = isHovering ? isHovered : isFilled
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon
      const activeColor = props.activeColor ?? props.color
      const color = (isFilled || isHovered) ? activeColor : props.color

      return { isFilled, isHovered, icon, color }
    }))

    const eventState = computed(() => [0, ...increments.value].map(value => {
      function onMouseenter () {
        hoverIndex.value = value
      }

      function onMouseleave () {
        hoverIndex.value = -1
      }

      function onClick () {
        if (props.disabled || props.readonly) return
        rating.value = normalizedValue.value === value && props.clearable ? 0 : value
      }

      return {
        onMouseenter: props.hover ? onMouseenter : undefined,
        onMouseleave: props.hover ? onMouseleave : undefined,
        onClick,
      }
    }))

    const name = computed(() => props.name ?? `v-rating-${getUid()}`)

    function VRatingItem ({ value, index, showStar = true }: { value: number, index: number, showStar?: boolean }) {
      const { onMouseenter, onMouseleave, onClick } = eventState.value[index + 1]
      const id = `${name.value}-${String(value).replace('.', '-')}`
      const btnProps = {
        color: itemState.value[index]?.color,
        density: props.density,
        disabled: props.disabled,
        icon: itemState.value[index]?.icon,
        ripple: props.ripple,
        size: props.size,
        variant: 'plain' as Variant,
      }

      return (
        <>
          <label
            for={ id }
            class={{
              'v-rating__item--half': props.halfIncrements && value % 1 > 0,
              'v-rating__item--full': props.halfIncrements && value % 1 === 0,
            }}
            onMouseenter={ onMouseenter }
            onMouseleave={ onMouseleave }
            onClick={ onClick }
          >
            <span class="v-rating__hidden">{ t(props.itemAriaLabel, value, props.length) }</span>
            {
              !showStar ? undefined
              : slots.item ? slots.item({
                ...itemState.value[index],
                props: btnProps,
                value,
                index,
                rating: normalizedValue.value,
              })
              : (
                <VBtn
                  aria-label={ t(props.itemAriaLabel, value, props.length) }
                  { ...btnProps }
                />
              )
            }
          </label>

          <input
            class="v-rating__hidden"
            name={ name.value }
            id={ id }
            type="radio"
            value={ value }
            checked={ normalizedValue.value === value }
            tabindex={ -1 }
            readonly={ props.readonly }
            disabled={ props.disabled }
          />
        </>
      )
    }

    function createLabel (labelProps: { value: number, index: number, label?: string }) {
      if (slots['item-label']) return slots['item-label'](labelProps)

      if (labelProps.label) return <span>{ labelProps.label }</span>

      return <span>&nbsp;</span>
    }

    useRender(() => {
      const hasLabels = !!props.itemLabels?.length || slots['item-label']

      return (
        <props.tag
          class={[
            'v-rating',
            {
              'v-rating--hover': props.hover,
              'v-rating--readonly': props.readonly,
            },
            themeClasses.value,
            props.class,
          ]}
          style={ props.style }
        >
          <VRatingItem value={ 0 } index={ -1 } showStar={ false } />

          { range.value.map((value, i) => (
            <div class="v-rating__wrapper">
              {
                hasLabels && props.itemLabelPosition === 'top'
                  ? createLabel({ value, index: i, label: props.itemLabels?.[i] })
                  : undefined
              }
              <div class="v-rating__item">
                { props.halfIncrements ? (
                  <>
                    <VRatingItem value={ value - 0.5 } index={ i * 2 } />
                    <VRatingItem value={ value } index={ (i * 2) + 1 } />
                  </>
                ) : (
                  <VRatingItem value={ value } index={ i } />
                )}
              </div>
              {
                hasLabels && props.itemLabelPosition === 'bottom'
                  ? createLabel({ value, index: i, label: props.itemLabels?.[i] })
                  : undefined
              }
            </div>
          ))}
        </props.tag>
      )
    })

    return {}
  },
})

export type VRating = InstanceType<typeof VRating>
