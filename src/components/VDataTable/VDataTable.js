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
      columnsWidth: [],
      scrollbarWidth: 0
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
      default: '$vuetify.lang.dataTable.rowsPerPageText'
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
        minColumnsWidth.push(this.extractMinWidthFromTableHeader($th[i]))
      }
      return minColumnsWidth
    },
    fixedHeaderEnabled () {
      return this.height !== undefined
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
    extractMinWidthFromTableHeader ($th) {
      const $span = $th.querySelectorAll('span')
      let actualWidth = $span[0].clientWidth
      const paddingLeft = parseFloat(getComputedStyle($th).paddingLeft)
      const paddingRight = parseFloat(getComputedStyle($th).paddingRight)
      return actualWidth + paddingLeft + paddingRight
    },
    calculateScrollbarWidth () {
      const el = this.$refs.tableRef
      if (el.scrollHeight > el.offsetHeight) {
        return el.offsetWidth - el.clientWidth
      }
      return 0
    },
    fixedHeaderScroll () {
      const $tableBody = this.$el.querySelector('.v-table__overflow')
      const $tableHeader = this.$el.querySelector('.v-table__header-wrapper')
      $tableBody.addEventListener('scroll', function (e) {
        $tableHeader.scrollLeft = this.scrollLeft
      })
    },
    autoWidthColumnCount () {
      return this.headers.reduce((total, header) => {
        return header.width ? total : total + 1
      }, 0)
    },
    calculateAutoAssignableWidth () {
      const autoAssignableWidth = this.headers.reduce((remaining, header) => {
        return header.width ? remaining - header.width : remaining
      }, this.getContainerWidth())
      return (this.selectAll === true) ? autoAssignableWidth - this.minColumnsWidth[0] : autoAssignableWidth
    },
    calculateMinAutoAssignedWidth () {
      return this.headers.reduce((minAutoAssignedWidth, header, index) => {
        const minWidth = (this.selectAll === true) ? this.minColumnsWidth[index + 1] : this.minColumnsWidth[index]
        return header.width ? minAutoAssignedWidth : minAutoAssignedWidth + minWidth
      }, 0)
    },
    calculateWidthIncrement () {
      const autoWidthColumnCount = this.autoWidthColumnCount()
      const minAutoAssignedWidth = this.calculateMinAutoAssignedWidth()
      const autoAssignableWidth = this.calculateAutoAssignableWidth()
      const excessiveWidth = autoAssignableWidth - minAutoAssignedWidth
      return (excessiveWidth > 0 && autoWidthColumnCount > 0) ? parseInt(excessiveWidth / autoWidthColumnCount) : 0
    },
    columnsWidthRefinement (actualColumnsWidth) {
      const remaining = this.getContainerWidth() - actualColumnsWidth.reduce((total, width) => total + width, 0)
      if (remaining > 0) {
        actualColumnsWidth[actualColumnsWidth.length - 1] += remaining
      }
      return actualColumnsWidth
    },
    calculateColumnsWidth () {
      // column for the select checkbox will not be expanded, minimum width is taken
      const actualColumnsWidth = (this.selectAll === true) ? [this.minColumnsWidth[0]] : []

      const autoWidthIncrement = this.calculateWidthIncrement()
      for (let i = 0; i < this.headers.length; i++) {
        const specifiedWidth = this.headers[i].width ? this.headers[i].width : this.minColumnsWidth[i] + autoWidthIncrement
        actualColumnsWidth.push(specifiedWidth)
      }

      return this.columnsWidthRefinement(actualColumnsWidth)
    },
    initColumnWidth () {
      this.scrollbarWidth = this.calculateScrollbarWidth()
      this.columnsWidth = this.calculateColumnsWidth()
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
    this.fixedHeaderScroll()
    this.initColumnWidth()
  },

  render (h) {
    const tableOverflow = h(VTableOverflow, {
      ref: 'tableRef',
      directives: [{ name: 'resize', value: this.onResize }],
      style: { height: this.height ? `${this.height}px` : undefined }
    }, [
      h('table', {
        'class': this.classes
      }, [
        this.genColgroup(),
        this.genDefaultHeader(),
        this.genTBody()
      ])
    ])
    return h('div', {
      class: { 'v-table__wrapper': true }
    }, [
      this.genFixedHeader(),
      tableOverflow,
      this.genTFoot(),
      this.genActionsFooter()
    ])
  }
}
