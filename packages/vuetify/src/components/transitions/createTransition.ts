import { defineComponent, h } from 'vue'
import mergeData from '../../util/mergeData'

import type { VNode } from 'vue'

function mergeTransitions (
  dest: Function | Function[] = [],
  ...transitions: (Function | Function[])[]
) {
  /* eslint-disable-next-line no-array-constructor */
  return Array<Function>().concat(dest, ...transitions)
}

export function createSimpleTransition (
  name: string,
  origin = 'top center 0',
  mode?: string
) {
  return defineComponent({
    name,

    props: {
      group: {
        type: Boolean,
        default: false,
      },
      hideOnLeave: {
        type: Boolean,
        default: false,
      },
      leaveAbsolute: {
        type: Boolean,
        default: false,
      },
      mode: {
        type: String,
        default: mode,
      },
      origin: {
        type: String,
        default: origin,
      },
    },

    setup (props, { attrs, slots }) {
      return () => {
        const tag = `transition${props.group ? '-group' : ''}`
        const data: Dictionary = {
          name,
          mode: props.mode,
          onBeforeEnter (el: HTMLElement) {
            el.style.transformOrigin = props.origin
            el.style.webkitTransformOrigin = props.origin
          },
        }

        if (props.leaveAbsolute) {
          data.onLeave = (el: HTMLElement) => (el.style.position = 'absolute')
        }
        if (props.hideOnLeave) {
          data.onLeave = (el: HTMLElement) => (el.style.display = 'none')
        }

        return h(tag, mergeData(attrs, data), slots.default?.())
      }
    },
  })
}

export function createJavascriptTransition (
  name: string,
  functions: Record<string, any>,
  mode = 'in-out'
) {
  return defineComponent({
    name,

    props: {
      mode: {
        type: String,
        default: mode,
      },
    },

    setup (props, { attrs, slots }) {
      return () => h(
        'transition',
        {
          name,
          ...functions,
        },
        slots.default?.()
      )
    },
  })
}
