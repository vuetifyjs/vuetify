import VTreeView from '../VTreeview/VTreeview'

export default VTreeView.extend({
  name: 'v-tree-view-selector',
  props: {
    selectedItems: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    selectedCache: new Set()
  }),
  watch: {
    selectedItems () {
      if (this.selectedItems.length < 1) {
        this.clearSelection()
      }
    }
  },
  methods: {
    clearSelection () {
      this.selectedCache.clear()
      Object.keys(this.nodes).forEach(key => {
        this.nodes[key].isSelected = false
        this.nodes[key].isIndeterminate = false
      })
    }
  }
})
