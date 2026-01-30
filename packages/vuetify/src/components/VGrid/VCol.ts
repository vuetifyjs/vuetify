// Styles
import './VGrid.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { breakpoints } from '@/composables/display'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { capitalize, computed, h } from 'vue'
import { genericComponent, keys, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { Breakpoint } from '@/composables/display'

type BreakpointOffset = `offset${Capitalize<Breakpoint>}`

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false,
    }
    return props
  }, {} as Record<Breakpoint, {
    type: [BooleanConstructor, StringConstructor, NumberConstructor]
    default: false
  }>)
})()

const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = ('offset' + capitalize(val)) as BreakpointOffset
    props[offsetKey] = {
      type: [String, Number],
      default: null,
    }
    return props
  }, {} as Record<BreakpointOffset, {
    type: [StringConstructor, NumberConstructor]
    default: null
  }>)
})()

const propMap = {
  col: keys(breakpointProps),
  offset: keys(offsetProps),
  order: ['order', 'orderSm', 'orderMd', 'orderLg', 'orderXl', 'orderXxl'],
}

function breakpointClass (type: keyof typeof propMap, prop: string, val: boolean | string | number) {
  if (val == null || val === false) {
    return undefined
  }
  let className = ''
  if (prop) {
    const breakpoint = prop.replace(type, '')
    className += `${breakpoint}`
  }
  if (type === 'col') {
    if (val === '' || val === true) {
      // Handling the boolean style prop when accepting [Boolean, String, Number]
      // means Vue will not convert <v-col sm></v-col> to sm: true for us.
      // Since the default is false, an empty string indicates the prop's presence.
      return 'v-col--' + className.toLowerCase()
    }
    className = 'v-col--cols-' + className
  } else if (type === 'offset') {
    className = 'v-col--offset-' + className
  } else if (type === 'order') {
    className = 'order-' + className
  }
  // .order-md-6
  className += `-${val}`
  return className.toLowerCase()
}

const ALIGN_SELF_VALUES = ['auto', 'start', 'end', 'center', 'baseline', 'stretch'] as const
const alignSelfValidator = (str: any) => ALIGN_SELF_VALUES.includes(str)

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

  /** @deprecated use order-* class instead */
  order: { type: [String, Number], default: null },
  /** @deprecated use order-sm-* class instead */
  orderSm: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null },
  /** @deprecated use order-md-* class instead */
  orderMd: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null },
  /** @deprecated use order-lg-* class instead */
  orderLg: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null },
  /** @deprecated use order-xl-* class instead */
  orderXl: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null },
  /** @deprecated use order-xxl-* class instead */
  orderXxl: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null },
  /** @deprecated use align-self-* class instead */
  alignSelf: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null, validator: alignSelfValidator },
  /** @deprecated use align-self-sm-* class instead */
  alignSelfSm: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null, validator: alignSelfValidator },
  /** @deprecated use align-self-md-* class instead */
  alignSelfMd: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null, validator: alignSelfValidator },
  /** @deprecated use align-self-lg-* class instead */
  alignSelfLg: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null, validator: alignSelfValidator },
  /** @deprecated use align-self-xl-* class instead */
  alignSelfXl: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null, validator: alignSelfValidator },
  /** @deprecated use align-self-xxl-* class instead */
  alignSelfXxl: { type: String as PropType<typeof ALIGN_SELF_VALUES[number]>, default: null, validator: alignSelfValidator },

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VCol')

export const VCol = genericComponent()({
  name: 'VCol',

  props: makeVColProps(),

  setup (props, { slots }) {
    const classes = computed(() => {
      const classList: any[] = ['v-col']

      // Loop through `col`, `offset`, `order` breakpoint props
      let type: keyof typeof propMap
      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value: string | number | boolean = (props as any)[prop]
          const className = breakpointClass(type, prop, value)
          if (className) classList.push(className)
        })
      }

      classList.push({
        [`v-col--cols-${props.cols}`]: props.cols,
        [`v-col--offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf,
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
