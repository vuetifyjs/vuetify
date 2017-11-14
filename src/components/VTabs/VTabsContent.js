import Bootable from '../../mixins/bootable'

import {
  VTabTransition,
  VTabReverseTransition
} from '../transitions'

import Touch from '../../directives/touch'

export default {
  name: 'v-tabs-content',

  mixins: [Bootable],

  inject: ['registerContent', 'unregisterContent'],

  components: {
    VTabTransition,
    VTabReverseTransition
  },

  directives: {
    Touch
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
    transition: {
      type: [Boolean, String],
      default: 'tab-transition'
    },
    reverseTransition: {
      type: [Boolean, String],
      default: 'tab-reverse-transition'
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
    const data = {
      staticClass: 'tabs__content',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    }

    if (this.id) data.domProps = { id: this.id }

    const div = h('div', data, this.showLazyContent(this.$slots.default))

    if (!this.computedTransition) return div

    return h('transition', {
      props: { name: this.computedTransition }
    }, [div])
  }
}
