// Composables
import { makeComponentProps } from '@/composables/component'

// Utilities
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

      ...makeComponentProps(),
    },

    setup (props, { slots }) {
      return () => {
        return h(props.tag, {
          class: [klass, props.class],
          style: props.style,
        }, slots.default?.())
      }
    },
  })
}
