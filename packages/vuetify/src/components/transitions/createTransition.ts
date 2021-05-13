import { FunctionalComponentOptions, VNode, VNodeData } from 'vue'
import mergeData from '../../util/mergeData'

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
        data.on!.leave = mergeTransitions(data.on!.leave, (el: HTMLElement) => {
          const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = el
          el._transitionInitialStyles = {
            position: el.style.position,
            top: el.style.top,
            left: el.style.left,
            width: el.style.width,
            height: el.style.height,
          }
          el.style.position = 'absolute'
          el.style.top = offsetTop + 'px'
          el.style.left = offsetLeft + 'px'
          el.style.width = offsetWidth + 'px'
          el.style.height = offsetHeight + 'px'
        })
        data.on!.afterLeave = mergeTransitions(data.on!.afterLeave, (el?: HTMLElement) => {
          if (el && el._transitionInitialStyles) {
            const { position, top, left, width, height } = el._transitionInitialStyles
            delete el._transitionInitialStyles
            el.style.position = position || ''
            el.style.top = top || ''
            el.style.left = left || ''
            el.style.width = width || ''
            el.style.height = height || ''
          }
        })
      }
      if (context.props.hideOnLeave) {
        data.on!.leave = mergeTransitions(data.on!.leave, (el: HTMLElement) => {
          (el as any)._initialDisplay = el.style.display
          el.style.display = 'none'
        })
        data.on!.afterLeave = mergeTransitions(data.on!.afterLeave, (el?: HTMLElement) => {
          if (el) el.style.display = (el as any)._initialDisplay || ''
        })
      }

      return h(tag, mergeData(context.data, data), context.children)
    },
  }
}

export function createJavascriptTransition (
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
