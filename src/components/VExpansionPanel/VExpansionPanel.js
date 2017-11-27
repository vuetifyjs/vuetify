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
      return this.$children.reduce((toggleables, child) => {
        const component = child.$children[0] || child;
        const options = component.$options;
        if (options && options.name === 'v-expansion-panel-content') {
          toggleables.push(component)
        }

        return toggleables
      }, [])
    },
    panelClick (uid) {
      if (!this.expand) {
        return this.getChildren()
          .forEach(e => e.toggle(uid))
      }

      const panel = this.$children.find(e => e._uid === uid)

      panel && panel.toggle(uid)
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
