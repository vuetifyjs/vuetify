import Bootable from '../../mixins/bootable'

import {
  inject as RegistrableInject
} from '../../mixins/registrable'

import {
  addOnceEventListener,
  convertToUnit
} from '../../util/helpers'

import Touch from '../../directives/touch'
import groupable from '../../mixins/groupable'

/* @vue/component */
export default {
  name: 'v-window-item',

  directives: {
    Touch
  },

  mixins: [
    Bootable,
    groupable
  ],

  props: {
    value: {
      required: false
    }
  },

  data () {
    return {
      isActive: false,
      reverse: false
    }
  },

  computed: {
    computedTransition (): string {
      const axis = this.itemGroup.vertical ? 'y' : 'x'
      const direction = this.internalReverse ? '-reverse' : ''

      return `v-window-${axis}${direction}-transition`
    }
  },

  methods: {
    onAfterEnter () {
      this.itemGroup.height = undefined
      this.itemGroup.isActive = false
    },
    onBeforeEnter () {
      this.itemGroup.isActive = true
    },
    onBeforeLeave (el: HTMLElement) {
      this.itemGroup.height = convertToUnit(el.clientHeight)
    },
    onEnter (el: HTMLElement, done: () => void) {
      addOnceEventListener(el, 'transitionend', done)

      requestAnimationFrame(() => {
        this.itemGroup.height = convertToUnit(el.clientHeight)
      })
    }
  },

  render (h) {
    const data = {
      staticClass: 'v-window-item',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    }

    return h('transition', {
      props: {
        name: this.itemGroup.computedTransition
      },
      on: {
        afterEnter: this.onAfterEnter,
        beforeEnter: this.onBeforeEnter,
        beforeLeave: this.onBeforeLeave,
        enter: this.onEnter
      }
    }, [
      h('div', data, this.showLazyContent(this.$slots.default))
    ])
  }
}
