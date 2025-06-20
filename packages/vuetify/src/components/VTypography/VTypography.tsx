import './VTypography.sass'

import { computed } from 'vue'
import type { PropType } from 'vue'

import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useDisplay } from '@/composables/display'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genericComponent, propsFactory, useRender } from '@/util'
import { useTypography, type TypographyVariant } from '@/composables/typography'

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

export const makeVTypographyProps = propsFactory({
  variant: {
    type: String as PropType<TypographyVariant>,
    default: 'body-medium',
  },
  mobileVariant: {
    type: String as PropType<TypographyVariant>,
    default: undefined,
  },
  mobileBreakpoint: {
    type: String as PropType<Breakpoint>,
    default: 'sm',
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
    const display = useDisplay()
    const typography = useTypography()

    const currentStyle = computed(() => {
      const isMobile = display[`${props.mobileBreakpoint}AndDown`]?.value
      const activeVariant = (isMobile && props.mobileVariant) ? props.mobileVariant : props.variant
      const baseStyle = typography.getStyle(activeVariant)

      return {
        ...baseStyle,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        maxWidth: '100%',
        width: '100%',
      }
    })

    useRender(() => (
      <props.tag
        class={[
          'v-typography',
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
