import Bootable from '../../mixins/bootable'

import {
  VTabTransition,
  VTabReverseTransition
} from '../transitions'

import {
  inject as RegistrableInject
} from '../../mixins/registrable'

import Touch from '../../directives/touch'

export default {
  name: 'v-tab-item',

  mixins: [
    Bootable,
    RegistrableInject('tabs', 'v-tab-item', 'v-tabs-items')
  ],

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
    this.tabs.register({
      id: this.id,
      toggle: this.toggle
    })
  },

  beforeDestroy () {
    this.tabs.unregister(this.id)
  },

  render (h) {
    const data = {
      staticClass: 'tabs__content',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      domProps: { id: this.id.toString() },
      on: this.$listeners
    }

    const div = h('div', data, this.showLazyContent(this.$slots.default))

    if (!this.computedTransition) return div

    return h('transition', {
      props: { name: this.computedTransition }
    }, [div])
  }
}
