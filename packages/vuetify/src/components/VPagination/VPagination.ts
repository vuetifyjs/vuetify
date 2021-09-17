import './VPagination.sass'

import VIcon from '../VIcon'

// Directives
import Resize from '../../directives/resize'

// Mixins
import Colorable from '../../mixins/colorable'
import Intersectable from '../../mixins/intersectable'
import Themeable from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode, CreateElement, VNodeChildrenArrayContents } from 'vue'

/* @vue/component */
export default mixins(
  Colorable,
  Intersectable({ onVisible: ['init'] }),
  Themeable
).extend({
  name: 'v-pagination',

  directives: { Resize },

  props: {
    circle: Boolean,
    disabled: Boolean,
    length: {
      type: Number,
      default: 0,
      validator: (val: number) => val % 1 === 0,
    },
    nextIcon: {
      type: String,
      default: '$next',
    },
    prevIcon: {
      type: String,
      default: '$prev',
    },
    totalVisible: [Number, String],
    value: {
      type: Number,
      default: 0,
    },
    pageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.page',
    },
    currentPageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.currentPage',
    },
    previousAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.previous',
    },
    nextAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.next',
    },
    wrapperAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.wrapper',
    },
  },

  data () {
    return {
      maxButtons: 0,
      selected: null as number | null,
    }
  },

  computed: {
    classes (): object {
      return {
        'v-pagination': true,
        'v-pagination--circle': this.circle,
        'v-pagination--disabled': this.disabled,
        ...this.themeClasses,
      }
    },

    items (): (string | number)[] {
      const totalVisible = parseInt(this.totalVisible, 10)

      if (totalVisible === 0) {
        return []
      }

      const maxLength = Math.min(
        Math.max(0, totalVisible) || this.length,
        Math.max(0, this.maxButtons) || this.length,
        this.length
      )

      if (this.length <= maxLength) {
        return this.range(1, this.length)
      }

      const even = maxLength % 2 === 0 ? 1 : 0
      const left = Math.floor(maxLength / 2)
      const right = this.length - left + 1 + even

      if (this.value > left && this.value < right) {
        const firstItem = 1
        const lastItem = this.length
        const start = this.value - left + 2
        const end = this.value + left - 2 - even
        const secondItem = start - 1 === firstItem + 1 ? 2 : '...'
        const beforeLastItem = end + 1 === lastItem - 1 ? end + 1 : '...'

        return [1, secondItem, ...this.range(start, end), beforeLastItem, this.length]
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
          ...this.range(right, this.length),
        ]
      }
    },
  },

  watch: {
    value () {
      this.init()
    },
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
    genIcon (h: CreateElement, icon: string, disabled: boolean, fn: EventListener, label: String): VNode {
      return h('li', [
        h('button', {
          staticClass: 'v-pagination__navigation',
          class: {
            'v-pagination__navigation--disabled': disabled,
          },
          attrs: {
            disabled,
            type: 'button',
            'aria-label': label,
          },
          on: disabled ? {} : { click: fn },
        }, [h(VIcon, [icon])]),
      ])
    },
    genItem (h: CreateElement, i: string | number): VNode {
      const color: string | false = (i === this.value) && (this.color || 'primary')
      const isCurrentPage = i === this.value
      const ariaLabel = isCurrentPage ? this.currentPageAriaLabel : this.pageAriaLabel

      return h('button', this.setBackgroundColor(color, {
        staticClass: 'v-pagination__item',
        class: {
          'v-pagination__item--active': i === this.value,
        },
        attrs: {
          type: 'button',
          'aria-current': isCurrentPage,
          'aria-label': this.$vuetify.lang.t(ariaLabel, i),
        },
        on: {
          click: () => this.$emit('input', i),
        },
      }), [i.toString()])
    },
    genItems (h: CreateElement): VNode[] {
      return this.items.map((i, index) => {
        return h('li', { key: index }, [
          isNaN(Number(i)) ? h('span', { class: 'v-pagination__more' }, [i.toString()]) : this.genItem(h, i),
        ])
      })
    },
    genList (h: CreateElement, children: VNodeChildrenArrayContents): VNode {
      return h('ul', {
        directives: [{
          modifiers: { quiet: true },
          name: 'resize',
          value: this.onResize,
        }],
        class: this.classes,
      }, children)
    },
  },

  render (h): VNode {
    const children = [
      this.genIcon(h,
        this.$vuetify.rtl ? this.nextIcon : this.prevIcon,
        this.value <= 1,
        this.previous,
        this.$vuetify.lang.t(this.previousAriaLabel)),
      this.genItems(h),
      this.genIcon(h,
        this.$vuetify.rtl ? this.prevIcon : this.nextIcon,
        this.value >= this.length,
        this.next,
        this.$vuetify.lang.t(this.nextAriaLabel)),
    ]

    return h('nav', {
      attrs: {
        role: 'navigation',
        'aria-label': this.$vuetify.lang.t(this.wrapperAriaLabel),
      },
    }, [this.genList(h, children)])
  },
})
