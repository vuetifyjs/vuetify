// Styles
import '../../stylus/components/_windows.styl'

// Mixins
import Proxyable from '../../mixins/proxyable'

// Utilities
import {
  addOnceEventListener,
  convertToUnit
} from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue/types/vnode'

export default mixins(
  Proxyable
  /* @vue/component */
).extend({
  name: 'v-window',

  props: {
    mode: String,
    reverse: {
      type: Boolean,
      default: undefined
    },
    transition: String,
    value: {
      type: Number,
      default: undefined
    },
    vertical: Boolean
  },

  data: () => ({
    height: undefined as undefined | string,
    isActive: false,
    isReverse: false
  }),

  computed: {
    computedTransition (): string {
      if (this.transition) return this.transition

      const axis = this.vertical ? 'y' : 'x'
      const direction = this.internalReverse ? '-reverse' : ''

      return `v-window-${axis}${direction}-transition`
    },
    internalReverse (): boolean {
      return typeof this.reverse === 'undefined'
        ? this.isReverse
        : this.reverse
    }
  },

  watch: {
    internalValue (val, oldVal) {
      this.isReverse = val < oldVal
    }
  },

  methods: {
    onAfterEnter () {
      this.height = undefined
      this.isActive = false
    },
    onBeforeEnter () {
      this.isActive = true
    },
    onBeforeLeave (el: HTMLElement) {
      this.height = convertToUnit(el.clientHeight)
    },
    onEnter (el: HTMLElement, done: () => void) {
      addOnceEventListener(el, 'transitionend', done)

      requestAnimationFrame(() => {
        this.height = convertToUnit(el.clientHeight)
      })
    },
    genContainer (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-window__container',
        class: {
          'v-window__container--is-active': this.isActive
        },
        style: {
          height: this.height
        }
      }, [this.genTransition()])
    },
    genDefaultSlot () {
      if (!this.$slots.default ||
        this.$slots.default.length === 1 ||
        typeof this.value === 'undefined'
      ) return this.$slots.default

      return this.$slots.default.filter((node, i) => i === this.internalValue)
    },
    genTransition (): VNode {
      return this.$createElement('transition', {
        props: {
          name: this.computedTransition,
          mode: this.mode
        },
        on: {
          beforeEnter: this.onBeforeEnter,
          enter: this.onEnter,
          afterEnter: this.onAfterEnter,
          beforeLeave: this.onBeforeLeave
        }
      }, this.genDefaultSlot())
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-window'
    }, [this.genContainer()])
  }
})
