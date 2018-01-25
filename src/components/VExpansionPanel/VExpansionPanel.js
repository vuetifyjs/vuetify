import '../../stylus/components/_expansion-panel.styl'

import Themeable from '../../mixins/themeable'
import { provide as RegistrableProvide } from '../../mixins/registrable'

export default {
  name: 'v-expansion-panel',

  mixins: [Themeable, RegistrableProvide('expansionPanel')],

  provide () {
    return {
      panelClick: this.panelClick,
      focusable: this.focusable
    }
  },

  data () {
    return {
      items: []
    }
  },

  props: {
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },

  methods: {
    panelClick (uid) {
      if (!this.expand) {
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].toggle(uid)
        }
        return
      }

      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].uid === uid) {
          this.items[i].toggle(uid)
          return
        }
      }
    },
    register (uid, toggle) {
      this.items.push({ uid, toggle })
    },
    unregister (uid) {
      this.items = this.items.filter(i => i.uid !== uid)
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
