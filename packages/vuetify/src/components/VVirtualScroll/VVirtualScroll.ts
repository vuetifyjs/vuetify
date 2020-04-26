import './VVirtualScroll.sass'

// Types
import Vue, { VNode } from 'vue'

// Helpers
import { getSlot } from '../../util/helpers'

export default Vue.extend({
  name: 'v-virtual-scroll',

  props: {
    height: {
      type: String,
      default: '100%',
    },
    itemHeight: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    bench: 5,
    first: 0,
    last: 0,
    scrollTop: 0,
  }),

  computed: {
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
    getChildrenVNodes (h: Function): VNode[] {
      const vNodes: any[] = this.items.slice(this.firstToRender, this.lastToRender)
      return vNodes.map((item, i): VNode => h('div', {
        staticClass: 'v-virtual-scroll__item',
        style: {
          top: (this.firstToRender + i) * this.itemHeight + 'px',
        },
      }, getSlot(this, 'default', item)))
    },
    getFirst (): number {
      return Math.floor(this.scrollTop / this.itemHeight)
    },
    getLast (first: number): number {
      return first + Math.ceil(this.$el.clientHeight / this.itemHeight)
    },
    onScroll (e: Event): void {
      const target = e.currentTarget as HTMLElement
      this.scrollTop = target.scrollTop
      this.first = this.getFirst()
      this.last = this.getLast(this.first)
    },
  },

  render (h): VNode {
    const childrenVNodes = this.getChildrenVNodes(h)

    const parentVNode = h('div', {
      staticClass: 'v-virtual-scroll__container',
      style: {
        height: (this.items.length * this.itemHeight) + 'px',
      },
    }, childrenVNodes)

    const scrollVNode = h('div', {
      staticClass: 'v-virtual-scroll',
      style: {
        height: this.height,
      },
    }, [parentVNode])

    return scrollVNode
  },
})
