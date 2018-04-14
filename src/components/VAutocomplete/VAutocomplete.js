// Styles
import '../../stylus/components/_autocompletes.styl'

// Extensions
import VSelect from '../VSelect'
import VSelectList from '../VSelect/VSelectList'

export default {
  name: 'v-autocomplete',

  extends: VSelect,

  data: () => ({
    searchValue: null
  }),

  props: {
    filter: {
      type: Function,
      default: (item, queryText, itemText) => {
        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      }
    },
    nudgeTop: {
      type: [String, Number],
      default: -2
    },
    offsetY: {
      type: Boolean,
      default: true
    },
    search: String,
    transition: {
      type: String,
      default: 'fade-transition'
    }
  },

  computed: {
    classes () {
      return Object.assign({}, VSelect.computed.classes.call(this), {
        'v-autocomplete': true
      })
    },
    computedItems () {
      return this.filteredItems
    },
    filteredItems () {
      return this.filterDuplicates(this.cachedItems.concat(this.items))
        .filter(i => this.filter(i, this.searchValue, this.getText(i)))
    },
    isDirty () {
      return VSelect.computed.isDirty.call(this) || this.searchValue
    },
    isNotFiltering () {
      return this.isDirty &&
        this.searchValue === this.getText(this.selectedItem)
    }
  },

  watch: {
    isFocused (val) {
      if (val && this.$refs.input) {
        this.$refs.input.select()
      }
    },
    searchValue (val) {
      if (val != null && val != '') {
        this.isMenuActive = true
      }
    }
  },

  methods: {
    genList () {
      return this.$createElement(VSelectList, {
        props: {
          action: this.multiple && !this.isHidingSelected,
          color: this.color,
          dark: this.dark,
          dense: this.dense,
          items: this.filteredItems,
          light: this.light,
          noDataText: this.noDataText,
          searchInput: this.searchValue,
          selectedItems: this.selectedItems
        },
        on: {
          select: this.selectItem
        },
        scopedSlots: {
          item: this.$scopedSlots.item
        }
      }, [
        this.$slots['no-data'] ? this.$createElement('div', {
          slot: 'no-data'
        }, this.$slots['no-data']) : null
      ])
    },
    genSelections () {
      return this.multiple || this.chips
        ? VSelect.methods.genSelections.call(this)
        : null
    },
    selectItem (item) {
      this.searchValue = null
      VSelect.methods.selectItem.call(this, item)
    },
    onInput (e) {
      this.mask && this.resetSelections(e.target)
      this.lazyValue = e.target.value
      this.searchValue = e.target.value
      this.badInput = e.target.validity && e.target.validity.badInput
    },
    onKeyDown (e) {
      if (!this.$refs.menu || e.keyCode !== 38) {
        return VSelect.methods.onKeyDown.call(this, e)
      }

      // Pressing up on index 0 resets index
      if (this.$refs.menu.listIndex === 0) {
        this.$refs.menu.listIndex = -1
      }
    }
  }
}
