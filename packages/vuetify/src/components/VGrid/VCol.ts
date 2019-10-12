import './VGrid.sass'

import Vue, { VNode, PropOptions } from 'vue'
import mergeData from '../../util/mergeData'
import { upperFirst } from '../../util/helpers'

// no xs
const breakpoints = ['sm', 'md', 'lg', 'xl']

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false,
    }
    return props
  }, {} as Dictionary<PropOptions>)
})()

const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['offset' + upperFirst(val)] = {
      type: [String, Number],
      default: null,
    }
    return props
  }, {} as Dictionary<PropOptions>)
})()

const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['order' + upperFirst(val)] = {
      type: [String, Number],
      default: null,
    }
    return props
  }, {} as Dictionary<PropOptions>)
})()

const propMap = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps),
}

function breakpointClass (type: keyof typeof propMap, prop: string, val: boolean | string | number) {
  let className = type
  if (val == null || val === false) {
    return undefined
  }
  if (prop) {
    const breakpoint = prop.replace(type, '')
    className += `-${breakpoint}`
  }
  // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <v-col sm></v-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.
  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase()
  }
  // .order-md-6
  className += `-${val}`
  return className.toLowerCase()
}

const cache = new Map<string, any[]>()

export default Vue.extend({
  name: 'v-col',
  functional: true,
  props: {
    cols: {
      type: [Boolean, String, Number],
      default: false,
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null,
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null,
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: (str: any) => ['auto', 'start', 'end', 'center', 'baseline', 'stretch'].includes(str),
    },
    justifySelf: {
      type: String,
      default: null,
      validator: (str: any) => ['auto', 'start', 'end', 'center', 'baseline', 'stretch'].includes(str),
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  render (h, { props, data, children, parent }): VNode {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = ''
    for (const prop in props) {
      cacheKey += String((props as any)[prop])
    }
    let classList = cache.get(cacheKey)

    if (!classList) {
      classList = []
      // Loop through `col`, `offset`, `order` breakpoint props
      let type: keyof typeof propMap
      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value: string | number | boolean = (props as any)[prop]
          const className = breakpointClass(type, prop, value)
          if (className) classList!.push(className)
        })
      }

      const hasColClasses = classList.some(className => className.startsWith('col-'))

      classList.push({
        // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
        col: !hasColClasses || !props.cols,
        [`col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf,
        [`justify-self-${props.justifySelf}`]: props.justifySelf,
      })

      cache.set(cacheKey, classList)
    }

    return h(props.tag, mergeData(data, { class: classList }), children)
  },
})
