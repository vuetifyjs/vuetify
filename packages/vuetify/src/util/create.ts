import Vue, { VNodeData } from 'vue'
import { VNode, FunctionalComponentOptions } from 'vue/types'
import mergeData from './mergeData'

export function createSimpleFunctional (
  c: string,
  el = 'div',
  name?: string
) {
  return Vue.extend({
    name: name || c.replace(/__/g, '-'),

    functional: true,

    render (h, { data, children }): VNode {
      data.staticClass = (`${c} ${data.staticClass || ''}`).trim()

      return h(el, data, children)
    },
  })
}

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
): FunctionalComponentOptions {
  return {
    name,

    functional: true,

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

    render (h, context): VNode {
      const tag = `transition${context.props.group ? '-group' : ''}`
      const data: VNodeData = {
        props: {
          name,
          mode: context.props.mode,
        },
        on: {
          beforeEnter (el: HTMLElement) {
            el.style.transformOrigin = context.props.origin
            el.style.webkitTransformOrigin = context.props.origin
          },
        },
      }

      if (context.props.leaveAbsolute) {
        data.on!.leave = mergeTransitions(data.on!.leave, (el: HTMLElement) => (el.style.position = 'absolute'))
      }
      if (context.props.hideOnLeave) {
        data.on!.leave = mergeTransitions(data.on!.leave, (el: HTMLElement) => (el.style.display = 'none'))
      }

      return h(tag, mergeData(context.data, data), context.children)
    },
  }
}

export function createJavaScriptTransition (
  name: string,
  functions: Record<string, any>,
  mode = 'in-out'
): FunctionalComponentOptions {
  return {
    name,

    functional: true,

    props: {
      mode: {
        type: String,
        default: mode,
      },
    },

    render (h, context): VNode {
      return h(
        'transition',
        mergeData(context.data, {
          props: { name },
          on: functions,
        }),
        context.children
      )
    },
  }
}
