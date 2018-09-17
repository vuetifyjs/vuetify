import Vue, { VNode } from 'vue'
import VDataTable from './VDataTable'

import VCellCheckbox from './VCellCheckbox'
import VIcon from '../VIcon'
import mixins from '../../util/mixins'

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  name: 'v-data-header',

  inject: ['dataTable'],

  props: {
    showSelect: Boolean,
    sortIcon: {
      type: String,
      default: '$vuetify.icons.sort'
    }
  },

  methods: {
    genSelectAll (classes: string | string[] = []) {
      return this.$createElement(VCellCheckbox, {
        class: classes,
        props: {
          head: true,
          inputValue: this.dataTable.everyItem
        },
        attrs: {
          indeterminate: !this.dataTable.everyItem && this.dataTable.someItems
        },
        on: {
          change: () => this.dataTable.toggleSelectAll()
        }
      })
    },
    genSortIcon () {
      return this.$createElement(VIcon, [this.sortIcon])
    }
  },

  render (): VNode {
    const headers = this.dataTable.headers.map(c => {
      if (c.type === 'select-all') return this.genSelectAll(c.class)

      const sortable = c.sortable == null || c.sortable

      const classes = {
        [`text-xs-${c.align || 'left'}`]: true
      }

      const children = [
        this.$createElement('span', [c.text])
      ]

      const listeners: any = {}

      if (sortable) {
        listeners['click'] = () => {
          this.dataTable.resetExpanded()
          this.dataTable.sort(c.value)
        }

        const sortIndex = this.dataTable.options.sortBy.findIndex(k => k === c.value)
        const beingSorted = sortIndex >= 0
        const isDesc = this.dataTable.options.sortDesc[sortIndex]

        classes['sortable'] = true
        classes['active'] = beingSorted
        classes['asc'] = beingSorted && !isDesc
        classes['desc'] = beingSorted && isDesc

        if (c.align === 'end') children.unshift(this.genSortIcon())
        else children.push(this.genSortIcon())

        this.dataTable.multiSort && beingSorted && children.push(this.$createElement('span', { class: 'badge' }, [String(sortIndex + 1)]))
      }

      const styles: any = {}

      if (c.width) {
        styles.width = c.width
      }

      return this.$createElement('th', {
        class: classes,
        style: styles,
        on: listeners
      }, children)
    })

    if (this.showSelect) headers.unshift(this.genSelectAll())

    return this.$createElement('thead', {
      class: 'v-data-header'
    }, [this.$createElement('tr', headers)])
  }
})
