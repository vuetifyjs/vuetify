// Styles
import '../../stylus/components/_messages.styl'

// Mixins
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-messages',

  mixins: [Colorable],

  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },

  computed: {
    classes () {
      return this.addTextColorClassChecks()
    }
  },

  methods: {
    genChildren () {
      return this.$createElement('transition-group', {
        staticClass: 'v-messages__wrapper',
        attrs: {
          name: 'slide-y-transition',
          tag: 'div'
        }
      }, this.value.map(m => this.genMessage(m)))
    },
    genMessage (key) {
      return this.$createElement('div', {
        staticClass: 'v-messages__message',
        key,
        domProps: {
          innerHTML: key
        }
      })
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'v-messages',
      'class': this.classes
    }, [this.genChildren()])
  }
}
