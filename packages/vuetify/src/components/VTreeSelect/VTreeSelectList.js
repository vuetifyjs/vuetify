/* uses instead of VSelectList from base component */
// Utils
import mixins from '../../util/mixins'
import { VListTile, VListTileContent, VListTileTitle } from '../VList'

// Mixins
import Themeable from '../../mixins/themeable'
import Colorable from '../../mixins/colorable'
import VTreeViewSelector from './VTreeViewSelector'
import { VTreeviewNodeProps } from '../VTreeview/VTreeviewNode'

export default mixins(
  Themeable, Colorable
  /* @vue/component */
).extend({
  name: 'v-tree-select-list',
  props: {
    selectedItems: [],
    noDataText: String,
    dense: Boolean,
    multiple: Boolean,
    items: {
      type: Array,
      default: () => ([])
    },
    openAll: Boolean,
    returnObject: {
      type: Boolean,
      default: false // TODO: Should be true in next major
    },
    value: {
      type: Array,
      default: () => ([])
    },
    search: String,
    filter: {
      type: Function,
      default: undefined
    },
    ...VTreeviewNodeProps
  },
  computed: {
    staticNoDataTile () {
      const tile = {
        on: {
          mousedown: e => e.preventDefault() // Prevent onBlur from being called
        }
      }
      return this.$createElement(VListTile, tile, [
        this.genTileNoDataContent()
      ])
    }
  },
  methods: {
    genTileNoDataContent () {
      const innerHTML = this.noDataText
      return this.$createElement(VListTileContent,
        [this.$createElement(VListTileTitle, {
          domProps: { innerHTML }
        })]
      )
    }
  },
  render (h) {
    const children = []
    if (!this.items || !Array.isArray(this.items) || this.items.length < 1) {
      children.push(this.$slots['no-data'] || this.staticNoDataTile)
    }
    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])
    const childrenAppend = []
    this.$slots['append-item'] && childrenAppend.push(this.$slots['append-item'])

    return this.$createElement('div', {
      staticClass: 'v-select-list v-card',
      'class': this.themeClasses
    }, [
      children,
      this.$createElement(VTreeViewSelector, {
        props: {
          dense: this.dense,
          items: this.items,
          selectable: true,
          returnObject: true,
          selectOnly: true,
          selectedItems: this.selectedItems,
          openAll: this.openAll
        },
        on: {
          input: e => {
            this.$emit('select', e)
          }
        }
      }), childrenAppend
    ])
  }
})
