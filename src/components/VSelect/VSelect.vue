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
        searchTimeout: null,
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
      appendIconCb: Function,
      auto: Boolean,
      autocomplete: Boolean,
      bottom: Boolean,
      cacheItems: Boolean,
      chips: Boolean,
      clearable: Boolean,
      close: Boolean,
      debounceSearch: {
        type: [Number, String],
        default: 200
      },
      browserAutocomplete: {
        type: String,
        default: 'on'
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
          this.isDropdown ? 'menu__content--dropdown' : '',
          this.isAutocomplete ? 'menu__content--autocomplete' : ''
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
      hideSelections () {
        return this.isAutocomplete &&
          !this.isMultiple &&
          this.isFocused &&
          this.isDirty &&
          !this.chips
      },
      isAutocomplete () {
        return this.autocomplete || this.editable || this.tags
      },
      isDirty () {
        return this.selectedItems.length > 0
      },
      isDropdown () {
        return this.segmented || this.overflow || this.editable || this.solo
      },
      isMultiple () {
        return this.multiple || this.tags
      },
      searchValue: {
        get () { return this.lazySearch },
        set (val) {
          if (!this.isAutocomplete ||
            this.selectedIndex > -1
          ) return

          this.lazySearch = val

          clearTimeout(this.searchTimeout)

          this.searchTimeout = setTimeout(() => {
            this.$emit('update:searchInput', val)
          }, this.debounceSearch)
        }
      },
      selectedItem () {
        if (this.isMultiple) return null

        return this.selectedItems.find(i => (
          this.getValue(i) === this.getValue(this.inputValue)
        )) || null
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
          this.searchValue = null
          this.menuIsActive = false
          this.isFocused = false
          this.selectedIndex = -1
        } else {
          this.searchValue = this.getText(this.selectedItem)
        }

        // this.lastItem += !val ? 20 : 0
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
          this.cachedItems = this.returnObject ? [...val] : this.filterDuplicates(this.cachedItems.concat(val))
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
      isMultiple (val) {
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
        if (this.isActive &&
          !this.menuIsActive &&
          val !== this.getValue(this.selectedItem)
        ) {
          this.menuIsActive = true
        }

        this.$refs.menu.listIndex = null

        this.$nextTick(() => {
          this.$refs.menu.listIndex = val ? 0 : -1
        })
      },
      selectedItems () {
        clearTimeout(this.searchTimeout)

        if (this.isAutocomplete) {
          this.$nextTick(this.$refs.menu.updateDimensions)
        }
      },
      value (val) {
        this.inputValue = val
        this.validate()
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

        this.selectItem(this.selectedItems[this.selectedIndex])
        this.selectedIndex = newIndex
      },
      compareObjects (a, b) {
        const aProps = Object.keys(a)
        const bProps = Object.keys(b)

        if (aProps.length !== bProps.length) return false

        for (let i = 0, length = aProps.length; i < length; i++) {
          const propName = aProps[i]

          if (a[propName] !== b[propName]) return false
        }

        return true
      },
      filterDuplicates (arr) {
        return arr.filter((el, i, self) => i === self.indexOf(el))
      },
      focus () {
        this.isActive = true
        this.isFocused = true

        if (this.$refs.input && this.isAutocomplete) {
          this.$nextTick(() => {
            // this.$refs.input.focus()
          })
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
        val = val || this.inputValue

        // If we are using tags, don't filter results
        if (this.tags) return (this.selectedItems = val)

        let selectedItems = this.computedItems.filter(i => {
          if (!this.isMultiple) {
            return this.getValue(i) === this.getValue(val)
          } else {
            // Always return Boolean
            return val.find((j) => {
              const a = this.getValue(j)
              const b = this.getValue(i)

              if (a !== Object(a)) return a === b

              return this.compareObjects(a, b)
            }) !== undefined
          }
        })

        if (!selectedItems.length &&
          val != null &&
          this.tags
        ) {
          selectedItems = Array.isArray(val) ? val : [val]
        }

        this.selectedItems = selectedItems
      },
      getText (item) {
        return this.getPropertyFromItem(item, this.itemText)
      },
      getValue (item) {
        return this.getPropertyFromItem(item, this.itemValue)
      },
      clearableCallback () {
        const inputValue = this.isMultiple ? [] : null

        this.inputValue = inputValue
        this.searchValue = null
        this.$emit('change', inputValue)
        this.genSelectedItems()
        this.showMenu()
      },
      showMenu () {
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
        if (!this.isMultiple) {
          this.inputValue = this.returnObject ? item : this.getValue(item)
          this.selectedItems = [item]
        } else {
          const selectedItems = []
          const inputValue = this.inputValue.slice()
          const i = this.inputValue.findIndex((i) => {
            const a = this.getValue(i)
            const b = this.getValue(item)

            if (a !== Object(a)) return a === b

            return this.compareObjects(a, b)
          })

          i !== -1 && inputValue.splice(i, 1) || inputValue.push(item)
          this.inputValue = inputValue.map((i) => {
            selectedItems.push(i)
            return this.returnObject ? i : this.getValue(i)
          })

          this.selectedItems = selectedItems
        }

        this.searchValue = !this.isMultiple || this.chips
          ? this.getText(this.selectedItem)
          : ''

        this.$emit('change', this.inputValue)

        // List tile will re-render, reset index to
        // maintain highlighting
        const savedIndex = this.$refs.menu.listIndex
        this.$refs.menu.listIndex = -1

        this.$nextTick(() => {
          if (this.isAutocomplete &&
            this.$refs.input
          ) this.$refs.input.focus()
          else this.$el.focus()
          this.$refs.menu.listIndex = savedIndex
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
      } else {
        data.on = {
          click: () => {
            if (this.disabled || this.readonly) return

            // Workaround for clicking select
            // when using autocomplete
            // and click doesn't target the input
            setTimeout(() => {
              if (this.menuIsActive) return

              this.focus()
              this.menuIsActive = true
            }, 100)
          }
        }
      }

      return this.genInputGroup([
        this.genSelectionsAndSearch(),
        this.genMenu()
      ], data, () => this.showMenu())
    }
  }
</script>

<!-- TODO: Style between input-group and the components inside it should be
           better compartmentalized -->
<style lang="stylus" src="../../stylus/components/_text-fields.styl"></style>
<style lang="stylus" src="../../stylus/components/_input-groups.styl"></style>
<style lang="stylus" src="../../stylus/components/_select.styl"></style>
