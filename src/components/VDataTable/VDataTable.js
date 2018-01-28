import '../../stylus/components/_tables.styl'
import '../../stylus/components/_data-table.styl'

import DataIterable from '../../mixins/data-iterable'
import Resize from '../../directives/resize'

import VProgressLinear from '../VProgressLinear'

import Head from './mixins/head'
import Body from './mixins/body'
import Foot from './mixins/foot'
import Progress from './mixins/progress'

import {
  createSimpleFunctional,
  getObjectValueByPath
} from '../../util/helpers'

export default {
  name: 'v-data-table',

  components: {
    VProgressLinear,
    // Importing does not work properly
    'v-table-overflow': createSimpleFunctional('table__overflow')
  },

  data () {
    return {
      actionsClasses: 'datatable__actions',
      actionsRangeControlsClasses: 'datatable__actions__range-controls',
      actionsSelectClasses: 'datatable__actions__select',
      actionsPaginationClasses: 'datatable__actions__pagination',
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
    headerText: {
      type: String,
      default: 'text'
    },
    height: {
      type: Number
    },
    minColumnWidth: {
      type: Number,
      default: 100
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
        'datatable table': true,
        'datatable--select-all': this.selectAll !== false,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    },
    filteredItems () {
      return this.filteredItemsImpl(this.headers)
    }
  },

  methods: {
    needsTR (row) {
      return row.length && row.find(c => c.tag === 'td' || c.tag === 'th')
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
    computedWidth (autoAssignedWidth, unassignedCount) {
      const computedWidth = parseInt(autoAssignedWidth * 1.0 / unassignedCount)
      return computedWidth > this.minColumnWidth ? computedWidth : this.minColumnWidth
    },
    calculateColumnWidth () {
      const actualColumnsWidth = this.headers.map(o => o.width)
      let autoAssignedWidth = this.getContainerWidth()
      let lastUnassignedIdx = -1
      let unassignedCount = 0
      for (let i = 0; i < actualColumnsWidth.length; i++) {
        if (actualColumnsWidth[i] === undefined) {
          lastUnassignedIdx = i
          unassignedCount++
        } else {
          autoAssignedWidth -= actualColumnsWidth[i]
        }
      }

      const computedWidth = this.computedWidth(autoAssignedWidth, unassignedCount)
      let remain = autoAssignedWidth
      for (let i = 0; i < actualColumnsWidth.length; i++) {
        if (actualColumnsWidth[i] === undefined) {
          if (i === lastUnassignedIdx && remain > this.minColumnWidth) {
            actualColumnsWidth[i] = remain
          } else {
            actualColumnsWidth[i] = computedWidth
          }
          remain -= actualColumnsWidth[i]
        }
      }

      this.columnsWidth = actualColumnsWidth
    },
    onResize () {
      this.calculateColumnWidth()
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
    this.calculateColumnWidth()
  },

  render (h) {
    const tableOverflow = h('v-table-overflow', {
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
