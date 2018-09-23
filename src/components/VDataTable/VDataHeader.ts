import Vue, { VNode } from 'vue'
import VDataTable from './VDataTable'

import VCellCheckbox from './VCellCheckbox'
import VIcon from '../VIcon'
import mixins from '../../util/mixins'
import VProgressLinear from '../VProgressLinear'

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  name: 'v-data-header',

  inject: ['dataTable'],

  props: {
    sortIcon: {
      type: String,
      default: '$vuetify.icons.sort'
    }
  },

  data: () => ({
    resize: {
      column: -1,
      start: -1
    }
  }),

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
    },
    genLoading () {
      const progress = this.$createElement(VProgressLinear, {
        props: {
          // color: this.dataTable.loading === true
          //   ? 'primary'
          //   : this.dataTable.loading,
          height: 2,
          indeterminate: true
        }
      })

      const th = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: this.dataTable.headersLength
        }
      }, [progress])

      return this.$createElement('tr', {
        staticClass: 'v-data-header__progress'
      }, [th])
    },
    genGroupHandle (value: any) {
      return this.$createElement('span', {
        on: {
          click: (e: MouseEvent) => {
            e.stopPropagation()
            this.dataTable.options.groupBy = value
          }
        }
      }, ['group'])
    }
  },

  render (h): VNode {
    const headers = this.dataTable.computedHeaders.map((c, i) => {
      if (c.value === 'dataTable.select') return this.genSelectAll()

      const classes = {
        [`text-xs-${c.align || 'left'}`]: true
      }
      const children = [
        this.$scopedSlots.text ? this.$scopedSlots.text({ header: c }) : h('span', [c.text])
      ]
      const listeners: any = {}

      if (c.sortable || !c.hasOwnProperty('sortable')) {
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

        this.dataTable.multiSort && beingSorted && children.push(h('span', { class: 'badge' }, [String(sortIndex + 1)]))
      }

      const groupable = this.dataTable.options.groupBy !== undefined

      if (groupable) {
        children.push(this.genGroupHandle(c.value))
      }

      if (c.resizable) {
        children.push(h('div', {
          staticClass: 'resize-handle',
          on: {
            click: (e: MouseEvent) => {
              e.stopPropagation()
            },
            dblclick: (e: MouseEvent) => {
              e.stopPropagation()
              this.$set(this.dataTable.widths, i, 1)
              this.$nextTick(() => {
                this.dataTable.calcWidths()
              })
            },
            mousedown: (e: MouseEvent) => {
              e.stopPropagation()
              this.resize = { column: i, start: e.clientX }
            }
          }
        }))
      }

      return h('th', {
        class: classes,
        on: listeners
      }, children)
    })

    const children = [h('tr', {
      on: {
        mousemove: (e: MouseEvent) => {
          if (this.resize.column < 0) return
          const amount = this.resize.start - e.clientX

          for (let i = this.resize.column; i <= this.resize.column + 1; i++) {
            if (i >= headers.length) continue
            const currentWidth = this.dataTable.widths[i]
            if (i === this.resize.column) {
              this.$set(this.dataTable.widths, i, currentWidth - amount)
            } else {
              this.$set(this.dataTable.widths, i, currentWidth + amount)
            }
          }

          this.resize.start = e.clientX
        },
        mouseup: (e: MouseEvent) => {
          this.resize = { column: -1, start: -1 }
        }
      }
    }, headers)]

    if (this.dataTable.loading !== false) {
      children.push(this.genLoading())
    }

    return h('thead', {
      class: 'v-data-header'
    }, children)
  }
})
