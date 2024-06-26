import './VSimpleTable.sass'

import { convertToUnit, getSlot } from '../../util/helpers'
import Themeable from '../../mixins/themeable'
import mixins from '../../util/mixins'
import { VNode } from 'vue'

export default mixins(Themeable).extend({
  name: 'v-simple-table',

  props: {
    dense: Boolean,
    fixedHeader: Boolean,
    height: [Number, String],
  },

  computed: {
    classes (): Record<string, boolean> {
      return {
        'v-data-table--dense': this.dense,
        'v-data-table--fixed-height': !!this.height && !this.fixedHeader,
        'v-data-table--fixed-header': this.fixedHeader,
        'v-data-table--has-top': !!this.$slots.top,
        'v-data-table--has-bottom': !!this.$slots.bottom,
        ...this.themeClasses,
      }
    },
  },

  methods: {
    genWrapper () {
      return this.$slots.wrapper || this.$createElement('div', {
        staticClass: 'v-data-table__wrapper',
        style: {
          height: convertToUnit(this.height),
        },
      }, [
        this.$createElement('table', getSlot(this)),
      ])
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-data-table',
      class: this.classes,
    }, [
      getSlot(this, 'top'),
      this.genWrapper(),
      getSlot(this, 'bottom'),
    ])
  },
})
