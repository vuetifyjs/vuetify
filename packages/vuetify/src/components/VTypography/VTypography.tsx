import { defineComponent, computed, h } from 'vue'
import { useDisplay } from 'vuetify'
import {typographyStyles} from './typography'
import type { PropType } from 'vue'
import { useTheme } from 'vuetify'

type Variant = keyof typeof typographyStyles
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

export { typographyStyles } from './typography'
export const VTypography = defineComponent({
  name: 'VTypography',
  props: {
    tag: {
      type: String,
      default: 'span',
    },
    text: {
      type: String as PropType<Variant>,
      required: true,
    },
    mobile: {
      type: String as PropType<Variant>,
      default: undefined,
    },
    mobileBreakpoint: {
      type: String as PropType<Breakpoint>,
      default: 'sm',
    },
    color: {
      type: String,
      default : undefined
    }
  },
  setup(props, { slots }) {
    const display = useDisplay()
    const theme  =useTheme()
    const currentStyle = computed(() => {
      const isMobile = display[`${props.mobileBreakpoint}AndDown`]?.value
      const variant = isMobile && props.mobile ? props.mobile : props.text
      const baseStyle = typographyStyles[variant] ?? {}

      const resolvedColor = props.color
        ? theme.current.value.colors[props.color] || props.color
        : undefined

      return {
        ...baseStyle,
        color: resolvedColor,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        maxWidth: '100%',
        width: '100%',

      }
    })


    return () =>
      h(
        props.tag,
        {
          style: currentStyle.value,
        },
        slots.default?.()
      )
  },
})
