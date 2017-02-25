import { debounce } from '../../util/helpers'

export default {
  name: 'select',

  data () {
    return {
      selected: this.value,
      filtered: null,
      inputText: ''
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
      type: Object,
      default: () => { return { text: '' } }
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
    value (value) {
      this.selected = value
    },

    selected (value) {
      this.inputText = value
      this.$emit('input', this.selected)
    }
  },

  methods: {
    filterOptions () {
      if (this.inputText) {
        this.filtered = this.options.filter(option => option.text.includes(this.inputText))
      } else {
        this.filtered = null
      }
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
          value: this.selected.text,
          appendIcon: 'arrow_drop_down'
        },
        ref: 'textField',
        on: {
          input: (...args) => {
            this.inputText = args.join('')
          }
        },
        nativeOn: {
          keyup: debounce(this.filterOptions, this.debounce),
          click: () => {
            const input = this.$refs.textField.$el.querySelector('input')
            console.log(input.selectionStart)
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
      const checkbox = h(
        'v-checkbox',
        {
          props: {
            'value': 
          }
        }
      )
      const action = this.multiple ? h('v-list-tile-action', [h('v-checkbox')]) : null
      const title = h('v-list-tile-title', { domProps: { innerHTML: option.text }})
      const content = h('v-list-tile-content', [title])

      const tile = h(
        'v-list-tile',
        {
          'class': { 'list__tile--active': this.selected.text === option.text },
          nativeOn: {
            click: () => { this.selected = option }
          }
        },
        [action, content]
      )

      return h('v-list-item', [tile])
    }
  },

  render (h) {
    return h('div', [this.genMenu(h)])
  }
}
