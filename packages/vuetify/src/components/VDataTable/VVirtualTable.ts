import './VVirtualTable.sass'

import { VNode } from 'vue'
import { convertToUnit } from '../../util/helpers'
import VSimpleTable from './VSimpleTable'

export default VSimpleTable.extend({
  name: 'v-virtual-table',

  props: {
    bufferLength: {
      type: Number,
      default: 10
    },
    headerHeight: {
      type: Number,
      default: 48
    },
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
      return (this.itemsLength * this.rowHeight) + this.headerHeight
    },
    startIndex (): number {
      return Math.max(0, Math.ceil((this.scrollTop - this.bufferHeight) / this.rowHeight))
    },
    offsetTop (): number {
      return Math.max(0, this.startIndex * this.rowHeight)
    },
    visibleRows (): number {
      return Math.ceil(parseInt(this.height, 10) / this.rowHeight) + this.bufferLength
    },
    stopIndex (): number {
      return Math.min(this.startIndex + this.visibleRows, this.itemsLength)
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
        staticClass: 'v-virtual-table__scroller',
        style: {
          top: `${this.scrollTop}px`
        },
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
        staticClass: 'v-virtual-table__wrapper',
        style: {
          height: convertToUnit(this.height)
        },
        on: {
          mousewheel: (e: WheelEvent) => {
            const scroller = this.$refs.scroller as Element
            scroller.scrollTop = Math.max(0, Math.min(this.totalHeight, this.scrollTop + e.deltaY))
          }
        }
      }, [
        this.$createElement('table', [
          this.$slots['body.before'],
          this.genBody(),
          this.$slots['body.after']
        ]),
        this.genScroller()
      ])
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-data-table v-virtual-table',
      class: this.classes
    }, [
      this.$slots.top,
      this.genWrapper(),
      this.$slots.bottom
    ])
  }
})
