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
import type { TypographyBreakpoint, TypographyStyle, TypographyVariant } from '@/composables/typography'

const RESPONSIVE_BREAKPOINT_SET = new Set(TYPOGRAPHY_BREAKPOINTS)
const DEFAULT_VARIANT: TypographyVariant = 'body-medium'

function isTypographyVariant (
  value: string,
  available: Record<string, TypographyStyle>,
): value is TypographyVariant {
  return value in available
}

function isResponsiveBreakpoint (value: string): value is TypographyBreakpoint {
  return RESPONSIVE_BREAKPOINT_SET.has(value as TypographyBreakpoint)
}

export function parseTypographyVariant (
  value: string | undefined,
  available: Record<string, TypographyStyle>,
  fallback: TypographyVariant,
) {
  const tokens = (value ?? '').split(/\s+/).filter(Boolean)
  const classes = new Set<string>()
  let baseVariant = fallback

  for (const token of tokens) {
    const [maybeBreakpoint, variantCandidate] = token.split(':')

    if (variantCandidate && isResponsiveBreakpoint(maybeBreakpoint)) {
      if (!isTypographyVariant(variantCandidate, available)) {
        consoleWarn(`Unknown typography variant "${variantCandidate}"`)
        continue
      }

      classes.add(`${maybeBreakpoint}:${variantCandidate}`)
      continue
    }

    if (!isTypographyVariant(token, available)) {
      consoleWarn(`Unknown typography variant "${token}"`)
      continue
    }

    baseVariant = token
    classes.add(baseVariant)
  }

  if (!classes.size || !classes.has(baseVariant)) {
    classes.add(baseVariant)
  }

  return {
    base: baseVariant,
    classes: Array.from(classes),
  }
}

export const makeVTypographyProps = propsFactory({
  variant: {
    type: String,
    default: DEFAULT_VARIANT,
  },
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

    const parsedVariant = computed(() => parseTypographyVariant(
      props.variant,
      typography.styles.value,
      DEFAULT_VARIANT,
    ))

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
          'v-typography',
          themeClasses.value,
          textColorClasses.value,
          ...parsedVariant.value.classes,
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
