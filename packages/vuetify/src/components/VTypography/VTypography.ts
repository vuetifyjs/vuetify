// Types
import Vue, { PropOptions } from 'vue'
import { PropValidator } from 'vue/types/options'

type Scale = 'display-4' | 'display-3' | 'display-2' | 'display-1' | 'headline' | 'title' | 'subtitle-1' | 'subtitle-2' | 'body-1' | 'body-2' | 'caption' | 'overline'

// no xs
const breakpoints = <const>['sm', 'md', 'lg', 'xl']

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: String,
      default: undefined,
    }
    return props
  }, {} as Dictionary<PropOptions>)
})()

export default Vue.extend({
  name: 'VTypography',

  functional: true,

  props: {
    ...breakpointProps,
    size: {
      type: String,
      default: 'body-1',
    } as PropValidator<Scale>,
    tag: {
      type: String,
      default: 'div',
    },
  },

  render (h, { props, data, children }) {
    const classes: string[] = [`text-${props.size}`]

    for (const breakpoint of breakpoints) {
      const value = (props as any)[breakpoint] as Scale

      /* istanbul ignore else */
      if (value) classes.push(`text-${breakpoint}-${value}`)
    }

    return h(props.tag, {
      class: classes,
      ...data,
    }, children)
  },
})
