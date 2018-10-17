// Components
import VWindow from './VWindow'

// Mixins
import Bootable from '../../mixins/bootable'
import { factory as GroupableFactory } from '../../mixins/groupable'

// Directives
import Touch from '../../directives/touch'

// Utilities
import {
  addOnceEventListener,
  convertToUnit
} from '../../util/helpers'
import { ExtractVue } from './../../util/mixins'
import mixins from '../../util/mixins'

// Types
import Vue from 'vue'
import { VNode, VNodeDirective } from 'vue/types'

type VBaseWindow = InstanceType<typeof VWindow>

interface options extends Vue {
  windowGroup: VBaseWindow
}

export default mixins<options & ExtractVue<[typeof Bootable]>>(
  Bootable,
  GroupableFactory('windowGroup', 'v-window-item', 'v-window')
  /* @vue/component */
).extend({
  name: 'v-window-item',

  directives: {
    Touch
  },

  props: {
    reverseTransition: {
      type: [Boolean, String],
      default: undefined
    },
    transition: {
      type: [Boolean, String],
      default: undefined
    },
    value: {
      required: false
    }
  },

  data () {
    return {
      isActive: false,
      wasCancelled: false
    }
  },

  computed: {
    computedTransition (): string | boolean {
      if (!this.windowGroup.internalReverse) {
        return typeof this.transition !== 'undefined'
          ? this.transition || ''
          : this.windowGroup.computedTransition
      }

      return typeof this.reverseTransition !== 'undefined'
        ? this.reverseTransition || ''
        : this.windowGroup.computedTransition
    }
  },

  methods: {
    genDefaultSlot () {
      return this.$slots.default
    },
    onAfterEnter () {
      if (this.wasCancelled) {
        this.wasCancelled = false
        return
      }

      requestAnimationFrame(() => {
        this.windowGroup.internalHeight = undefined
        this.windowGroup.isActive = false
      })
    },
    onBeforeEnter () {
      this.windowGroup.isActive = true
    },
    onBeforeLeave (el: HTMLElement) {
      this.windowGroup.internalHeight = convertToUnit(el.clientHeight)
    },
    onEnterCancelled () {
      this.wasCancelled = true
    },
    onEnter (el: HTMLElement, done: () => void) {
      const isBooted = this.windowGroup.isBooted

      if (isBooted) {
        addOnceEventListener(el, 'transitionend', done)
      }

      requestAnimationFrame(() => {
        this.windowGroup.internalHeight = convertToUnit(el.clientHeight)

        // On initial render, there is no transition
        // Vue leaves a `enter` transition class
        // if done is called too fast
        !isBooted && setTimeout(done, 100)
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
    }, this.showLazyContent(this.genDefaultSlot()))

    return h('transition', {
      props: {
        name: this.computedTransition
      },
      on: {
        afterEnter: this.onAfterEnter,
        beforeEnter: this.onBeforeEnter,
        beforeLeave: this.onBeforeLeave,
        enter: this.onEnter,
        enterCancelled: this.onEnterCancelled
      }
    }, [div])
  }
})
