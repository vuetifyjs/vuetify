require('../../stylus/components/_expansion-panel.styl')

import Themeable from '../../mixins/themeable'

export default {
  name: 'v-expansion-panel',

  mixins: [Themeable],

  provide () {
    return {
      panelClick: this.panelClick,
      focusable: this.focusable
    }
  },

  props: {
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },

  methods: {
    getChildren () {
      return this.$children.filter(c => {
        return c.$options && c.$options.name === 'v-expansion-panel-content'
      })
    },
    panelClick (uid) {
      const children = this.getChildren()

      if (!this.expand) {
        for (const child of children) child.toggle(uid)
        return
      }

      for (const child of children) {
        if (child._uid === uid) {
          child.toggle(uid)
          return
        }
      }
    }
  },

  render (h) {
    return h('ul', {
      staticClass: 'expansion-panel',
      'class': {
        'expansion-panel--focusable': this.focusable,
        'expansion-panel--popout': this.popout,
        'expansion-panel--inset': this.inset,
        ...this.themeClasses
      }
    }, this.$slots.default)
  }
}
