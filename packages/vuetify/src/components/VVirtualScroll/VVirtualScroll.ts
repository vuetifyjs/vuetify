// Styles
import './VVirtualScroll.sass'

// Mixins
import Measurable from '../../mixins/measurable'

// Helpers
import {
  convertToUnit,
  getSlot,
} from '../../util/helpers'

// Types
import { VNode } from 'vue'

export default Measurable.extend({
  name: 'v-virtual-scroll',

  props: {
    bench: {
      type: [Number, String],
      default: 0,
    },
    itemSize: {
      type: [Number, String],
      required: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    horizontal: Boolean,
  },

  data: () => ({
    first: 0,
    last: 0,
    scrollAmount: 0,
  }),

  computed: {
    __bench (): number {
      return parseInt(this.bench, 10)
    },
    __itemSize (): number {
      return parseInt(this.itemSize, 10)
    },
    firstToRender (): number {
      return Math.max(0, this.first - this.__bench)
    },
    lastToRender (): number {
      return Math.min(this.items.length, this.last + this.__bench)
    },
  },

  mounted () {
    this.last = this.getLast(0)
    this.$el.addEventListener('scroll', this.onScroll, false)
  },

  beforeDestroy () {
    this.$el.removeEventListener('scroll', this.onScroll, false)
  },

  methods: {
    getChildren (): VNode[] {
      return this.items.slice(
        this.firstToRender,
        this.lastToRender,
      ).map(this.genChild)
    },
    genChild (item: any, index: number) {
      const indexToRender = this.firstToRender + index
      let height
      let left
      let top
      let width
      if (this.horizontal) {
        left = convertToUnit(indexToRender * this.__itemSize)
        width = convertToUnit(this.__itemSize)
      } else {
        height = convertToUnit(this.__itemSize)
        top = convertToUnit(indexToRender * this.__itemSize)
      }

      return this.$createElement('div', {
        staticClass: 'v-virtual-scroll__item',
        style: { height, left, top, width },
        key: indexToRender,
      }, getSlot(this, 'default', { item, index }))
    },
    getFirst (): number {
      return Math.floor(this.scrollAmount / this.__itemSize)
    },
    getLast (first: number): number {
      const size = this.getSize()

      return first + Math.ceil(size / this.__itemSize) + 1
    },
    getSize (): number {
      const getWidth = () => parseInt(this.width || 0, 10) || this.$el.clientWidth
      const getHeight = () => parseInt(this.height || 0, 10) || this.$el.clientHeight

      return this.horizontal ? getWidth() : getHeight()
    },
    onScroll (e: Event): void {
      const target = e.currentTarget as HTMLElement

      this.scrollAmount = this.horizontal ? target.scrollLeft : target.scrollTop
      this.first = this.getFirst()
      this.last = this.getLast(this.first)
    },
  },

  render (h): VNode {
    const style = this.horizontal ? {
      height: '100%',
      width: convertToUnit((this.items.length * this.__itemSize)),
    } : {
      height: convertToUnit((this.items.length * this.__itemSize)),
    }

    const content = h('div', {
      staticClass: 'v-virtual-scroll__container',
      style,
    }, this.getChildren())

    return h('div', {
      staticClass: `v-virtual-scroll v-virtual-scroll--${this.horizontal ? 'horizontal' : 'vertical'}`,
      style: this.measurableStyles,
    }, [content])
  },
})
