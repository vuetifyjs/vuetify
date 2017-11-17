require('../../stylus/components/_bottom-navs.styl')

// Mixins
import Applicationable from '../../mixins/applicationable'
import ButtonGroup from '../../mixins/button-group'
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-bottom-nav',

  mixins: [
    Applicationable,
    ButtonGroup,
    Colorable
  ],

  data: () => ({
    defaultColor: 'primary'
  }),

  props: {
    absolute: Boolean,
    active: [Number, String],
    shift: Boolean,
    value: { required: false }
  },

  watch: {
    active () {
      this.update()
    }
  },

  computed: {
    classes () {
      return {
        'bottom-nav': true,
        'bottom-nav--absolute': this.absolute,
        'bottom-nav--shift': this.shift,
        'bottom-nav--active': this.value
      }
    }
  },

  methods: {
    isSelected (i) {
      const item = this.getValue(i)
      return this.active === item
    },
    updateApplication () {
      if (!this.app) return

      this.$vuetify.application.bottom = this.$el.clientHeight
    },
    updateValue (i) {
      const item = this.getValue(i)
      this.$emit('update:active', item)
    }
  },

  render (h) {
    return h('div', {
      class: this.addBackgroundColorClassChecks(this.classes),
      ref: 'content'
    }, this.$slots.default)
  }
}
