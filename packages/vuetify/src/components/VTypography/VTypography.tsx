// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import {
  TYPOGRAPHY_BREAKPOINTS,
  useTypography,
} from '@/composables/typography'

// Utilities
import { computed } from 'vue'
import { consoleWarn, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { TypographyStyle, TypographyVariant } from '@/composables/typography'

const DEFAULT_VARIANT: TypographyVariant = 'body-medium'

function isTypographyVariant (
  value: string,
  available: Record<string, TypographyStyle>,
): value is TypographyVariant {
  return value in available
}

export const makeVTypographyProps = propsFactory({
  variant: {
    type: String,
    default: DEFAULT_VARIANT,
  },
  sm: String,
  md: String,
  lg: String,
  xl: String,
  xxl: String,
  customVariant: {
    type: Object as PropType<Partial<CSSStyleDeclaration>>,
    default: undefined,
  },
  color: String,

  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VTypography')

export const VTypography = genericComponent()({
  name: 'VTypography',

  props: makeVTypographyProps(),

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)
    const typography = useTypography()

    const classes = computed(() => {
      const classList: string[] = ['v-typography']
      const available = typography.styles.value

      const baseVariant = props.variant || DEFAULT_VARIANT
      if (isTypographyVariant(baseVariant, available)) {
        classList.push(baseVariant)
      } else {
        consoleWarn(`Unknown typography variant "${baseVariant}"`)
        classList.push(DEFAULT_VARIANT)
      }

      for (const breakpoint of TYPOGRAPHY_BREAKPOINTS) {
        const responsiveVariant = props[breakpoint]
        if (responsiveVariant) {
          if (isTypographyVariant(responsiveVariant, available)) {
            const parts = responsiveVariant.split('-')
            const name = parts[0]
            const size = parts.slice(1).join('-')
            classList.push(`${name}-${breakpoint}-${size}`)
          } else {
            consoleWarn(`Unknown typography variant "${responsiveVariant}" for breakpoint "${breakpoint}"`)
          }
        }
      }

      return classList
    })

    const currentStyle = computed(() => {
      return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        maxWidth: '100%',
        width: '100%',
        ...props.customVariant,
      }
    })

    useRender(() => (
      <props.tag
        class={[
          ...classes.value,
          themeClasses.value,
          textColorClasses.value,
          props.class,
        ]}
        style={[
          currentStyle.value,
          textColorStyles.value,
          props.style,
        ]}
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VTypography = InstanceType<typeof VTypography>
