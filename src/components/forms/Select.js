import { debounce } from '../../util/helpers'

export default {
  name: 'select',

  data () {
    return {
      selected: Array.isArray(this.value) ? this.value : [this.value],
      filtered: null,
      searchText: 'test'
    }
  },

  computed: {
    classes () {
      return {
      }
    },
    selectedString () {
      return this.selected.length ? this.selected.map(s => s.text).join(', ') : ''
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

    multiple: Boolean,

    autocomplete: Boolean,

    debounce: {
      type: Number,
      default: 300
    }
  },

  watch: {
    value (val) {
      this.selected = this.multiple ? val : [val]
    },

    selected (val) {
      this.$emit('input', this.multiple ? this.selected : this.selected[0])
    }
  },

  methods: {
    filterItems () {
      const { items, searchText, itemText: text } = this

      if (searchText) {
        this.filtered = items.filter(item => item[text].includes(searchText))
      } else {
        this.filtered = null
      }
    },

    isSelected (item) {
      return this.selected.includes(item)
    },

    addSelected (item) {
      this.multiple ? this.selected.push(item) : this.selected = [item]
    },

    removeSelected (item) {
      this.selected.splice(this.selected.findIndex(s => s === item), 1)
    },

    genMenu (h) {
      const input = this.genTextField(h)
      const list = this.genList(h)
      const data = {
        props: {
          offsetY: this.autocomplete,
          auto: !this.autocomplete
        }
      }

      return h('v-menu', data, [input, list])
    },

    genTextField (h) {
      const data = {
        slot: 'activator',
        props: {
          value: this.selectedString,
          appendIcon: 'arrow_drop_down'
        },
        ref: 'textField',
        on: {
          input: (...args) => {
            this.searchText = args.join('')
          }
        },
        nativeOn: {
          keyup: debounce(this.filterItems, this.debounce),
          click: () => {
            // const input = this.$refs.textField.$el.querySelector('input')
            // console.log(input.selectionStart)
          }
        }
      }

      return h('v-text-field', data)
    },

    genList (h) {
      const listItems = []
      const items = this.filtered || this.items

      items.forEach(item => {
        this.$scopedSlots.default
          ? listItems.push(this.$scopedSlots.default({ item }))
          : listItems.push(this.genListItem(h, item))
      })

      return h('v-list', listItems)
    },

    genListItem (h, item) {
      const action = this.genAction(h, item)
      const title = h('v-list-tile-title', { domProps: { innerHTML: item.text }})
      const content = h('v-list-tile-content', [title])

      const tile = h(
        'v-list-tile',
        {
          'class': { 'list__tile--active': this.isSelected(item) },
          nativeOn: {
            click: () => {
              this.multiple && this.isSelected(item)
                ? this.removeSelected(item)
                : this.addSelected(item)
            }
          }
        },
        [action, content]
      )

      return h('v-list-item', [tile])
    },

    genAction (h, item) {
      const checkbox = h(
        'v-checkbox',
        {
          props: {
            'inputValue': this.isSelected(item)
          }
        }
      )

      return this.multiple ? h('v-list-tile-action', [checkbox]) : null
    }
  },

  render (h) {
    return h('div', [this.genMenu(h)])
  }
}
