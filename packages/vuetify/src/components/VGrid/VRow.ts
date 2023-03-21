// Styles
import './VGrid.sass'

// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { capitalize, computed, h } from 'vue'
import { genericComponent } from '@/util'

// Types
import type { Prop, PropType } from 'vue'

const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl'] as const // no xs

const ALIGNMENT = ['start', 'end', 'center'] as const

const SPACE = ['space-between', 'space-around', 'space-evenly'] as const

function makeRowProps <T> (prefix: string, def: () => Prop<T, null>) {
  return breakpoints.reduce((props, val) => {
    props[prefix + capitalize(val)] = def()
    return props
  }, {} as Record<string, Prop<T, null>>)
}

const ALIGN_VALUES = [...ALIGNMENT, 'baseline', 'stretch'] as const
const alignValidator = (str: any) => ALIGN_VALUES.includes(str)
const alignProps = makeRowProps('align', () => ({
  type: String as PropType<typeof ALIGN_VALUES[number]>,
  default: null,
  validator: alignValidator,
}))

const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE] as const
const justifyValidator = (str: any) => JUSTIFY_VALUES.includes(str)
const justifyProps = makeRowProps('justify', () => ({
  type: String as PropType<typeof JUSTIFY_VALUES[number]>,
  default: null,
  validator: justifyValidator,
}))

const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, 'stretch'] as const
const alignContentValidator = (str: any) => ALIGN_CONTENT_VALUES.includes(str)
const alignContentProps = makeRowProps('alignContent', () => ({
  type: String as PropType<typeof ALIGN_CONTENT_VALUES[number]>,
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

export const VRow = genericComponent()({
  name: 'VRow',

  props: {
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String as PropType<typeof ALIGN_VALUES[number]>,
      default: null,
      validator: alignValidator,
    },
    ...alignProps,
    justify: {
      type: String as PropType<typeof ALIGN_CONTENT_VALUES[number]>,
      default: null,
      validator: justifyValidator,
    },
    ...justifyProps,
    alignContent: {
      type: String as PropType<typeof ALIGN_CONTENT_VALUES[number]>,
      default: null,
      validator: alignContentValidator,
    },

    ...alignContentProps,
    ...makeTagProps(),
  },

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

export type VRow = InstanceType<typeof VRow>
