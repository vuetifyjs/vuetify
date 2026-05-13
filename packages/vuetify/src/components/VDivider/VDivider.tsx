// Styles
import './VDivider.sass'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

type DividerKey = 'borderRightWidth' | 'borderTopWidth' | 'height' | 'width'
type DividerStyles = Partial<Record<DividerKey, string>>

const allowedVariants = ['dotted', 'dashed', 'solid', 'double'] as const
type Variant = typeof allowedVariants[number]

export const makeVDividerProps = propsFactory({
  color: String,
  contentOffset: [Number, String, Array] as PropType<number | string | (string | number)[]>,
  gradient: Boolean,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  variant: {
    type: String as PropType<Variant>,
    default: 'solid',
    validator: (v: any) => allowedVariants.includes(v),
  },

  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VDivider')

export const VDivider = genericComponent()({
  name: 'VDivider',

  props: makeVDividerProps(),

  setup (props, { attrs, slots }) {
    const { themeClasses } = provideTheme(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)
    const dividerStyles = computed(() => {
      const styles: DividerStyles = {}

      if (props.length) {
        styles[props.vertical ? 'height' : 'width'] = convertToUnit(props.length)
      }

      if (props.thickness) {
        styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = convertToUnit(props.thickness)
      }

      return styles
    })

    const contentStyles = toRef(() => {
      const margin = Array.isArray(props.contentOffset) ? props.contentOffset[0] : props.contentOffset
      const shift = Array.isArray(props.contentOffset) ? props.contentOffset[1] : 0

      return {
        marginBlock: props.vertical && margin ? convertToUnit(margin) : undefined,
        marginInline: !props.vertical && margin ? convertToUnit(margin) : undefined,
        transform: shift
          ? `translate${props.vertical ? 'X' : 'Y'}(${convertToUnit(shift)})`
          : undefined,
      }
    })

    useRender(() => {
      const divider = (
        <hr
          class={[
            {
              'v-divider': true,
              'v-divider--gradient': props.gradient && !slots.default,
              'v-divider--inset': props.inset,
              'v-divider--vertical': props.vertical,
            },
            themeClasses.value,
            textColorClasses.value,
            props.class,
          ]}
          style={[
            dividerStyles.value,
            textColorStyles.value,
            { '--v-border-opacity': props.opacity },
            { 'border-style': props.variant },
            props.style,
          ]}
          aria-orientation={
            !attrs.role || attrs.role === 'separator'
              ? props.vertical ? 'vertical' : 'horizontal'
              : undefined
          }
          role={ `${attrs.role || 'separator'}` }
        />
      )

      if (!slots.default) return divider

      return (
        <div
          class={[
            'v-divider__wrapper',
            {
              'v-divider__wrapper--gradient': props.gradient,
              'v-divider__wrapper--inset': props.inset,
              'v-divider__wrapper--vertical': props.vertical,
            },
          ]}
        >
          { divider }

          <div
            class="v-divider__content"
            style={ contentStyles.value }
          >
            { slots.default() }
          </div>

          { divider }
        </div>
      )
    })

    return {}
  },
})

export type VDivider = InstanceType<typeof VDivider>
