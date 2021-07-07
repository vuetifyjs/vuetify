import { camelize, capitalize, h } from 'vue'
import { defineComponent } from '@/util'

export function createSimpleFunctional (
  klass: string,
  tag = 'div',
  name?: string
) {
  return defineComponent({
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
