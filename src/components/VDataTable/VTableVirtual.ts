import Vue, { VNode } from 'vue'
import VRowFunctional from './VRowFunctional'
import mixins from '../../util/mixins'
import { VDataTable } from '.'
import { convertToUnit } from '../../util/helpers'

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  name: 'v-table-virtual',

  inject: ['dataTable'],

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
    rowHeight (): number {
      const base = this.dataTable.dense ? 24 : 48
      return this.dataTable.isMobile ? base * this.dataTable.headers.length : base
    },
    visibleItems (): any[] {
      return this.dataTable.computedItems.slice(this.startIndex, this.startIndex + this.visibleRows)
    },
    topStyles (): object {
      return {
        height: `${this.offsetTop}px`
      }
    },
    bottomStyles (): object {
      return {
        height: `${this.offsetBottom}px`
      }
    },
    bufferHeight (): number {
      return (this.buffer * this.rowHeight) / 2
    },
    totalHeight (): number {
      return this.dataTable.computedItems.length * this.rowHeight
    }
  },

  methods: {
    calculateOffsetTop () {
      return Math.max(0, this.startIndex * this.rowHeight)
    },
    calculateStartIndex () {
      return Math.max(0, Math.ceil((this.scrollTop - this.bufferHeight) / this.rowHeight))
    },
    calculateOffsetBottom () {
      return ((this.dataTable.computedItems.length - this.visibleRows) * this.rowHeight) - this.offsetTop
    },
    calculate () {
      this.startIndex = this.calculateStartIndex()
      this.offsetTop = this.calculateOffsetTop()
      this.visibleRows = Math.ceil(Number(this.dataTable.height) / this.rowHeight) + this.buffer
      this.offsetBottom = this.calculateOffsetBottom()
      const wrapper = this.$refs.wrapper as Element
      wrapper.scrollTop = this.scrollTop
    },
    genItems () {
      const items = this.visibleItems.map(item => this.$createElement(VRowFunctional, {
        props: {
          headers: this.dataTable.computedHeaders,
          item,
          mobile: this.dataTable.isMobile
        }
      }))

      items.unshift(this.$createElement('tr', {
        style: this.topStyles
      }))

      items.push(this.$createElement('tr', {
        style: this.bottomStyles
      }))

      return items
    },
    genScroller () {
      return this.$createElement('div', {
        ref: 'scroller',
        staticClass: 'v-data-table__scroller',
        on: {
          scroll: (e: Event) => {
            const target = e.target as Element
            this.scrollTop = target.scrollTop
          }
        }
      }, [
        this.$createElement('div', {
          style: {
            height: `${this.totalHeight}px`
          }
        })
      ])
    },
    genContainer () {
      return this.$createElement('div', {
        staticClass: 'v-data-table__container',
        style: {
          height: convertToUnit(this.dataTable.height)
        }
      }, [
        this.genWrapper(),
        this.genScroller()
      ])
    },
    genWrapper () {
      return this.$createElement('div', {
        ref: 'wrapper',
        staticClass: 'v-data-table__wrapper',
        on: {
          mousewheel: (e: WheelEvent) => {
            this.scrollTop = Math.max(0, Math.min(this.totalHeight, this.scrollTop + e.deltaY))
            const scroller = this.$refs.scroller as Element
            scroller.scrollTop = this.scrollTop
          }
        }
      }, [this.$createElement('table', [this.genItems()])])
    }
  },

  render (h): VNode {
    return this.genContainer()
  }
})
