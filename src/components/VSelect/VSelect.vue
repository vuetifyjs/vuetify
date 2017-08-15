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

  import clickOutside from '../../directives/click-outside'

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
      clickOutside
    },

    mixins: [Autocomplete, Input, Filterable, Generators],

    data () {
      return {
        content: {},
        hasFocused: false,
        inputValue: this.multiple && !this.value ? [] : this.value,
        isBooted: false,
        lastItem: 20,
        isActive: false
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
      filter: Function,
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
      searchInput: null,
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
          'input-group--autocomplete': this.autocomplete,
          'input-group--single-line': this.singleLine || this.isDropdown,
          'input-group--multi-line': this.multiLine,
          'input-group--chips': this.chips,
          'input-group--multiple': this.multiple
        }
      },
      computedContentClass () {
        const children = [
          this.auto ? 'menu__content--auto' : '',
          this.isDropdown ? 'menu__content--dropdown' : ''
        ]

        return children.join(' ')
      },
      filteredItems () {
        const items = this.autocomplete && this.searchValue
          ? this.filterSearch()
          : this.items

        return !this.auto ? items.slice(0, this.lastItem) : items
      },
      isDirty () {
        return this.selectedItems.length
      },
      isDropdown () {
        return this.segmented || this.overflow || this.editable
      },
      searchValue: {
        get () {
          return this.searchInput
        },
        set (val) {
          this.$emit('update:searchInput', val)
        }
      },
      selectedItems () {
        if (this.inputValue === null ||
          typeof this.inputValue === 'undefined') return []

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
        this.$emit('input', val)
      },
      value (val) {
        this.inputValue = val
        this.validate()
        if (this.autocomplete || this.editable) {
          this.$nextTick(this.$refs.menu.updateDimensions)
        }
      },
      isActive (val) {
        this.isBooted = true
        this.lastItem += !val ? 20 : 0

        if (!val) this.blur()
        else this.focus()
      },
      isBooted () {
        this.$nextTick(() => {
          if (this.content) {
            this.content.addEventListener('scroll', this.onScroll, false)
          }
        })
      },
      searchValue () {
        this.$refs.menu.listIndex = -1
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
          this.focused = false
          this.searchValue = null
          this.$emit('blur', this.inputValue)
        })
      },
      focus (e) {
        this.focused = true
        this.$refs.input &&
          (this.autocomplete || this.editable) &&
          this.$refs.input.focus()

        if (this.editable &&
            this.inputValue !== null &&
            typeof this.inputValue !== 'undefined'
          ) {
          this.$nextTick(() => {
            this.$refs.input.value = this.getValue(this.inputValue)
          })
        }
        this.$emit('focus', e)
      },
      genLabel () {
        if (this.searchValue && !this.focused && this.isDirty) return null

        const data = {}

        if (this.id) data.attrs = { for: this.id }

        return this.$createElement('label', data, this.label)
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

        if (this.autocomplete || this.editable) {
          this.$nextTick(() => {
            this.searchValue = null
            this.$refs.input &&
              this.$refs.input.focus()
          })
        }

        this.$emit('change', this.inputValue)
      }
    },

    render (h) {
      return this.genInputGroup([
        this.genSelectionsAndSearch(),
        this.genMenu()
      ], {
        directives: [{
          name: 'click-outside',
          value: () => {
            this.isActive = false
            this.$emit('change', this.inputValue)
          }
        }],
        on: {
          focus: this.focus,
          blur: this.blur,
          click: () => { if (!this.isActive) this.isActive = true },
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
