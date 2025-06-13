
import './VTypography.sass'


import { makeComponentProps } from '@/composables/component'
import { useTextColor } from '@/composables/color'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'


import { computed } from 'vue'
import { useDisplay } from '@/composables/display'
import { genericComponent, propsFactory, useRender } from '@/util'


import type { PropType } from 'vue'


import { typographyStyles } from './typography'

type Variant = keyof typeof typographyStyles
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

export { typographyStyles } from './typography'

export const makeVTypographyProps = propsFactory({
  variant: {
    type: String as PropType<Variant>,
    default: 'body-medium',
  },
  mobileVariant: {
    type: String as PropType<Variant>,
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

    const currentStyle = computed(() => {
      const isMobile = display[`${props.mobileBreakpoint}AndDown`]?.value
      const activeVariant = isMobile && props.mobileVariant ? props.mobileVariant : props.variant
      const baseStyle = typographyStyles[activeVariant] ?? {}

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
