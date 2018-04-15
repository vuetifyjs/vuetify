// Styles
import '../../stylus/components/_autocompletes.styl'

// Extensions
import VSelect from '../VSelect'
import VTextField from '../VTextField/VTextField'

export default {
  name: 'v-autocomplete',

  extends: VSelect,

  data: vm => ({
    attrsInput: null,
    lazySearch: vm.searchInput
  }),

  props: {
    browserAutocomplete: {
      type: String,
      default: 'off'
    },
    combobox: Boolean,
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
    searchInput: {
      default: null
    },
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
        .filter(i => this.filter(i, this.internalSearch, this.getText(i)))
    },
    hasTags () {
      return this.tags || this.combobox
    },
    internalSearch: {
      get () {
        return this.lazySearch
      },
      set (val) {
        this.lazySearch = val

        this.$emit('update:searchInput', val)
      }
    },
    isDirty () {
      return VSelect.computed.isDirty.call(this) || this.searchIsDirty
    },
    isNotFiltering () {
      return this.isDirty &&
        this.internalSearch === this.getText(this.selectedItem)
    },
    searchIsDirty () {
      return VTextField.computed.isDirty.call(this)
    }
  },

  watch: {
    internalValue (val) {
      this.lazySearch = val
    },
    isFocused (val) {
      if (val && this.$refs.input) {
        this.$refs.input.select()
      } else if (!val && this.hasTags && this.lazySearch) {
        this.updateTags(this.lazySearch)
      }
    },
    isMenuActive (val) {
      if (val) return

      this.lazySearch = null
    },
    searchInput (val) {
      this.lazySearch = val
    }
  },

  methods: {
    genInput () {
      const input = VTextField.methods.genInput.call(this)

      input.data.attrs.role = 'combobox'

      return input
    },
    genList () {
      const list = VSelect.methods.genList.call(this)

      list.componentOptions.propsData.searchInput = this.internalSearch
      list.componentOptions.propsData.items = this.filteredItems

      return list
    },
    genSelections () {
      return this.combobox && this.isDirty
        ? null
        : VSelect.methods.genSelections.call(this)
    },
    selectItem (item) {
      this.internalSearch = null
      VSelect.methods.selectItem.call(this, item)
    },
    onInput (e) {
      this.mask && this.resetSelections(e.target)
      this.internalSearch = e.target.value
      this.lazyValue = e.target.value
      this.badInput = e.target.validity && e.target.validity.badInput
    },
    onKeyDown (e) {
      // If typing and menu is not currently active
      if (this.searchIsDirty) {
        this.isMenuActive = true
      }

      if (!this.$refs.menu || e.keyCode !== 38) {
        return VSelect.methods.onKeyDown.call(this, e)
      }

      // Pressing up on index 0 resets index
      if (this.$refs.menu.listIndex === 0) {
        this.$refs.menu.listIndex = -1
      }
    },
    updateTags (content) {
      if (this.combobox && this.searchIsDirty) {
        this.internalValue = content
      }
      // console.log('tags')
      // // Avoid direct mutation
      // // for vuex strict mode
      // let selectedItems = this.selectedItems.slice()

      // // If a duplicate item
      // // exists, remove it
      // if (selectedItems.includes(content)) {
      //   this.$delete(selectedItems, selectedItems.indexOf(content))
      // }

      // // When updating tags ensure
      // // that that the search text
      // // is populated if needed
      // let internalSearch = null
      // if (this.combobox) {
      //   selectedItems = [content]
      //   internalSearch = this.chips ? null : content
      // } else {
      //   selectedItems.push(content)
      // }

      // this.selectedItems = selectedItems

      // this.$nextTick(() => {
      //   this.internalSearch = internalSearch
      //   this.$emit('input', this.combobox ? content : this.selectedItems)
      // })
    }
  }
}
