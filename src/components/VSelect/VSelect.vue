<script>
  import { getObjectValueByPath } from '../../util/helpers'

  import VCard from '../VCard'
  import VCheckbox from '../VCheckbox'
  import {
    VList,
    VListTile,
    VListTileAction,
    VListTileContent,
    VListTileTitle
  } from '../VList'
  import VMenu from '../VMenu'

  import Filterable from '../../mixins/filterable'
  import Input from '../../mixins/input'
  import Autocomplete from './mixins/autocomplete'
  import Generators from './mixins/generators'

  import ClickOutside from '../../directives/click-outside'

  export default {
    name: 'v-select',

    inheritAttrs: false,

    components: {
      VCard,
      VCheckbox,
      VList,
      VListTile,
      VListTileAction,
      VListTileContent,
      VListTileTitle,
      VMenu
    },

    directives: {
      ClickOutside
    },

    mixins: [Autocomplete, Input, Filterable, Generators],

    data () {
      return {
        cachedItems: [],
        content: {},
        inputValue: (this.multiple || this.tags) && !this.value ? [] : this.value,
        isBooted: false,
        lastItem: 20,
        lazySearch: null,
        isActive: false,
        menuIsActive: false,
        selectedIndex: -1,
        selectedItems: [],
        shouldBreak: false
      }
    },

    props: {
      appendIcon: {
        type: String,
        default: 'arrow_drop_down'
      },
      auto: Boolean,
      autocomplete: Boolean,
      bottom: Boolean,
      cacheItems: Boolean,
      chips: Boolean,
      clearable: Boolean,
      close: Boolean,
      debounce: {
        type: Number,
        default: 200
      },
      items: {
        type: Array,
        default: () => []
      },
      itemText: {
        type: String,
        default: 'text'
      },
      itemValue: {
        type: String,
        default: 'value'
      },
      itemDisabled: {
        type: String,
        default: 'disabled'
      },
      maxHeight: {
        type: [Number, String],
        default: 300
      },
      minWidth: {
        type: [Boolean, Number, String],
        default: false
      },
      multiple: Boolean,
      multiLine: Boolean,
      offset: Boolean,
      solo: Boolean,
      searchInput: {
        default: null
      },
      singleLine: Boolean,
      tags: Boolean,
      top: Boolean,
      returnObject: Boolean,
      overflow: Boolean,
      segmented: Boolean,
      editable: Boolean
    },

    computed: {
      classes () {
        return {
          'input-group--text-field input-group--select': true,
          'input-group--auto': this.auto,
          'input-group--overflow': this.overflow,
          'input-group--segmented': this.segmented,
          'input-group--editable': this.editable,
          'input-group--autocomplete': this.isAutocomplete,
          'input-group--single-line': this.singleLine || this.isDropdown,
          'input-group--multi-line': this.multiLine,
          'input-group--chips': this.chips,
          'input-group--solo': this.solo,
          'input-group--multiple': this.multiple
        }
      },
      computedContentClass () {
        const children = [
          'menu__content--select',
          this.auto ? 'menu__content--auto' : '',
          this.isDropdown ? 'menu__content--dropdown' : ''
        ]

        return children.join(' ')
      },
      computedItems () {
        return this.filterDuplicates(this.items.concat(this.cachedItems))
      },
      filteredItems () {
        // If we are not actively filtering
        // Show all available items
        const items = (this.isAutocomplete &&
          this.isDirty &&
          this.searchValue === this.selectedItem)
          ? this.computedItems
          : this.filterSearch()

        return !this.auto ? items.slice(0, this.lastItem) : items
      },
      isAutocomplete () {
        return this.autocomplete || this.editable || this.tags
      },
      isDirty () {
        return this.selectedItems.length > 0 ||
          this.placeholder
      },
      isDropdown () {
        return this.segmented || this.overflow || this.editable || this.solo
      },
      searchValue: {
        get () { return this.lazySearch },
        set (val) {
          if (!this.isAutocomplete) return

          this.lazySearch = val
          this.$emit('update:searchInput', val)
        }
      },
      selectedItem () {
        if (this.multiple) return null

        return this.selectedItems.find(i => (
          this.getValue(i) === this.getValue(this.inputValue)
        ))
      }
    },

    watch: {
      inputValue (val) {
        // Populate selected items
        this.genSelectedItems(val)

        this.$emit('input', val)
      },
      isActive (val) {
        if (!val) {
          this.isAutocomplete &&
            (this.searchValue = this.getText(this.selectedItem))
          this.menuIsActive = false
          this.isFocused = false
          this.selectedIndex = -1
        }

        this.lastItem += !val ? 20 : 0
      },
      isBooted () {
        this.$nextTick(() => {
          if (this.content) {
            this.content.addEventListener('scroll', this.onScroll, false)
          }
        })
      },
      items (val) {
        if (this.cacheItems) {
          this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val))
        }

        this.$refs.menu.listIndex = -1

        this.searchValue && this.$nextTick(() => {
          this.$refs.menu.listIndex = 0
        })
      },
      menuIsActive (val) {
        if (!val) return

        this.isBooted = true
        this.isActive = true
      },
      multiple (val) {
        this.inputValue = val ? [] : null
      },
      searchValue (val) {
        // Wrap input to next line if overflowing
        if (this.$refs.input.scrollWidth > this.$refs.input.clientWidth) {
          this.shouldBreak = true
          this.$nextTick(this.$refs.menu.updateDimensions)
        } else if (val === null) {
          this.shouldBreak = false
        }

        // Activate menu if inactive and searching
        if (this.isActive && !this.menuIsActive) {
          this.menuIsActive = true
        }

        this.$refs.menu.listIndex = null

        this.$nextTick(() => {
          this.$refs.menu.listIndex = val ? 0 : -1
        })
      },
      value (val) {
        this.inputValue = val
        this.validate()

        if (this.isAutocomplete) {
          this.$nextTick(this.$refs.menu.updateDimensions)
        }
      }
    },

    created () {
      if (this.tags) this.selectedItems = this.inputValue
    },

    mounted () {
      this.$vuetify.load(() => {
        if (this._isDestroyed) return

        this.content = this.$refs.menu.$refs.content
        this.genSelectedItems()
      })
    },

    beforeDestroy () {
      if (this.isBooted) {
        if (this.content) {
          this.content.removeEventListener('scroll', this.onScroll, false)
        }
      }
    },

    methods: {
      blur () {
        this.$emit('blur')
        if (this.isAutocomplete && this.$refs.input) this.$refs.input.blur()
        this.$nextTick(() => (this.isActive = false))
      },
      changeSelectedIndex (keyCode) {
        if (keyCode === 32 ||
          ![8, 37, 39, 46].includes(keyCode)
        ) return

        const indexes = this.selectedItems.length - 1

        if (keyCode === 37) {
          this.selectedIndex = this.selectedIndex === -1
            ? indexes
            : this.selectedIndex - 1
        } else if (keyCode === 39) {
          this.selectedIndex = this.selectedIndex >= indexes
            ? -1
            : this.selectedIndex + 1
        } else if (this.selectedIndex === -1) {
          this.selectedIndex = indexes
          return
        }

        if (![8, 46].includes(keyCode)) return
        const newIndex = this.selectedIndex === indexes
          ? this.selectedIndex - 1
          : this.selectedItems[this.selectedIndex + 1]
          ? this.selectedIndex
          : -1

        this.selectedItems.splice(this.selectedIndex, 1)
        this.selectedIndex = newIndex
        this.$emit('change', this.selectedItems)
      },
      filterDuplicates (arr) {
        return arr.filter((el, i, self) => i === self.indexOf(el))
      },
      focus () {
        this.isActive = true
        this.isFocused = true

        if (this.$refs.input && this.isAutocomplete) {
          this.$refs.input.focus()
        }

        this.$emit('focus')
      },
      genDirectives () {
        return [{
          name: 'click-outside',
          value: () => (this.isActive = false)
        }]
      },
      genListeners () {
        const listeners = Object.assign({}, this.$listeners)
        delete listeners.input

        return {
          ...listeners,
          click: () => {
            if (this.disabled || this.readonly) return
            this.showMenuItems()
            this.selectedIndex = -1
          },
          focus: () => {
            if (this.disabled || this.readonly) return
            !this.isFocused && this.focus()
          },
          keydown: this.onKeyDown // Located in mixins/autocomplete.js
        }
      },
      genLabel () {
        const singleLine = this.singleLine || this.isDropdown
        if (singleLine && this.isDirty ||
          singleLine && this.isFocused && this.searchValue
        ) return null

        const data = {}

        if (this.id) data.attrs = { for: this.id }

        return this.$createElement('label', data, this.$slots.label || this.label)
      },
      getPropertyFromItem (item, field) {
        if (item !== Object(item)) return item

        const value = getObjectValueByPath(item, field)

        return typeof value === 'undefined' ? item : value
      },
      genSelectedItems (val) {
        val = val || this.inputValue || []

        if (this.tags) {
          this.selectedItems = val
        } else {
          this.selectedItems = this.computedItems.filter(i => {
            if (!this.multiple && !this.tags) {
              return this.getValue(i) === this.getValue(val)
            } else {
              // Always return Boolean
              return val.find((j) => {
                return this.getValue(j) === this.getValue(i)
              }) !== undefined
            }
          })
        }

        // Set searchValue text
        if (!this.multiple) {
          this.$nextTick(() => {
            this.searchValue = this.getText(this.selectedItem)
          })
        }
      },
      getText (item) {
        return this.getPropertyFromItem(item, this.itemText)
      },
      getValue (item) {
        return this.getPropertyFromItem(item, this.itemValue)
      },
      inputAppendCallback () {
        if (this.clearable && this.isDirty) {
          const inputValue = this.multiple ? [] : null

          this.inputValue = inputValue
          this.$emit('change', inputValue)
          this.genSelectedItems()
        }

        this.showMenuItems()
        this.isAutocomplete && this.focus()
      },
      onScroll () {
        if (!this.isActive) {
          requestAnimationFrame(() => (this.content.scrollTop = 0))
        } else {
          const showMoreItems = (
            this.content.scrollHeight -
            (this.content.scrollTop +
            this.content.clientHeight)
          ) < 200

          if (showMoreItems) {
            this.lastItem += 20
          }
        }
      },
      selectItem (item) {
        if (!this.multiple && !this.tags) {
          this.inputValue = this.returnObject ? item : this.getValue(item)
          this.selectedItems = [item]
        } else {
          const selectedItems = []
          const inputValue = this.inputValue.slice()
          const i = this.inputValue.findIndex((i) => {
            return this.getValue(i) === this.getValue(item)
          })

          i !== -1 && inputValue.splice(i, 1) || inputValue.push(item)
          this.inputValue = inputValue.map((i) => {
            selectedItems.push(i)
            return this.returnObject ? i : this.getValue(i)
          })
          this.selectedItems = selectedItems
        }

        this.searchValue = this.multiple ? '' : this.inputValue

        this.$emit('change', this.inputValue)

        this.$nextTick(() => {
          if (this.isAutocomplete &&
            this.$refs.input
          ) this.$refs.input.focus()
          else this.$el.focus()
        })
      },
      showMenuItems () {
        this.isActive = true
        this.menuIsActive = true
      }
    },

    render (h) {
      const data = {
        attrs: {
          tabindex: this.isAutocomplete || this.disabled ? -1 : this.tabindex,
          ...(this.isAutocomplete ? null : this.$attrs),
          role: this.isAutocomplete ? null : 'combobox'
        }
      }

      if (!this.isAutocomplete) {
        data.on = this.genListeners()
        data.directives = this.genDirectives()
      }

      return this.genInputGroup([
        this.genSelectionsAndSearch(),
        this.genMenu()
      ], data)
    }
  }
</script>

<!-- TODO: Style between input-group and the components inside it should be
           better compartmentalized -->
<style lang="stylus" src="../../stylus/components/_text-fields.styl"></style>
<style lang="stylus" src="../../stylus/components/_input-groups.styl"></style>
<style lang="stylus" src="../../stylus/components/_select.styl"></style>
