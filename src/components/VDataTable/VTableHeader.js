import VRow from './VRow'
import VCell from './VCell'
import VCellCheckbox from './VCellCheckbox'

export default {
  name: 'v-table-header',
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    everyItem: {
      type: Boolean
    },
    someItems: {
      type: Boolean
    },
    showSelectAll: {
      type: Boolean
    }
  },
  methods: {
    genSelectAll (h) {
      return h(VCellCheckbox, {
        attrs: {
          inputValue: this.everyItem,
          indeterminate: !this.everyItem && this.someItems
        },
        on: {
          change: () => this.$emit('toggleSelectAll')
        }
      })
    }
  },
  render (h) {
    const columns = this.columns.map(c => {
      const align = c.align || 'text-xs-left'

      return h(VCell, {
        staticClass: [align],
      }, [c.text])
    })

    if (this.showSelectAll) columns.unshift(this.genSelectAll(h))

    return h(VRow, columns)
  }
}
