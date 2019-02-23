import Vue, { VNode } from 'vue'
import { convertToUnit } from '../../util/helpers'

export default Vue.extend({
  name: 'v-data-table-virtual',

  props: {
    bufferLength: {
      type: Number,
      default: 10
    },
    headerHeight: {
      type: Number,
      default: 48
    },
    height: Number,
    itemsLength: Number,
    rowHeight: {
      type: Number,
      default: 48
    }
  },

  data: () => ({
    scrollTop: 0
  }),

  computed: {
    bufferHeight (): number {
      return (this.bufferLength * this.rowHeight) / 2
    },
    totalHeight (): number {
      const headerHeight = this.$slots.header ? this.headerHeight : 0
      return (this.itemsLength * this.rowHeight) + headerHeight
    },
    startIndex (): number {
      return Math.max(0, Math.ceil((this.scrollTop - this.bufferHeight) / this.rowHeight))
    },
    offsetTop (): number {
      return Math.max(0, this.startIndex * this.rowHeight)
    },
    visibleRows (): number {
      return Math.ceil(Number(this.height) / this.rowHeight) + this.bufferLength
    },
    stopIndex (): number {
      return this.startIndex + this.visibleRows
    },
    offsetBottom (): number {
      return Math.max(0, ((this.itemsLength - this.visibleRows) * this.rowHeight) - this.offsetTop)
    }
  },

  watch: {
    scrollTop: 'setScrollTop'
  },

  mounted () {
    this.setScrollTop()
  },

  methods: {
    createStyleHeight (height: number) {
      return {
        height: `${height}px`
      }
    },
    setScrollTop () {
      const wrapper = this.$refs.wrapper as Element
      wrapper.scrollTop = this.scrollTop
    },
    genScroller () {
      return this.$createElement('div', {
        ref: 'scroller',
        staticClass: 'v-data-table-virtual__scroller',
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
      return this.$createElement('tbody', [
        this.$createElement('tr', { style: this.createStyleHeight(this.offsetTop) }),
        this.$scopedSlots.items ? this.$scopedSlots.items({ start: this.startIndex, stop: this.stopIndex }) : null,
        this.$createElement('tr', { style: this.createStyleHeight(this.offsetBottom) })
      ])
    },
    genWrapper () {
      return this.$createElement('div', {
        ref: 'wrapper',
        staticClass: 'v-data-table-virtual__wrapper',
        on: {
          mousewheel: (e: WheelEvent) => {
            const scroller = this.$refs.scroller as Element
            scroller.scrollTop = Math.max(0, Math.min(this.totalHeight, this.scrollTop + e.deltaY))
          }
        }
      }, [
        this.$createElement('table', [
          this.$slots.caption,
          this.$slots.header,
          this.genBody()
        ])
      ])
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-data-table v-data-table-virtual',
      style: {
        height: convertToUnit(this.height)
      }
    }, [
      this.genWrapper(),
      this.genScroller(),
      this.$slots.footer
    ])
  }
})
