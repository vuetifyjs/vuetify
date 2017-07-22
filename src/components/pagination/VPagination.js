import VIcon from '~components/icons/VIcon'

export default {
  name: 'v-pagination',

  props: {
    circle: Boolean,
    disabled: Boolean,
    length: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    nextIcon: {
      type: String,
      default: 'chevron_right'
    }
  },

  watch: {
    value () {
      this.init()
    }
  },

  computed: {
    classes () {
      return {
        'pagination': true,
        'pagination--circle': this.circle,
        'pagination--disabled': this.disabled
      }
    },

    items () {
      if (this.length <= 5) {
        return this.range(1, this.length)
      }

      let min = this.value - 3
      min = min > 0 ? min : 1

      let max = min + 6
      max = max <= this.length ? max : this.length

      if (max === this.length) {
        min = this.length - 6
      }

      const range = this.range(min, max)

      if (this.value >= 4 && this.length > 6) {
        range.splice(0, 2, 1, '...')
      }

      if (this.value + 3 < this.length && this.length > 6) {
        range.splice(range.length - 2, 2, '...', this.length)
      }

      return range
    }
  },

  mounted () {
    this.$vuetify.load.call(this, this.init)
  },

  methods: {
    init () {
      this.selected = null

      // Change this
      setTimeout(() => (this.selected = this.value), 100)
    },
    next (e) {
      e.preventDefault()
      this.$emit('input', this.value + 1)
      this.$emit('next')
    },
    previous (e) {
      e.preventDefault()
      this.$emit('input', this.value - 1)
      this.$emit('previous')
    },
    range (from, to) {
      const range = []

      from = from > 0 ? from : 1

      for (let i = from; i <= to; i++) {
        range.push(i)
      }

      return range
    },
    genIcon (h, icon, disabled, fn) {
      return h('li', [
        h('a', {
          class: {
            'pagination__navigation': true,
            'pagination__navigation--disabled': disabled
          },
          attrs: { href: '#!' },
          on: { click: fn }
        }, [h(VIcon, [icon])])
      ])
    },
    genItem (h, i) {
      return h('a', {
        class: {
          'pagination__item': true,
          'pagination__item--active': i === this.value
        },
        attrs: { href: '#!' },
        on: {
          click: (e) => {
            e.preventDefault()
            this.$emit('input', i)
          }
        }
      }, [i])
    },
    genItems (h) {
      return this.items.map((i) => {
        return h('li', [
          isNaN(i) && h('span', { class: 'pagination__more' }, [i]) || this.genItem(h, i)
        ])
      })
    }
  },

  render (h) {
    const children = [
      this.genIcon(h, this.prevIcon, this.value === 1, this.previous),
      this.genItems(h),
      this.genIcon(h, this.nextIcon, this.value === this.length, this.next)
    ]

    return h('ul', { class: this.classes }, children)
  }
}
