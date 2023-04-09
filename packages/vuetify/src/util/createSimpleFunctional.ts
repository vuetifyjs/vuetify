import { camelize, capitalize, h } from 'vue'
import { genericComponent } from './defineComponent'

export function createSimpleFunctional (
  klass: string,
  tag = 'div',
  name?: string
) {
  return genericComponent()({
    name: name ?? capitalize(camelize(klass.replace(/__/g, '-'))),

    props: {
      tag: {
        type: String,
        default: tag,
      },
    },

    setup (props, { slots }) {
      return () => h(props.tag, {
        class: klass,
      }, slots.default?.())
    },
  })
}
