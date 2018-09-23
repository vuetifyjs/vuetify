// Components
import VWindow from './VWindow'

// Mixins
import Bootable from '../../mixins/bootable'
import Groupable from '../../mixins/groupable'

// Directives
import Touch from '../../directives/touch'

// Utilities
import {
  addOnceEventListener,
  convertToUnit
} from '../../util/helpers'
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue from 'vue'
import { VNode, VNodeDirective } from 'vue/types'

type VWindowInstance = InstanceType<typeof VWindow>

interface options extends Vue {
  itemGroup: VWindowInstance
}

export default mixins<options & ExtractVue<[typeof Bootable]>>(
  Bootable,
  Groupable
  /* @vue/component */
).extend({
  name: 'v-window-item',

  directives: {
    Touch
  },

  props: {
    value: {
      required: false
    }
  },

  data () {
    return {
      isActive: false
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

  render (h): VNode {
    const div = h('div', {
      staticClass: 'v-window-item',
      directives: [{
        name: 'show',
        value: this.isActive
      }] as VNodeDirective[],
      on: this.$listeners
    }, this.showLazyContent(this.$slots.default))

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
    }, [div])
  }
})
