// Components
import VWindow from './VWindow'

// Mixins
import Bootable from '../../mixins/bootable'
import { factory as GroupableFactory } from '../../mixins/groupable'

// Directives
import Touch from '../../directives/touch'

// Utilities
import { convertToUnit, getSlot } from '../../util/helpers'
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import { VNode } from 'vue'

const baseMixins = mixins(
  Bootable,
  GroupableFactory('windowGroup', 'v-window-item', 'v-window')
)

interface options extends ExtractVue<typeof baseMixins> {
  $el: HTMLElement
  windowGroup: InstanceType<typeof VWindow>
}

export default baseMixins.extend<options>().extend(
  /* @vue/component */
).extend({
  name: 'v-window-item',

  directives: {
    Touch,
  },

  props: {
    disabled: Boolean,
    reverseTransition: {
      type: [Boolean, String],
      default: undefined,
    },
    transition: {
      type: [Boolean, String],
      default: undefined,
    },
    value: {
      required: false,
    },
  },

  data () {
    return {
      isActive: false,
      inTransition: false,
    }
  },

  computed: {
    classes (): object {
      return this.groupClasses
    },
    computedTransition (): string | boolean {
      if (!this.windowGroup.internalReverse) {
        return typeof this.transition !== 'undefined'
          ? this.transition || ''
          : this.windowGroup.computedTransition
      }

      return typeof this.reverseTransition !== 'undefined'
        ? this.reverseTransition || ''
        : this.windowGroup.computedTransition
    },
  },

  methods: {
    genDefaultSlot () {
      return getSlot(this)
    },
    genWindowItem () {
      return this.$createElement('div', {
        staticClass: 'v-window-item',
        class: this.classes,
        directives: [{
          name: 'show',
          value: this.isActive,
        }],
        on: this.$listeners,
      }, this.genDefaultSlot())
    },
    onAfterTransition () {
      if (!this.inTransition) {
        return
      }

      // Finalize transition state.
      this.inTransition = false
      if (this.windowGroup.transitionCount > 0) {
        this.windowGroup.transitionCount--

        // Remove container height if we are out of transition.
        if (this.windowGroup.transitionCount === 0) {
          this.windowGroup.transitionHeight = undefined
        }
      }
    },
    onBeforeTransition () {
      if (this.inTransition) {
        return
      }

      // Initialize transition state here.
      this.inTransition = true
      if (this.windowGroup.transitionCount === 0) {
        // Set initial height for height transition.
        this.windowGroup.transitionHeight = convertToUnit(this.windowGroup.$el.clientHeight)
      }
      this.windowGroup.transitionCount++
    },
    onTransitionCancelled () {
      this.onAfterTransition() // This should have the same path as normal transition end.
    },
    onEnter (el: HTMLElement) {
      if (!this.inTransition) {
        return
      }

      this.$nextTick(() => {
        // Do not set height if no transition or cancelled.
        if (!this.computedTransition || !this.inTransition) {
          return
        }

        // Set transition target height.
        this.windowGroup.transitionHeight = convertToUnit(el.clientHeight)
      })
    },
  },

  render (h): VNode {
    return h('transition', {
      props: {
        name: this.computedTransition,
      },
      on: {
        // Handlers for enter windows.
        beforeEnter: this.onBeforeTransition,
        afterEnter: this.onAfterTransition,
        enterCancelled: this.onTransitionCancelled,

        // Handlers for leave windows.
        beforeLeave: this.onBeforeTransition,
        afterLeave: this.onAfterTransition,
        leaveCancelled: this.onTransitionCancelled,

        // Enter handler for height transition.
        enter: this.onEnter,
      },
    }, this.showLazyContent(() => [this.genWindowItem()]))
  },
})
