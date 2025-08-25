// Styles
import './VGrid.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { breakpoints } from '@/composables/display'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { capitalize, computed, h } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { Prop, PropType } from 'vue'
import type { Breakpoint } from '@/composables/display'

type BreakpointOffset = `offset${Capitalize<Breakpoint>}`
type BreakpointOrder = `order${Capitalize<Breakpoint>}`

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false,
    }
    return props
  }, {} as Record<Breakpoint, Prop<boolean | string | number, false>>)
})()

const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = ('offset' + capitalize(val)) as BreakpointOffset
    props[offsetKey] = {
      type: [String, Number],
      default: null,
    }
    return props
  }, {} as Record<BreakpointOffset, Prop<string | number, null>>)
})()

const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    const orderKey = ('order' + capitalize(val)) as BreakpointOrder
    props[orderKey] = {
      type: [String, Number],
      default: null,
    }
    return props
  }, {} as Record<BreakpointOrder, Prop<string | number, null>>)
})()

const propMap = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps),
}

function breakpointClass (type: keyof typeof propMap, prop: string, val: boolean | string | number) {
  let className: string = type
  if (val == null || val === false) {
    return undefined
  }
  if (prop) {
    const breakpoint = prop.replace(type, '')
    className += `-${breakpoint}`
  }
  if (type === 'col') {
    className = 'v-' + className
  }
  // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <v-col sm></v-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.
  if (type === 'col' && (val === '' || val === true)) {
    // .v-col-md
    return className.toLowerCase()
  }
  // .order-md-6
  className += `-${val}`
  return className.toLowerCase()
}

const ALIGN_SELF_VALUES = ['auto', 'start', 'end', 'center', 'baseline', 'stretch'] as const

export const makeVColProps = propsFactory({
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
    type: String as PropType<typeof ALIGN_SELF_VALUES[number]>,
    default: null,
    validator: (str: any) => ALIGN_SELF_VALUES.includes(str),
  },

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VCol')

export const VCol = genericComponent()({
  name: 'VCol',

  props: makeVColProps(),

  setup (props, { slots }) {
    const classes = computed(() => {
      const classList: any[] = []

      // Loop through `col`, `offset`, `order` breakpoint props
      let type: keyof typeof propMap
      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value: string | number | boolean = (props as any)[prop]
          const className = breakpointClass(type, prop, value)
          if (className) classList!.push(className)
        })
      }

      const hasColClasses = classList.some(className => className.startsWith('v-col-'))

      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        'v-col': !hasColClasses || !props.cols,
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`v-col--order-${props.order}`]: props.order,
        [`v-col--align-self-${props.alignSelf}`]: props.alignSelf,
      })

      return classList
    })

    return () => h(props.tag, {
      class: [
        classes.value,
        props.class,
      ],
      style: props.style,
    }, slots.default?.())
  },
})

export type VCol = InstanceType<typeof VCol>
