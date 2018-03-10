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
      items: [],
      open: []
    }
  },

  props: {
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean,
    value: {
      type: [Number, Array],
      default: () => null
    }
  },

  watch: {
    expand (v) {
      this.open = Array(this.items.length).fill(false)
      this.$emit('input', v ? this.open : null)
    },
    value (v) {
      this.updateFromValue(v)
    }
  },

  methods: {
    updateFromValue (v) {
      if (Array.isArray(v) && !this.expand) return

      let open = Array(this.items.length).fill(false)
      if (typeof v === 'number') {
        open[v] = true
      } else if (v !== null) {
        open = v
      }

      this.updatePanels(open)
    },
    updatePanels (open) {
      this.open = open
      for (let i = 0; i < this.items.length; i++) {
        const active = open && open[i]
        this.items[i].toggle(active)
      }
    },
    panelClick (uid) {
      const open = this.expand ? this.open.slice() : Array(this.items.length).fill(false)
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].uid === uid) {
          open[i] = !this.open[i]
          !this.expand && this.$emit('input', open[i] ? i : null)
        }
      }

      this.updatePanels(open)
      if (this.expand) this.$emit('input', open)
    },
    register (uid, toggle) {
      this.items.push({ uid, toggle })
      this.open.push(false)
    },
    unregister (uid) {
      const index = this.items.findIndex(i => i.uid === uid)
      this.items.splice(index, 1)
      this.open.splice(index, 1)
    }
  },

  mounted () {
    this.value !== null && this.updateFromValue(this.value)
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
