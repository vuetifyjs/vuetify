// Styles
import './VVirtualScroll.sass'

// Mixins
import Measurable from '../../mixins/measurable'

// Directives
import Scroll from '../../directives/scroll'

// Utilities
import {
  convertToUnit,
  getSlot,
} from '../../util/helpers'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

export default Measurable.extend({
  name: 'v-virtual-scroll',

  directives: { Scroll },

  props: {
    bench: {
      type: [Number, String],
      default: 0,
    },
    itemHeight: {
      type: [Number, String],
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    } as PropValidator<any[]>,
  },

  data: () => ({
    first: 0,
    last: 0,
    scrollTop: 0,
  }),

  computed: {
    __bench (): number {
      return parseInt(this.bench, 10)
    },
    __itemHeight (): number {
      return parseInt(this.itemHeight, 10)
    },
    firstToRender (): number {
      return Math.max(0, this.first - this.__bench)
    },
    lastToRender (): number {
      return Math.min(this.items.length, this.last + this.__bench)
    },
  },

  watch: {
    height: 'onScroll',
    itemHeight: 'onScroll',
  },

  mounted () {
    this.last = this.getLast(0)
  },

  methods: {
    getChildren (): VNode[] {
      return this.items.slice(
        this.firstToRender,
        this.lastToRender,
      ).map(this.genChild)
    },
    genChild (item: any, index: number) {
      index += this.firstToRender

      const top = convertToUnit(index * this.__itemHeight)

      return this.$createElement('div', {
        staticClass: 'v-virtual-scroll__item',
        style: { top },
        key: index,
      }, getSlot(this, 'default', { index, item }))
    },
    getFirst (): number {
      return Math.floor(this.scrollTop / this.__itemHeight)
    },
    getLast (first: number): number {
      const height = parseInt(this.height || 0, 10) || this.$el.clientHeight

      return first + Math.ceil(height / this.__itemHeight)
    },
    onScroll () {
      this.scrollTop = this.$el.scrollTop
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
      directives: [{
        name: 'scroll',
        modifiers: { self: true },
        value: this.onScroll,
      }],
      on: this.$listeners,
    }, [content])
  },
})
