import '../../stylus/components/_pagination.styl'

import VIcon from '../VIcon'

// Directives
import Resize from '../../directives/resize'

// Mixins
import mixins from '../../util/mixins'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Types
import { VNode, CreateElement } from 'vue'

/* @vue/component */
export default mixins(Colorable, Themeable).extend({
  name: 'v-pagination',

  directives: { Resize },

  props: {
    circle: Boolean,
    disabled: Boolean,
    length: {
      type: Number,
      default: 0,
      validator: (val: number) => val % 1 === 0
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
      selected: null as number | null
    }
  },

  computed: {
    classes (): object {
      return {
        'v-pagination': true,
        'v-pagination--circle': this.circle,
        'v-pagination--disabled': this.disabled,
        ...this.themeClasses
      }
    },

    items (): (string | number)[] {
      const maxLength = parseInt(this.totalVisible, 10) || this.maxButtons
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
      } else if (this.value === left) {
        const end = this.value + left - 1 - even
        return [...this.range(1, end), '...', this.length]
      } else if (this.value === right) {
        const start = this.value - left + 1
        return [1, '...', ...this.range(start, this.length)]
      } else {
        return [
          ...this.range(1, left),
          '...',
          ...this.range(right, this.length)
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
      const width = this.$el && this.$el.parentElement
        ? this.$el.parentElement.clientWidth
        : window.innerWidth

      this.maxButtons = Math.floor((width - 96) / 42)
    },
    next (e: Event) {
      e.preventDefault()
      this.$emit('input', this.value + 1)
      this.$emit('next')
    },
    previous (e: Event) {
      e.preventDefault()
      this.$emit('input', this.value - 1)
      this.$emit('previous')
    },
    range (from: number, to: number) {
      const range = []

      from = from > 0 ? from : 1

      for (let i = from; i <= to; i++) {
        range.push(i)
      }

      return range
    },
    genIcon (h: CreateElement, icon: string, disabled: boolean, fn: EventListener): VNode {
      return h('li', [
        h('button', {
          staticClass: 'v-pagination__navigation',
          class: {
            'v-pagination__navigation--disabled': disabled
          },
          attrs: {
            type: 'button'
          },
          on: disabled ? {} : { click: fn }
        }, [h(VIcon, [icon])])
      ])
    },
    genItem (h: CreateElement, i: string | number): VNode {
      const color: string | false = (i === this.value) && (this.color || 'primary')
      return h('button', this.setBackgroundColor(color, {
        staticClass: 'v-pagination__item',
        class: {
          'v-pagination__item--active': i === this.value
        },
        attrs: {
          type: 'button'
        },
        on: {
          click: () => this.$emit('input', i)
        }
      }), [i.toString()])
    },
    genItems (h: CreateElement): VNode[] {
      return this.items.map((i, index) => {
        return h('li', { key: index }, [
          isNaN(Number(i)) ? h('span', { class: 'v-pagination__more' }, [i.toString()]) : this.genItem(h, i)
        ])
      })
    }
  },

  render (h): VNode {
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
})
