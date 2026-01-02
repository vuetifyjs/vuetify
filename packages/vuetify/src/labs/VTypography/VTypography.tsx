// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { breakpoints } from '@/composables/display'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useTypography } from '@/composables/typography'

// Utilities
import { computed } from 'vue'
import { consoleWarn, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { TypographyStyle, TypographyVariant } from '@/composables/typography'

function isTypographyVariant (
  value: string,
  available: Record<string, TypographyStyle>,
): value is TypographyVariant {
  return value in available
}

export const makeVTypographyProps = propsFactory({
  variant: String,
  sm: String,
  md: String,
  lg: String,
  xl: String,
  xxl: String,
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
      const available = typography.variants.value

      if (props.variant) {
        if (isTypographyVariant(props.variant, available)) {
          classList.push(`text-${props.variant}`)
        } else {
          consoleWarn(`Unknown typography variant "${props.variant}"`)
        }
      }

      for (const breakpoint of breakpoints) {
        const responsiveVariant = props[breakpoint]
        if (responsiveVariant) {
          if (isTypographyVariant(responsiveVariant, available)) {
            classList.push(`text-${breakpoint}-${responsiveVariant}`)
          } else {
            consoleWarn(`Unknown typography variant "${responsiveVariant}" for breakpoint "${breakpoint}"`)
          }
        }
      }

      return classList
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
