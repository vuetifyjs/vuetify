// Styles
import './VGrid.sass'

// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { capitalize, computed, defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

// Types
import type { Prop } from 'vue'

const breakpoints = ['sm', 'md', 'lg', 'xl'] as const // no xs

const ALIGNMENT = ['start', 'end', 'center'] as const

function makeRowProps (prefix: string, def: () => Prop<string, null>) {
  return breakpoints.reduce((props, val) => {
    props[prefix + capitalize(val)] = def()
    return props
  }, {} as Dictionary<Prop<string, null>>)
}

const alignValidator = (str: any) => [...ALIGNMENT, 'baseline', 'stretch'].includes(str)
const alignProps = makeRowProps('align', () => ({
  type: String,
  default: null,
  validator: alignValidator,
}))

const justifyValidator = (str: any) => [...ALIGNMENT, 'space-between', 'space-around'].includes(str)
const justifyProps = makeRowProps('justify', () => ({
  type: String,
  default: null,
  validator: justifyValidator,
}))

const alignContentValidator = (str: any) => [...ALIGNMENT, 'space-between', 'space-around', 'stretch'].includes(str)
const alignContentProps = makeRowProps('alignContent', () => ({
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

export default defineComponent({
  name: 'VRow',

  props: makeProps({
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
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    const classes = computed(() => {
      const classList: any[] = []

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
        'v-row--no-gutters': props.noGutters,
        'v-row--dense': props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent,
      })

      return classList
    })

    return () => h(props.tag, {
      class: ['v-row', classes.value],
    }, slots.default?.())
  },
})
