require('../../stylus/components/_button-toggle.styl')

import ButtonGroup from '../../mixins/button-group'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-btn-toggle',

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  mixins: [ButtonGroup, Themeable],

  props: {
    inputValue: {
      required: false
    },
    items: {
      type: Array,
      default: () => []
    },
    mandatory: Boolean,
    multiple: Boolean
  },

  computed: {
    classes () {
      return {
        'btn-toggle': true,
        'btn-toggle--selected': this.hasValue,
        'theme--light': this.light,
        'theme--dark': this.dark
      }
    },
    hasValue () {
      return (this.multiple && this.inputValue.length) ||
        (!this.multiple && this.inputValue !== null &&
          typeof this.inputValue !== 'undefined')
    }
  },

  watch: {
    inputValue: {
      handler () {
        this.update()
      },
      deep: true
    }
  },

  methods: {
    isSelected (i) {
      const item = this.getValue(i)
      if (!this.multiple) {
        return this.inputValue === item
      }

      return this.inputValue.includes(item)
    },
    updateValue (i) {
      const item = this.getValue(i)
      if (!this.multiple) {
        if (this.mandatory && this.inputValue === item) return
        return this.$emit('change', this.inputValue === item ? null : item)
      }

      const items = this.inputValue.slice()

      const index = items.indexOf(item)
      if (index > -1) {
        if (this.mandatory && items.length === 1) return
        items.length >= 1 && items.splice(index, 1)
      } else {
        items.push(item)
      }

      this.$emit('change', items)
    }
  },

  mounted () {
    if (this.items.length > 0) {
      console.warn('The \'items\' props has been deprecated. v-btn-toggle now has a default slot where you can place buttons.')
    }
  },

  render (h) {
    return h('div', { class: this.classes }, this.$slots.default)
  }
}
