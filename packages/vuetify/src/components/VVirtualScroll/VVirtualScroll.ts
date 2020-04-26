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
    height: {
      type: [Number, String],
      default: '100%',
    },
    itemHeight: {
      type: [Number, String],
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    bench: 5,
    first: 0,
    last: 0,
    scrollTop: 0,
  }),

  computed: {
    __itemHeight (): number {
      return parseInt(this.itemHeight)
    },
    firstToRender (): number {
      return Math.max(0, this.first - this.bench)
    },
    lastToRender (): number {
      return Math.min(this.items.length, this.last + this.bench)
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
    genChild (item: any, i: number) {
      const top = convertToUnit((this.firstToRender + i) * this.__itemHeight)

      return this.$createElement('div', {
        staticClass: 'v-virtual-scroll__item',
        style: { top },
      }, getSlot(this, 'default', item))
    },
    getFirst (): number {
      return Math.floor(this.scrollTop / this.__itemHeight)
    },
    getLast (first: number): number {
      return first + Math.ceil(this.$el.clientHeight / this.__itemHeight)
    },
    onScroll (e: Event): void {
      const target = e.currentTarget as HTMLElement

      this.scrollTop = target.scrollTop
      this.first = this.getFirst()
      this.last = this.getLast(this.first)
    },
  },

  render (h): VNode {
    const content = h('div', {
      staticClass: 'v-virtual-scroll__container',
      style: {
        height: convertToUnit((this.items.length * this.__itemHeight)),
      },
    }, this.getChildren())

    return h('div', {
      staticClass: 'v-virtual-scroll',
      style: this.measurableStyles,
    }, [content])
  },
})
