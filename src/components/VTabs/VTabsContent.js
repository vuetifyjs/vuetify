import Bootable from '../../mixins/bootable'

import {
  VTabTransition,
  VTabReverseTransition
} from '../transitions'

export default {
  name: 'v-tabs-content',

  mixins: [Bootable],

  inject: ['registerContent', 'unregisterContent'],

  components: {
    VTabTransition,
    VTabReverseTransition
  },

  data () {
    return {
      isActive: false,
      reverse: false
    }
  },

  props: {
    id: {
      type: String,
      required: true
    },
    lazy: Boolean,
    transition: {
      type: String,
      default: 'v-tab-transition'
    },
    reverseTransition: {
      type: String,
      default: 'v-tab-reverse-transition'
    }
  },

  computed: {
    computedTransition () {
      return this.reverse ? this.reverseTransition : this.transition
    }
  },

  methods: {
    toggle (target, reverse, showTransition) {
      this.$el.style.transition = !showTransition ? 'none' : null
      this.reverse = reverse
      this.isActive = this.id === target
    }
  },

  mounted () {
    this.registerContent(this.id, this.toggle)
  },

  beforeDestroy () {
    this.unregisterContent(this.id)
  },

  render (h) {
    return h(this.computedTransition, {}, [
      h('div', {
        'class': 'tabs__content',
        domProps: { id: this.id },
        directives: [{
          name: 'show',
          value: this.isActive
        }],
        on: this.$listeners
      }, this.lazy && this.isBooted || !this.lazy
        ? this.$slots.default : null)])
  }
}
