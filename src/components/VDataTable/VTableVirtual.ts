import { VNode } from 'vue'
import { convertToUnit } from '../../util/helpers'
import VTableBody from './VTableBody'
import VTable from './VTable'
import VTableRegular from './VTableRegular'

export default VTableRegular.extend({
  name: 'v-table-virtual',

  data: () => ({
    scrollTop: 0,
    startIndex: 0,
    visibleRows: 0,
    offsetTop: 0,
    offsetBottom: 0,
    buffer: 10
  }),

  watch: {
    scrollTop: 'calculate'
  },

  mounted () {
    this.calculate()
  },

  computed: {
    items (): any[] {
      return this.dataTable.computedItems
    },
    height (): number {
      return Number(this.dataTable.height)
    },
    rowHeight (): number {
      const { dense, isMobile, headers } = this.dataTable
      const base = dense ? 24 : 48
      return isMobile ? base * headers.length : base
    },
    visibleItems (): any[] {
      return this.items.slice(this.startIndex, this.startIndex + this.visibleRows)
    },
    bufferHeight (): number {
      return (this.buffer * this.rowHeight) / 2
    },
    totalHeight (): number {
      return this.items.length * this.rowHeight
    }
  },

  methods: {
    createStyleHeight (height: number) {
      return {
        height: `${height}px`
      }
    },
    calculateOffsetTop () {
      return Math.max(0, this.startIndex * this.rowHeight)
    },
    calculateStartIndex () {
      return Math.max(0, Math.ceil((this.scrollTop - this.bufferHeight) / this.rowHeight))
    },
    calculateOffsetBottom () {
      return ((this.items.length - this.visibleRows) * this.rowHeight) - this.offsetTop
    },
    calculate () {
      this.startIndex = this.calculateStartIndex()
      this.offsetTop = this.calculateOffsetTop()
      this.visibleRows = Math.ceil(Number(this.height) / this.rowHeight) + this.buffer
      this.offsetBottom = this.calculateOffsetBottom()
      const wrapper = this.$refs.wrapper as Element
      wrapper.scrollTop = this.scrollTop
    },
    genScroller () {
      return this.$createElement('div', {
        ref: 'scroller',
        staticClass: 'v-table-virtual__scroller',
        on: {
          scroll: (e: Event) => {
            const target = e.target as Element
            this.scrollTop = target.scrollTop
          }
        }
      }, [
        this.$createElement('div', {
          style: this.createStyleHeight(this.totalHeight)
        })
      ])
    },
    genBody () {
      return this.$createElement(VTableBody, {
        props: {
          headers: this.dataTable.computedHeaders,
          items: this.visibleItems
        }
      }, [
        this.$createElement('tr', {
          slot: 'prepend',
          style: this.createStyleHeight(this.offsetTop)
        }),
        this.$createElement('tr', {
          slot: 'append',
          style: this.createStyleHeight(this.offsetBottom)
        })
      ])
    },
    genWrapper () {
      return this.$createElement(VTable, {
        ref: 'wrapper',
        staticClass: 'v-table-virtual__wrapper',
        on: {
          mousewheel: (e: WheelEvent) => {
            const scroller = this.$refs.scroller as Element
            scroller.scrollTop = Math.max(0, Math.min(this.totalHeight, this.scrollTop + e.deltaY))
          }
        }
      }, [
        this.$slots.prepend,
        this.genHeaders(),
        this.genBody(),
        this.$slots.append
      ])
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-table-virtual__container',
      style: {
        height: convertToUnit(this.height)
      }
    }, [
      this.genWrapper(),
      this.genScroller()
    ])
  }
})
