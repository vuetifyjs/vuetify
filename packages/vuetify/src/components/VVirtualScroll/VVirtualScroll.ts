import './VVirtualScroll.sass'

// Types
import Vue, { VNode } from 'vue'

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

  mounted (): void {
    this.last = this.getLast(0)
    this.$el.addEventListener('scroll', this.onScroll, false)
  },

  beforeDestroy (): void {
    this.$el.removeEventListener('scroll', this.onScroll, false)
  },

  methods: {
    getChildrenVNodes (h: Function): VNode[] {
      const vNodes: any[] = this.items.slice(this.firstToRender, this.lastToRender)
      return vNodes.map((item: any, i: number): VNode => h('div', {
        staticClass: 'v-virtual-scroll__item',
        style: {
          top: (this.firstToRender + i) * this.itemHeight + 'px',
        },
      }, this.$scopedSlots.default && this.$scopedSlots.default(item)))
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

  render (h: Function): VNode {
    const childrenVNodes: VNode[] = this.getChildrenVNodes(h)
    const parentVNode: VNode = h('div', {
      staticClass: 'v-virtual-scroll__container',
      style: {
        height: (this.items.length * this.itemHeight) + 'px',
      },
    }, childrenVNodes)
    const scrollVNode: VNode = h('div', {
      staticClass: 'v-virtual-scroll',
      style: {
        height: this.height,
      },
    }, [parentVNode])
    return scrollVNode
  },
})
