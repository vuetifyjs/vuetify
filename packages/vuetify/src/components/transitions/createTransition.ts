// Utilities
import { defineComponent, TransitionGroup, Transition, h } from 'vue'

// Types
import type { FunctionalComponent, Prop } from 'vue'

export function createCssTransition (
  name: string,
  origin = 'top center 0',
  mode?: string
) {
  return defineComponent({
    name,

    props: {
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
    },

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
            if (props.leaveAbsolute) el.style.position = 'absolute'
            if (props.hideOnLeave) el.style.display = 'none'
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

    props: {
      mode: {
        type: String,
        default: mode,
      } as Prop<'in-out' | 'out-in' | 'default'>,
    },

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
