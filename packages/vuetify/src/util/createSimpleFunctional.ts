import { camelize, capitalize, defineComponent, h } from 'vue'
import { makeProps } from './makeProps'

export function createSimpleFunctional (
  klass: string,
  tag = 'div',
  name?: string
) {
  return defineComponent({
    name: name ?? capitalize(camelize(klass.replace(/__/g, '-'))),

    props: makeProps({
      tag: {
        type: String,
        default: tag,
      },
    }),

    setup (props, { slots }) {
      return () => h(props.tag, {
        class: klass,
      }, slots.default?.())
    },
  })
}
