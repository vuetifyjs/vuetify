import './VGrid.sass'

import Vue, { PropOptions } from 'vue'
import mergeData from '../../util/mergeData'
import { upperFirst } from '../../util/helpers'

// no xs
const breakpoints = ['sm', 'md', 'lg', 'xl']

const ALIGNMENT = ['start', 'end', 'center']

function makeProps (prefix: string, def: () => PropOptions) {
  return breakpoints.reduce((props, val) => {
    props[prefix + upperFirst(val)] = def()
    return props
  }, {} as Dictionary<PropOptions>)
}

const alignValidator = (str: any) => [...ALIGNMENT, 'baseline', 'stretch'].includes(str)
const alignProps = makeProps('align', () => ({
  type: String,
  default: null,
  validator: alignValidator,
}))

const justifyValidator = (str: any) => [...ALIGNMENT, 'space-between', 'space-around'].includes(str)
const justifyProps = makeProps('justify', () => ({
  type: String,
  default: null,
  validator: justifyValidator,
}))

const alignContentValidator = (str: any) => [...ALIGNMENT, 'space-between', 'space-around', 'stretch'].includes(str)
const alignContentProps = makeProps('alignContent', () => ({
  type: String,
  default: null,
  validator: alignContentValidator,
}))

const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps),
}

const classMap = {
  align: 'align',
  justify: 'justify',
  alignContent: 'align-content',
}

function breakpointClass (type: keyof typeof propMap, prop: string, val: string) {
  let className = classMap[type]
  if (val == null) {
    return undefined
  }
  if (prop) {
    // alignSm -> Sm
    const breakpoint = prop.replace(type, '')
    className += `-${breakpoint}`
  }
  // .align-items-sm-center
  className += `-${val}`
  return className.toLowerCase()
}

const cache = new Map<string, any[]>()

export default Vue.extend({
  name: 'v-row',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator,
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator,
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator,
    },
    ...alignContentProps,
  },
  render (h, { props, data, children }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = ''
    for (const prop in props) {
      cacheKey += String((props as any)[prop])
    }
    let classList = cache.get(cacheKey)

    if (!classList) {
      classList = []
      // Loop through `align`, `justify`, `alignContent` breakpoint props
      let type: keyof typeof propMap
      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value: string = (props as any)[prop]
          const className = breakpointClass(type, prop, value)
          if (className) classList!.push(className)
        })
      }

      classList.push({
        'no-gutters': props.noGutters,
        'row--dense': props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent,
      })

      cache.set(cacheKey, classList)
    }

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'row',
        class: classList,
      }),
      children
    )
  },
})
