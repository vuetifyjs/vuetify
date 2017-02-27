import { debounce } from '../../util/helpers'

export default {
  name: 'select',

  data () {
    return {
      selected: Array.isArray(this.value) ? this.value : [this.value],
      filtered: null,
      textFieldString: ''
    }
  },

  computed: {
    classes () {
      return {
      }
    }
  },

  props: {
    value: {
      type: [Object, Array],
      default: () => { return [] }
    },

    options: {
      type: Array,
      default: []
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
    filterOptions () {
      if (this.textFieldString) {
        this.filtered = this.options.filter(option => option.text.includes(this.textFieldString))
      } else {
        this.filtered = null
      }
    },

    isSelected (option) {
      return this.selected.includes(option)
    },

    addSelected (option) {
      this.multiple ? this.selected.push(option) : this.selected = [option]
    },

    removeSelected (option) {
      this.selected.splice(this.selected.findIndex(s => s === option), 1)
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
          value: this.selected.length ? this.selected.map(s => s.text).join(', ') : '',
          appendIcon: 'arrow_drop_down'
        },
        ref: 'textField',
        on: {
          input: (...args) => {
            this.textFieldString = args.join('')
          }
        },
        nativeOn: {
          keyup: debounce(this.filterOptions, this.debounce),
          click: () => {
            // const input = this.$refs.textField.$el.querySelector('input')
            // console.log(input.selectionStart)
          }
        }
      }

      return h('v-text-field', data)
    },

    genList (h) {
      const items = []
      const options = this.filtered || this.options

      options.forEach(option => {
        this.$scopedSlots.default
          ? items.push(this.$scopedSlots.default({ option }))
          : items.push(this.genListItem(h, option))
      })

      return h('v-list', items)
    },

    genListItem (h, option) {
      const action = this.genAction(h, option)
      const title = h('v-list-tile-title', { domProps: { innerHTML: option.text }})
      const content = h('v-list-tile-content', [title])

      const tile = h(
        'v-list-tile',
        {
          'class': { 'list__tile--active': this.isSelected(option) },
          nativeOn: {
            click: () => {
              this.multiple && this.isSelected(option)
                ? this.removeSelected(option)
                : this.addSelected(option)
            }
          }
        },
        [action, content]
      )

      return h('v-list-item', [tile])
    },

    genAction (h, option) {
      const checkbox = h(
        'v-checkbox',
        {
          props: {
            'value': this.isSelected(option)
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
