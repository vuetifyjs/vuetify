// Types
import Vue, { PropOptions } from 'vue'
import { PropValidator } from 'vue/types/options'

type Scale = 'display-4' | 'display-3' | 'display-2' | 'display-1' | 'headline' | 'title' | 'subtitle-1' | 'subtitle-2' | 'body-1' | 'body-2' | 'caption' | 'overline'
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

const GRID_BREAKPOINTS: Breakpoint[] = ['sm', 'md', 'lg', 'xl']

function breakpointProps (): Record<Breakpoint, PropOptions> {
  const options: Dictionary<PropOptions> = {}

  return GRID_BREAKPOINTS.reduce((props, breakpoint) => {
    props[breakpoint] = { type: String }

    return props
  }, options)
}

export default Vue.extend({
  name: 'VTypography',

  functional: true,

  props: {
    ...breakpointProps(),
    scale: {
      type: String,
      default: 'body-1',
    } as PropValidator<Scale>,
    tag: {
      type: String,
      default: 'div',
    },
  },

  render (h, { props, data, children }) {
    const classes: string[] = [props.scale]

    for (const breakpoint of GRID_BREAKPOINTS) {
      const prop = props[breakpoint]

      /* istanbul ignore else */
      if (prop) classes.push(`text-${breakpoint}-${prop}`)
    }

    return h(props.tag, {
      class: classes,
      ...data,
    }, children)
  },
})
