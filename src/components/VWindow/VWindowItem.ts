// Components
import { WindowInstance } from './VWindow'

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
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue from 'vue'
import { VNode, VNodeDirective } from 'vue/types'

type VWindowInstance = InstanceType<typeof WindowInstance>

interface options extends Vue {
  windowGroup: VWindowInstance
}

export const WindowItemInstance = mixins<options & ExtractVue<[typeof Bootable]>>(
  Bootable
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
      if (this.windowGroup.internalReverse) {
        return typeof this.transition !== 'undefined'
          ? this.transition || ''
          : this.windowGroup.computedTransition
      } else {
        return typeof this.reverseTransition !== 'undefined'
          ? this.reverseTransition || ''
          : this.windowGroup.computedTransition
      }
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
      addOnceEventListener(el, 'transitionend', done)

      requestAnimationFrame(() => {
        this.windowGroup.internalHeight = convertToUnit(el.clientHeight)
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

export default WindowItemInstance.extend({
  mixins: [GroupableFactory('windowGroup', 'v-window-item', 'v-window')]
})
