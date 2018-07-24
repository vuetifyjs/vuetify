import '../../stylus/components/_pagination.styl'

import VIcon from '../VIcon'

import Resize from '../../directives/resize'

import Colorable from '../../mixins/colorable'

/* @vue/component */
export default {
  name: 'v-pagination',

  directives: { Resize },

  mixins: [Colorable],

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
      default: '$vuetify.icons.next'
    },
    prevIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    value: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      maxButtons: 0,
      defaultColor: 'primary'
    }
  },

  computed: {
    classes () {
      return {
        'v-pagination': true,
        'v-pagination--circle': this.circle,
        'v-pagination--disabled': this.disabled
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

      if (this.value > left && this.value < right) {
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

      this.$nextTick(this.onResize)
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
          staticClass: 'v-pagination__navigation',
          class: {
            'v-pagination__navigation--disabled': disabled
          },
          on: disabled ? {} : { click: fn }
        }, [h(VIcon, [icon])])
      ])
    },
    genItem (h, i) {
      return h('button', {
        staticClass: 'v-pagination__item',
        class: (i === this.value) ? this.addBackgroundColorClassChecks({
          'v-pagination__item--active': true
        }) : {},
        on: {
          click: () => this.$emit('input', i)
        }
      }, [i])
    },
    genItems (h) {
      return this.items.map((i, index) => {
        return h('li', { key: index }, [
          isNaN(i) ? h('span', { class: 'v-pagination__more' }, [i]) : this.genItem(h, i)
        ])
      })
    }
  },

  render (h) {
    const children = [
      this.genIcon(h, this.$vuetify.rtl ? this.nextIcon : this.prevIcon, this.value <= 1, this.previous),
      this.genItems(h),
      this.genIcon(h, this.$vuetify.rtl ? this.prevIcon : this.nextIcon, this.value >= this.length, this.next)
    ]

    return h('ul', {
      directives: [{
        modifiers: { quiet: true },
        name: 'resize',
        value: this.onResize
      }],
      class: this.classes
    }, children)
  }
}
