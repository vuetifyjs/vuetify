import Input from '../../mixins/input'
import { debounce } from '../../util/helpers'

export default {
  name: 'select',

  mixins: [Input],

  data () {
    return {
      selected: Array.isArray(this.value) ? this.value : [this.value],
      filtered: null,
      searchText: ''
    }
  },

  computed: {
    classes () {
      return {
        'input-group--text-field': true,
        'input-group--single-line': this.singleLine,
        'input-group--multi-line': this.multiLine
      }
    },

    single () {
      return !this.multiple
    }
  },

  props: {
    value: {
      type: [Object, Array],
      default: () => { return [] }
    },
    items: {
      type: Array,
      default: () => { return [] }
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
    chips: Boolean,
    debounce: {
      type: Number,
      default: 300
    }
  },

  watch: {
    focused () {
      this.$emit('focused', this.focused)
    },

    value (val) {
      this.selected = this.multiple ? val : [val]
    },

    selected (val) {
      this.$emit('input', this.multiple ? this.selected : this.selected[0])
    }
  },

  methods: {
    blur () {
      this.$nextTick(() => (this.focused = false))
    },

    filterItems () {
      const { items, searchText, itemText } = this

      this.filtered = searchText
        ? items.filter(item => item[itemText].includes(searchText))
        : null
    },

    isSelected (item) {
      return this.selected.includes(item)
    },

    addSelected (item) {
      if (this.single) {
        this.searchText = item.text
        this.selected = [item]
      }

      if (this.multiple) {
        this.searchText = ''
        this.filtered = null
        this.selected.push(item)
      }
    },

    removeSelected (item) {
      this.selected.splice(this.selected.findIndex(s => s === item), 1)
    },

    genMenu (h) {
      const data = {
        style: {
          width: '100%'
        },
        props: {
          offsetY: this.autocomplete,
          auto: !this.autocomplete
        }
      }

      return h('v-menu', data, [this.genActivator(h), this.genList(h)])
    },

    genActivator (h) {
      const data = { slot: 'activator' }
      return h('div', data, [this.genInputGroup(h, [this.genSelectionsAndSearch(h)])])
    },

    genSelectionsAndSearch (h) {
      const data = {
        slot: 'activator',
        style: { // TODO: Move this to stylus file somewhere.
          'display': 'flex',
          'flex-wrap': 'wrap',
          'width': '100%'
        }
      }

      return this.multiple
        ? h('div', data, this.genSelections(h).concat(this.genSearchField(h)))
        : h('div', data, [this.genSearchField(h)])
    },

    genSelections (h) {
      const chips = this.chips
      const slots = this.$scopedSlots.selection
      const comma = true // <-- default

      return this.selected.map(item => {
        if (slots) return this.genSlotSelection(h, item)
        if (chips) return this.genChipSelection(h, item)
        if (comma) return this.genCommaSelection(h, item)
      })
    },

    genSlotSelection (h, item) {
      return this.$scopedSlots.selection({ item })
    },

    genChipSelection (h, item) {
      const data = {
        props: {
          close: true
        },
        on: {
          input: arg => { if (arg === false) this.removeSelected(item) }
        },
        nativeOn: {
          click: e => { e.stopPropagation() }
        }
      }

      return h('v-chip', data, item.text)
    },

    genCommaSelection (h, item) {
      const data = {
        style: { // TODO: Move this to stylus file somewhere.
          'font-size': '16px',
          'height': '30px',
          'padding-top': '4px',
          'padding-right': '4px'
        }
      }

      return h('div', data, item.text + ',')
    },

    genSearchField (h) {
      const data = {
        domProps: {
          value: this.searchText
        },
        on: {
          input: e => { this.searchText = e.target.value },
          focus: () => (this.focused = true),
          blur: this.blur,
          keyup: debounce(this.filterItems, this.debounce)
        }
      }

      return h('input', data)
    },

    genList (h) {
      const list = this.$scopedSlots.item
        ? (this.filtered || this.items).map(item => this.$scopedSlots.default({ item }))
        : (this.filtered || this.items).map(item => this.genListItem(h, item))

      return h('v-list', list)
    },

    genListItem (h, item) {
      return h('v-list-item', [this.genTile(h, item)])
    },

    genTile (h, item) {
      const data = {
        'class': { 'list__tile--active': this.isSelected(item) },
        'nativeOn': {
          click: () => {
            this.multiple && this.isSelected(item)
              ? this.removeSelected(item)
              : this.addSelected(item)
          }
        }
      }

      return h('v-list-tile', data, [this.genAction(h, item), this.genContent(h, item)])
    },

    genAction (h, item) {
      if (this.single) return null

      const checkbox = h(
        'v-checkbox',
        {
          props: {
            'inputValue': this.isSelected(item)
          }
        }
      )

      return h('v-list-tile-action', [checkbox])
    },

    genContent (h, item) {
      return h('v-list-tile-content', [h('v-list-tile-title', item.text)])
    }
  },

  render (h) {
    return this.genMenu(h)
  }
}
