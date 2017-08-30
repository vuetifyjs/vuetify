<script>
  import { getObjectValueByPath } from '../../util/helpers'

  import VCard from '../VCard'
  import VCheckbox from '../VCheckbox'
  import VIcon from '../VIcon'
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
      VIcon,
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
        content: {},
        hasFocused: false,
        inputValue: this.multiple && !this.value ? [] : this.value,
        isBooted: false,
        lastItem: 20,
        lazySearch: null,
        isActive: false,
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
      chips: Boolean,
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
        return this.items
      },
      filteredItems () {
        const items = this.filterSearch()

        return !this.auto ? items.slice(0, this.lastItem) : items
      },
      isAutocomplete () {
        return this.autocomplete || this.editable
      },
      isDirty () {
        return this.selectedItems.length ||
          this.placeholder
      },
      isDropdown () {
        return this.segmented || this.overflow || this.editable || this.solo
      },
      searchValue: {
        get () {
          return this.lazySearch
        },
        set (val) {
          this.lazySearch = val

          // Do not emit input changes if not booted
          val !== this.searchInput &&
            this.isBooted &&
            this.$emit('update:searchInput', val)
        }
      },
      selectedItem () {
        if (this.multiple) return null

        return this.selectedItems.find(i => (
          this.getValue(i) === this.getValue(this.inputValue)
        ))
      },
      selectedItems () {
        if (!this.multiple &&
          (this.inputValue === null ||
          typeof this.inputValue === 'undefined')) return []

        return this.items.filter(i => {
          if (!this.multiple) {
            return this.getValue(i) === this.getValue(this.inputValue)
          } else {
            // Always return Boolean
            return this.inputValue.find((j) => {
              return this.getValue(j) === this.getValue(i)
            }) !== undefined
          }
        })
      }
    },

    watch: {
      inputValue (val) {
        // Async calls may not have data ready at boot
        if (!this.multiple &&
          this.isAutocomplete &&
          this.selectedItems.length
        ) this.searchValue = this.getText(this.selectedItems[0])

        this.$emit('input', val)
      },
      value (val) {
        this.inputValue = val
        this.validate()

        if (this.isAutocomplete) {
          this.$nextTick(this.$refs.menu.updateDimensions)
        }
      },
      multiple (val) {
        this.inputValue = val ? [] : null
      },
      isActive (val) {
        !val &&
          this.isAutocomplete &&
          (this.searchValue = this.getText(this.selectedItem))
        this.focused = val
        this.isBooted = true
        this.lastItem += !val ? 20 : 0
      },
      isBooted () {
        this.$nextTick(() => {
          if (this.content) {
            this.content.addEventListener('scroll', this.onScroll, false)
          }
        })
      },
      items () {
        if (this.focused && !this.isActive) this.isActive = true
        this.$refs.menu.listIndex = -1

        this.searchValue && this.$nextTick(() => {
          this.$refs.menu.listIndex = 0
        })
      },
      searchValue (val) {
        // Wrap input to next line if overflowing
        if (this.$refs.input.scrollWidth > this.$refs.input.clientWidth) {
          this.shouldBreak = true
          this.$nextTick(this.$refs.menu.updateDimensions)
        } else if (val === null) {
          this.shouldBreak = false
        }

        // This could change externally
        // avoid accidental re-activation
        // when dealing with async items
        if (!this.isActive &&
          this.computedItems.length &&
          val !== null &&
          val !== this.getText(this.selectedItem)
        ) {
          this.isActive = true
          this.focused = true
        }
        this.$refs.menu.listIndex = null

        this.$nextTick(() => {
          this.$refs.menu.listIndex = val ? 0 : -1
        })
      }
    },

    mounted () {
      this.$vuetify.load(() => {
        if (this._isDestroyed) return

        this.content = this.$refs.menu.$refs.content
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
      blur (e) {
        this.$nextTick(() => {
          this.isActive = false
          this.focused = false
          this.$emit('blur', this.inputValue)
        })
      },
      focus (e) {
        this.focused = true
        if (this.$refs.input && this.isAutocomplete) {
          this.multiple &&
            this.$refs.input.focus() ||
            this.$refs.input.setSelectionRange(
              0,
              (this.searchValue || '').toString().length
            )
        }

        this.$emit('focus', e)
      },
      genLabel () {
        const singleLine = this.singleLine || this.isDropdown
        if (singleLine && this.isDirty ||
          singleLine && this.focused && this.searchValue
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
      getText (item) {
        return this.getPropertyFromItem(item, this.itemText)
      },
      getValue (item) {
        return this.getPropertyFromItem(item, this.itemValue)
      },
      onAutocompleteFocus () {
        this.focus()
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
        if (!this.multiple) {
          this.inputValue = this.returnObject ? item : this.getValue(item)
        } else {
          const inputValue = this.inputValue.slice()
          const i = this.inputValue.findIndex((i) => {
            return this.getValue(i) === this.getValue(item)
          })

          i !== -1 && inputValue.splice(i, 1) || inputValue.push(item)
          this.inputValue = inputValue.map((i) => {
            return this.returnObject ? i : this.getValue(i)
          })
        }

        if ((this.isAutocomplete && this.multiple)) {
          this.$nextTick(() => {
            this.$refs.input &&
              this.$refs.input.focus()
          })
        } else if (!this.multiple) {
          this.blur()
        }

        if (this.multiple) this.searchValue = null

        this.$emit('change', this.inputValue)
      }
    },

    render (h) {
      const listeners = Object.assign({}, this.$listeners)
      delete listeners.input

      return this.genInputGroup([
        this.genSelectionsAndSearch(),
        this.genMenu()
      ], {
        attrs: {
          tabindex: this.isAutocomplete || this.disabled ? -1 : 0
        },
        directives: [{
          name: 'click-outside',
          value: () => {
            this.isActive = false
            this.$emit('change', this.inputValue)
          }
        }],
        on: {
          ...listeners,
          focus: !this.isAutocomplete ? this.focus : this.onAutocompleteFocus,
          blur: () => {
            if (this.isActive) return

            this.blur()
          },
          click: (e) => {
            if (!this.isActive) this.isActive = true
          },
          keydown: this.onKeyDown // Located in mixins/autocomplete.js
        }
      })
    }
  }
</script>

<!-- TODO: Style between input-group and the components inside it should be
           better compartmentalized -->
<style lang="stylus" src="../../stylus/components/_text-fields.styl"></style>
<style lang="stylus" src="../../stylus/components/_input-groups.styl"></style>
<style lang="stylus" src="../../stylus/components/_select.styl"></style>
