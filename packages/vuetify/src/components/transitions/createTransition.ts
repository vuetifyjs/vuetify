// Utilities
import { defineComponent, h, Transition, TransitionGroup } from 'vue'
import { makeProps } from '@/util'

// Types
import type { FunctionalComponent, Prop } from 'vue'

export function createCssTransition (
  name: string,
  origin = 'top center 0',
  mode?: string
) {
  return defineComponent({
    name,

    props: makeProps({
      group: Boolean,
      hideOnLeave: Boolean,
      leaveAbsolute: Boolean,
      mode: {
        type: String,
        default: mode,
      },
      origin: {
        type: String,
        default: origin,
      },
    }),

    setup (props, { slots }) {
      return () => {
        const tag = props.group ? TransitionGroup : Transition

        return h(tag as FunctionalComponent, {
          name,
          mode: props.mode,
          onBeforeEnter (el: HTMLElement) {
            el.style.transformOrigin = props.origin
          },
          onLeave (el: HTMLElement) {
            if (props.leaveAbsolute) {
              const { offsetTop, offsetLeft, offsetWidth, offsetHeight } = el
              el._transitionInitialStyles = {
                position: el.style.position,
                top: el.style.top,
                left: el.style.left,
                width: el.style.width,
                height: el.style.height,
              }
              el.style.position = 'absolute'
              el.style.top = `${offsetTop}px`
              el.style.left = `${offsetLeft}px`
              el.style.width = `${offsetWidth}px`
              el.style.height = `${offsetHeight}px`
            }

            if (props.hideOnLeave) {
              (el as any)._initialDisplay = el.style.display
              el.style.display = 'none'
            }
          },
          onAfterLeave (el: HTMLElement) {
            if (props.leaveAbsolute && el?._transitionInitialStyles) {
              const { position, top, left, width, height } = el._transitionInitialStyles
              delete el._transitionInitialStyles
              el.style.position = position || ''
              el.style.top = top || ''
              el.style.left = left || ''
              el.style.width = width || ''
              el.style.height = height || ''
            }

            if (props.hideOnLeave && el) {
              el.style.display = (el as any)._initialDisplay || ''
            }
          },
        }, slots.default)
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

    props: makeProps({
      mode: {
        type: String,
        default: mode,
      } as Prop<'in-out' | 'out-in' | 'default'>,
    }),

    setup (props, { slots }) {
      return () => {
        return h(Transition, {
          name,
          // mode: props.mode, // TODO: vuejs/vue-next#3104
          ...functions,
        }, slots.default)
      }
    },
  })
}
