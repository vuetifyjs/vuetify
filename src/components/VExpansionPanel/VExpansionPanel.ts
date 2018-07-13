import '../../stylus/components/_expansion-panel.styl'

import Themeable from '../../mixins/themeable'
import { provide as RegistrableProvide } from '../../mixins/registrable'

/* @vue/component */
export default {
  name: 'v-expansion-panel',

  mixins: [Themeable, RegistrableProvide('expansionPanel')],

  provide () {
    return {
      expansionPanel: this
    }
  },

  props: {
    disabled: Boolean,
    readonly: Boolean,
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean,
    value: {
      type: [Number, Array],
      default: () => null
    }
  },

  data: () => ({
    items: [],
    open: []
  }),

  computed: {
    classes () {
      return {
        'v-expansion-panel--focusable': this.focusable,
        'v-expansion-panel--popout': this.popout,
        'v-expansion-panel--inset': this.inset,
        ...this.themeClasses
      }
    }
  },

  watch: {
    expand (val) {
      let openIndex
      if (!val) {
        // Close all panels unless only one is open
        const openCount = this.open.reduce((acc, val) => acc + val, 0)
        const open = Array(this.items.length).fill(false)

        if (openCount === 1) {
          openIndex = this.open.indexOf(true)
        }

        if (openIndex > -1) {
          open[openIndex] = true
        }

        this.open = open
      }

      this.$emit('input', val ? this.open : (openIndex > -1 ? openIndex : null))
    },
    value (v) {
      this.updateFromValue(v)
    }
  },

  mounted () {
    this.value !== null && this.updateFromValue(this.value)
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

  render (h) {
    return h('ul', {
      staticClass: 'v-expansion-panel',
      class: this.classes
    }, this.$slots.default)
  }
}
