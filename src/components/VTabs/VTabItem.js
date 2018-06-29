import Bootable from '../../mixins/bootable'

import {
  VTabTransition,
  VTabReverseTransition
} from '../transitions'

import {
  inject as RegistrableInject
} from '../../mixins/registrable'

import Touch from '../../directives/touch'

/* @vue/component */
export default {
  name: 'v-tab-item',

  components: {
    VTabTransition,
    VTabReverseTransition
  },

  directives: {
    Touch
  },

  mixins: [
    Bootable,
    RegistrableInject('tabs', 'v-tab-item', 'v-tabs-items')
  ],

  props: {
    id: String,
    transition: {
      type: [Boolean, String],
      default: 'tab-transition'
    },
    reverseTransition: {
      type: [Boolean, String],
      default: 'tab-reverse-transition'
    }
  },

  data () {
    return {
      isActive: false,
      reverse: false
    }
  },

  computed: {
    computedTransition () {
      return this.reverse ? this.reverseTransition : this.transition
    }
  },

  mounted () {
    this.tabs.register(this)
  },

  beforeDestroy () {
    this.tabs.unregister(this)
  },

  methods: {
    toggle (isActive, reverse, showTransition) {
      this.$el.style.transition = !showTransition ? 'none' : null
      this.reverse = reverse
      this.isActive = isActive
    }
  },

  render (h) {
    const data = {
      staticClass: 'v-tabs__content',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      domProps: { id: this.id },
      on: this.$listeners
    }

    const div = h('div', data, this.showLazyContent(this.$slots.default))

    if (!this.computedTransition) return div

    return h('transition', {
      props: { name: this.computedTransition }
    }, [div])
  }
}
