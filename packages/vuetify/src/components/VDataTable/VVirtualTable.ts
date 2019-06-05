import './VVirtualTable.sass'

// Components
import VSimpleTable from './VSimpleTable'

// Types
import Vue, { VNode, VNodeChildren } from 'vue'
import { PropValidator } from 'vue/types/options'
import mixins, { ExtractVue } from '../../util/mixins'

// Helpers
import { convertToUnit, debounce } from '../../util/helpers'

interface options extends Vue {
  cachedItems: VNodeChildren
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<typeof VSimpleTable>
/* eslint-enable indent */
>(
  VSimpleTable
  /* @vue/component */
).extend({
  name: 'v-virtual-table',

  props: {
    chunkSize: {
      type: Number,
      default: 25,
    },
    headerHeight: {
      type: Number,
      default: 48,
    },
    items: {
      type: Array,
      default: () => ([]),
    } as PropValidator<any[]>,
    rowHeight: {
      type: Number,
      default: 48,
    },
  },

  data: () => ({
    scrollTop: 0,
    oldChunk: 0,
    scrollDebounce: null as any,
    invalidateCache: false,
  }),

  computed: {
    itemsLength (): number {
      return this.items.length
    },
    totalHeight (): number {
      return (this.itemsLength * this.rowHeight) + this.headerHeight
    },
    topIndex (): number {
      return Math.floor(this.scrollTop / this.rowHeight)
    },
    chunkIndex (): number {
      return Math.floor(this.topIndex / this.chunkSize)
    },
    startIndex (): number {
      return Math.max(0, (this.chunkIndex * this.chunkSize) - this.chunkSize)
    },
    offsetTop (): number {
      return Math.max(0, this.startIndex * this.rowHeight)
    },
    stopIndex (): number {
      return Math.min(this.startIndex + (this.chunkSize * 3), this.itemsLength)
    },
    offsetBottom (): number {
      return Math.max(0, (this.itemsLength - this.stopIndex - this.startIndex) * this.rowHeight)
    },
  },

  watch: {
    chunkIndex (newValue, oldValue) {
      this.oldChunk = oldValue
    },
    items () {
      this.cachedItems = null
      ;(this.$refs.table as HTMLElement).scrollTop = 0
    },
  },

  created () {
    this.cachedItems = null
  },

  mounted () {
    this.scrollDebounce = debounce(this.onScroll, 50)

    const table = this.$refs.table as Element
    table.addEventListener('scroll', this.scrollDebounce, { passive: true })
  },

  beforeDestroy () {
    const table = this.$refs.table as Element
    table.removeEventListener('scroll', this.scrollDebounce)
  },

  methods: {
    createStyleHeight (height: number) {
      return {
        height: `${height}px`,
      }
    },
    genBody () {
      if (this.cachedItems === null || this.chunkIndex !== this.oldChunk) {
        this.cachedItems = this.genItems()
        this.oldChunk = this.chunkIndex
      }

      return this.$createElement('tbody', [
        this.$createElement('tr', { style: this.createStyleHeight(this.offsetTop) }),
        this.cachedItems,
        this.$createElement('tr', { style: this.createStyleHeight(this.offsetBottom) }),
      ])
    },
    genItems () {
      return this.$scopedSlots.items!({ items: this.items.slice(this.startIndex, this.stopIndex) })
    },
    onScroll (e: Event) {
      const target = e.target as Element
      this.scrollTop = target.scrollTop
    },
    genTable () {
      return this.$createElement('div', {
        ref: 'table',
        staticClass: 'v-virtual-table__table',
      }, [
        this.$createElement('table', [
          this.$slots['body.before'],
          this.genBody(),
          this.$slots['body.after'],
        ]),
      ])
    },
    genWrapper () {
      return this.$createElement('div', {
        staticClass: 'v-virtual-table__wrapper',
        style: {
          height: convertToUnit(this.height),
        },
      }, [
        this.genTable(),
      ])
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-data-table v-virtual-table',
      class: this.classes,
    }, [
      this.$slots.top,
      this.genWrapper(),
      this.$slots.bottom,
    ])
  },
})
