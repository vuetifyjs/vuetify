import '../../stylus/components/_pagination.styl'

import VIcon from '../VIcon'

import Resize from '../../directives/resize'

import Colorable from '../../mixins/colorable'

export default {
  name: 'v-pagination',

  mixins: [Colorable],

  directives: { Resize },

  data () {
    return {
      maxButtons: 0,
      defaultColor: 'primary'
    }
  },

  props: {
    circle: Boolean,
    disabled: Boolean,
    length: {
      type: Number,
      default: 0,
      validator: val => val % 1 === 0
    },
    totalVisible: [Number, String],
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    value: {
      type: Number,
      default: 0
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
      const maxLength = this.totalVisible || this.maxButtons
      if (this.length <= maxLength) {
        return this.range(1, this.length)
      }

      const even = maxLength % 2 === 0 ? 1 : 0
      const left = Math.floor(maxLength / 2)
      const right = this.length - left + 1 + even

      if (this.value >= left && this.value <= right) {
        const start = this.value - left + 2
        const end = this.value + left - 2 - even

        return [1, '...', ...this.range(start, end), '...', this.length]
      } else {
        return [
          ...this.range(1, left),
          '...',
          ...this.range(this.length - left + 1 + even, this.length)
        ]
      }
    }
  },

  watch: {
    value () {
      this.init()
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.selected = null

      // TODO: Change this (f75dee3a, cbdf7caa)
      setTimeout(() => (this.selected = this.value), 100)
    },
    onResize () {
      const width = this.$el && this.$el.parentNode
        ? this.$el.parentNode.clientWidth
        : window.innerWidth

      this.maxButtons = Math.floor((width - 96) / 42)
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
        h('button', {
          staticClass: 'pagination__navigation',
          class: {
            'pagination__navigation--disabled': disabled
          },
          on: disabled ? {} : { click: fn }
        }, [h(VIcon, [icon])])
      ])
    },
    genItem (h, i) {
      return h('button', {
        staticClass: 'pagination__item',
        class: (i === this.value) ? this.addBackgroundColorClassChecks({
          'pagination__item--active': true
        }) : {},
        on: {
          click: () => this.$emit('input', i)
        }
      }, [i])
    },
    genItems (h) {
      return this.items.map((i, index) => {
        return h('li', { key: index }, [
          isNaN(i) ? h('span', { class: 'pagination__more' }, [i]) : this.genItem(h, i)
        ])
      })
    }
  },

  render (h) {
    const children = [
      this.genIcon(h, this.prevIcon, this.value <= 1, this.previous),
      this.genItems(h),
      this.genIcon(h, this.nextIcon, this.value >= this.length, this.next)
    ]

    return h('ul', {
      directives: [{ name: 'resize', value: this.onResize }],
      class: this.classes
    }, children)
  }
}
