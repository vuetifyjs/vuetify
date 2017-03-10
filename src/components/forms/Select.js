import Input from '../../mixins/input'
import { debounce } from '../../util/helpers'

export default {
  name: 'select',

  mixins: [Input],

  data () {
    return {
      inputValue: this.multiple ? Array.from(this.value || []) : new Array(this.value || 0),
      inputSearch: this.value ? this.value[this.itemText] : '',
      filteredItems: null,
      menuActive: false && !this.disabled,
      appendIconCbPrivate: this.removeAllSelected
    }
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },
    itemText: {
      type: String,
      default: 'text'
    },
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    multiple: Boolean,
    autocomplete: Boolean,
    filter: Function,
    singleLine: Boolean,
    chips: Boolean,
    close: Boolean,
    debounce: {
      type: Number,
      default: 300
    }
  },

  computed: {
    classes () {
      return {
        'input-group--text-field': true,
        'input-group--select': true,
        'input-group--autocomplete': this.autocomplete,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine
      }
    }
  },

  watch: {
    focused (val) {
      this.$emit('focused', val)
    },
    value (val) {
      this.inputValue = this.multiple ? val || [] : new Array(val)
      this.inputSearch = this.multiple ? '' : val[this.itemText]
    },
    inputValue (val) {
      this.$emit('input', this.multiple ? val : val[0])
    },
    menuActive (val) {
      if (!val) this.$refs.searchField.blur()
    }
  },

  methods: {
    isDirty () {
      return this.inputSearch || this.multiple && this.inputValue.length
    },

    focus () {
      this.focused = true
      this.closeAction(true)
    },

    blur () {
      this.$nextTick(() => (this.focused = false))
      this.closeAction(false)
    },

    // TODO: Maybe this should be computed prop?
    filterItems () {
      const { items, inputSearch, itemText } = this

      this.filteredItems = inputSearch && this.autocomplete
        ? items.filter(item => {
          return this.filter
            ? this.filter(item, inputSearch)
            : item[itemText].toLowerCase().includes(inputSearch.toLowerCase())
        })
        : null
    },

    isSelected (item) {
      return this.inputValue.includes(item)
    },

    addSelected (item) {
      if (this.multiple) {
        this.inputValue.push(item)
        this.inputSearch = ''
      } else {
        this.inputValue = [item]
        this.inputSearch = item[this.itemText]
      }
      this.filterItems()
    },

    removeSelected (item) {
      this.inputValue.splice(this.inputValue.findIndex(s => s === item), 1)
    },

    removeAllSelected (e) {
      if (!this.appendIconAlt) return

      e.stopPropagation()
      this.inputValue = []
      this.inputSearch = ''
      this.closeAction(false)
    },

    closeAction (on = true) {
      this.appendIconAlt = on && this.close && this.inputValue.length ? 'close' : ''
    },

    genMenu (h) {
      const data = {
        ref: 'menu',
        style: {
          width: '100%'
        },
        props: {
          auto: !this.autocomplete,
          closeOnClick: !this.multiple,
          disabled: this.disabled,
          offsetY: this.autocomplete,
          value: this.menuActive
        },
        on: {
          input: (val) => (this.menuActive = val)
        },
        nativeOn: {
          '!mouseenter': this.closeAction,
          mouseleave: () => { this.closeAction(false) }
        }
      }

      return h('v-menu', data, [this.genActivator(h), this.genList(h)])
    },

    genActivator (h) {
      const data = {
        slot: 'activator'
      }
      return this.genInputGroup(h, [this.genSelectionsAndSearch(h)], data)
    },

    genSelectionsAndSearch (h) {
      const data = {
        slot: 'activator',
        'class': 'input-group__selections'
      }

      return this.multiple
        ? h('div', data, this.genSelections(h).concat(this.genSearchField(h)))
        : h('div', data, [this.genSearchField(h)])
    },

    genSelections (h) {
      const chips = this.chips
      const slots = this.$scopedSlots.selection
      const comma = true // <-- default

      return this.inputValue.map((item, index, array) => {
        if (slots) return this.genSlotSelection(h, item)
        if (chips) return this.genChipSelection(h, item)
        if (comma) {
          const length = array.length
          return this.genCommaSelection(h, item, length !== 1 && index !== length - 1)
        }
      })
    },

    genSlotSelection (h, item) {
      return this.$scopedSlots.selection({ parent: this, item: item })
    },

    genChipSelection (h, item) {
      const data = {
        props: { close: true },
        on: {
          input: val => { if (val === false) this.removeSelected(item) }
        },
        nativeOn: {
          click: e => e.stopPropagation()
        }
      }

      return h('v-chip', data, item[this.itemText])
    },

    genCommaSelection (h, item, hasComma) {
      const data = {
        'class': 'input-group__selections__comma'
      }
      return h('div', data, `${item[this.itemText]}${hasComma ? ',' : ''}`)
    },

    genSearchField (h) {
      const data = {
        ref: 'searchField',
        domProps: {
          value: this.inputSearch
        },
        on: {
          input: e => { this.inputSearch = e.target.value },
          focus: this.focus,
          blur: this.blur,
          keyup: debounce(this.filterItems, this.debounce)
        }
      }

      return h('input', data)
    },

    genList (h) {
      const list = (this.filteredItems || this.items).map(item => this.genListItem(h, item))
      return h('v-list', {}, list)
    },

    genListItem (h, item) {
      return h('v-list-item', {}, [this.genTile(h, item)])
    },

    genTile (h, item) {
      const data = {
        'class': {
          'list__tile--active': this.isSelected(item)
        },
        nativeOn: {
          click: e => {
            if (!this.multiple) {
              return
            }

            e.stopPropagation()
            e.preventDefault()

            this.isSelected(item)
              ? this.removeSelected(item)
              : this.addSelected(item)

            this.$refs.searchField.focus()
          },
          mousedown: e => {
            if (this.multiple) {
              return
            }
            this.addSelected(item)
            this.$refs.searchField.focus()
          }
        }
      }

      return this.$scopedSlots.item
        ? h('v-list-tile', data, this.$scopedSlots.item({ parent: this, item: item }))
        : h('v-list-tile', data, [this.genAction(h, item), this.genContent(h, item)])
    },

    genAction (h, item) {
      if (!this.multiple) return null

      const checkbox = h('v-checkbox', { props: { 'inputValue': this.isSelected(item) }})
      return h('v-list-tile-action', {}, [checkbox])
    },

    genContent (h, item) {
      return h('v-list-tile-content', {}, [h('v-list-tile-title', item[this.itemText])])
    }
  },

  render (h) {
    return this.genMenu(h)
  }
}
