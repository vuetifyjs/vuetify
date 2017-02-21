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
      default: () => { return { text: '', value: '' } }
    },

    options: {
      type: Array,
      default: []
    },

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
      const input = this.genInput(h)
      const list = this.genList(h)
      const data = {
        props: {
          offsetY: true
        }
      }

      return h('v-menu', data, [input, list])
    },

    genInput (h) {
      const data = {
        slot: 'activator',
        props: {
          value: this.selected.text,
          appendIcon: 'arrow_drop_down'
        },
        on: {
          input: (...args) => {
            this.inputText = args.join('')
          }
        },
        nativeOn: {
          keyup: debounce(this.filterOptions, this.debounce)
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
      const title = h('v-list-tile-title', { domProps: { innerHTML: option.text }})
      const tile = h('v-list-tile', [title])
      const data = {
        on: {
          click: () => { this.selected = option }
        }
      }

      return h('v-list-item', data, [tile])
    }
  },

  render (h) {
    return h('div', [this.genMenu(h)])
  }
}
