import { VExpandTransition } from '../transitions'

import Toggleable from '../../mixins/toggleable'

import Ripple from '../../directives/ripple'
import ClickOutside from '../../directives/click-outside'

export default {
  name: 'v-expansion-panel-content',

  mixins: [Toggleable],

  directives: {
    Ripple,
    ClickOutside
  },

  inject: ['expand'],

  data () {
    return {
      height: 'auto'
    }
  },

  props: {
    ripple: Boolean
  },

  computed: {
    classes () {
      return {
        'expansion-panel__header': true,
        'expansion-panel__header--active': this.isActive
      }
    }
  },

  methods: {
    closeConditional (e) {
      return this.$parent.$el.contains(e.target) &&
        !this.expand() &&
        !this.$el.contains(e.target)
    },
    toggle () {
      this.isActive = !this.isActive
    },
    genHeader (h) {
      return h('div', {
        class: this.classes,
        directives: [
          {
            name: 'click-outside',
            value: this.closeConditional
          },
          {
            name: 'ripple',
            value: this.ripple
          }
        ],
        on: {
          click: () => {
            this.isActive = !this.isActive
          }
        }
      }, [this.$slots.header])
    },
    genBody (h) {
      return h('div', {
        ref: 'body',
        class: 'expansion-panel__body',
        directives: [
          {
            name: 'show',
            value: this.isActive
          }
        ]
      }, [this.$slots.default])
    }
  },

  render (h) {
    const children = []

    this.$slots.header && children.push(this.genHeader(h))
    children.push(h(VExpandTransition, [this.genBody(h)]))

    return h('li', children)
  }
}
