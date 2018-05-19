import '../../stylus/components/_tables.styl'
import '../../stylus/components/_data-table.styl'

import DataIterable from '../../mixins/data-iterable'
import Resize from '../../directives/resize'

import Head from './mixins/head'
import Body from './mixins/body'
import Foot from './mixins/foot'
import Progress from './mixins/progress'

import {
  createSimpleFunctional,
  getObjectValueByPath
} from '../../util/helpers'

// Importing does not work properly
const VTableOverflow = createSimpleFunctional('v-table__overflow')

export default {
  name: 'v-data-table',

  data () {
    return {
      actionsClasses: 'v-datatable__actions',
      actionsRangeControlsClasses: 'v-datatable__actions__range-controls',
      actionsSelectClasses: 'v-datatable__actions__select',
      actionsPaginationClasses: 'v-datatable__actions__pagination',
      columnsWidth: []
    }
  },

  mixins: [DataIterable, Head, Body, Foot, Progress],

  directives: { Resize },

  props: {
    headers: {
      type: Array,
      default: () => []
    },
    headersLength: {
      type: Number
    },
    headerText: {
      type: String,
      default: 'text'
    },
    height: {
      type: Number
    },
    hideHeaders: Boolean,
    rowsPerPageText: {
      type: String,
      default: 'Rows per page:'
    },
    customFilter: {
      type: Function,
      default: (items, search, filter, headers) => {
        search = search.toString().toLowerCase()
        if (search.trim() === '') return items

        const props = headers.map(h => h.value)

        return items.filter(item => props.some(prop => filter(getObjectValueByPath(item, prop), search)))
      }
    }
  },

  computed: {
    classes () {
      return {
        'v-datatable v-table': true,
        'v-datatable--select-all': this.selectAll !== false,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    },
    filteredItems () {
      return this.filteredItemsImpl(this.headers)
    },
    headerColumns () {
      return this.headersLength || this.headers.length + (this.selectAll !== false)
    },
    minColumnsWidth () {
      if (this.$el === undefined) {
        return []
      }
      const $th = this.$el.querySelectorAll('thead tr:first-child th')
      const minColumnsWidth = []
      for (let i = 0; i < $th.length; i++) {
        let actualWidth = 0
        const $span = $th[i].querySelectorAll('span')
        actualWidth = $span[0].clientWidth
        const paddingLeft = parseFloat(getComputedStyle($th[i]).paddingLeft)
        const paddingRight = parseFloat(getComputedStyle($th[i]).paddingRight)
        minColumnsWidth.push(actualWidth + paddingLeft + paddingRight)
      }
      return minColumnsWidth
    }
  },

  methods: {
    hasTag (elements, tag) {
      return Array.isArray(elements) && elements.find(e => e.tag === tag)
    },
    genTR (children, data = {}) {
      return this.$createElement('tr', data, children)
    },
    getContainerWidth () {
      const el = this.$refs.tableRef
      if (el.scrollHeight > el.offsetHeight) {
        return el.clientWidth // exclude the width of scrollbar
      } else {
        return el.offsetWidth
      }
    },
    calculateColumnsWidth () {
      const actualColumnsWidth = []
      const autoWidthColumns = []

      let minAutoAssignedWidth = 0
      let autoAssignableWidth = this.getContainerWidth()

      for (let i = 0; i < this.headerColumns; i++) {
        // extract the width specified in header
        const headerIdx = (this.selectAll === false) ? i : i - 1
        const specifiedWidth = headerIdx >= 0 ? this.headers[headerIdx].width : undefined
        if (specifiedWidth === undefined) {
          // take the min columns width if not specified
          actualColumnsWidth.push(this.minColumnsWidth[i])
          minAutoAssignedWidth += actualColumnsWidth[i]
          autoWidthColumns.push(i) // for width adjustment when there is excessive width remaining
        } else {
          actualColumnsWidth.push(specifiedWidth)
          autoAssignableWidth -= specifiedWidth
        }
      }

      // min-width of those columns without width specified does not fully occupied the remaining space
      // need to adjust the width of those column
      const excessiveWidth = autoAssignableWidth - minAutoAssignedWidth
      if (excessiveWidth > 0 && autoWidthColumns.length > 0) {
        const widthIncrement = parseInt(excessiveWidth / autoWidthColumns.length)
        for (let i = 0; i < autoWidthColumns.length; i++) {
          if (i === 0) {
            actualColumnsWidth[autoWidthColumns[i]] += excessiveWidth - widthIncrement * (autoWidthColumns.length - 1)
          } else {
            actualColumnsWidth[autoWidthColumns[i]] += widthIncrement
          }
        }
      }
      return actualColumnsWidth
    },
    initColumnWidth () {
      if (!this.headersLength || (this.headers && this.headers.length === this.headersLength)) {
        this.columnsWidth = this.calculateColumnsWidth()
      }
    },
    onResize () {
      this.initColumnWidth()
    }
  },

  created () {
    const firstSortable = this.headers.find(h => (
      !('sortable' in h) || h.sortable)
    )

    this.defaultPagination.sortBy = !this.disableInitialSort && firstSortable
      ? firstSortable.value
      : null

    this.initPagination()
  },

  mounted () {
    this.initColumnWidth()
  },

  render (h) {
    const tableOverflow = h(VTableOverflow, {
      ref: 'tableRef',
      directives: [{ name: 'resize', value: this.onResize }],
      style: { height: this.height ? `${this.height}px` : undefined }
    }, [
      this.genFixedHeader(),
      h('table', {
        'class': this.classes
      }, [
        this.genColgroup(),
        this.genDefaultHeader(),
        this.genTBody(),
        this.genTFoot()
      ])
    ])
    return h('div', [
      tableOverflow,
      this.genActionsFooter()
    ])
  }
}
