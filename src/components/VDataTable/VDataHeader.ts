import Vue, { VNode } from 'vue'
import VDataTable from './VDataTable'

// import VCellCheckbox from './VCellCheckbox'
import VIcon from '../VIcon'
import mixins from '../../util/mixins'
import VProgressLinear from '../VProgressLinear'
import { VSimpleCheckbox } from '../VCheckbox'

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
      return this.$createElement(VSimpleCheckbox, {
        staticClass: 'v-data-table__checkbox',
        props: {
          value: this.dataTable.everyItem
        },
        attrs: {
          indeterminate: !this.dataTable.everyItem && this.dataTable.someItems
        },
        on: {
          input: () => this.dataTable.toggleSelectAll()
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
          colspan: this.dataTable.computedHeaders.length
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
    },
    genResizeHandle (i: number) {
      return this.$createElement('div', {
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
      })
    }
  },

  render (h): VNode {
    const headers = this.dataTable.computedHeaders.map((c, i) => {
      const classes = {
        [`text-xs-${c.align || 'left'}`]: true
      }
      if (c.class) {
        Array.isArray(c.class) ? c.class.forEach(c => classes[c] = true) : classes[c.class] = true
      }
      const children = []

      if (c.value === 'dataTableSelect') {
        children.push(this.genSelectAll())
      } else {
        children.push(this.$scopedSlots.text ? this.$scopedSlots.text({ header: c }) : h('span', [c.text]))
      }

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

      if (groupable) children.push(this.genGroupHandle(c.value))
      if (c.resizable) children.push(this.genResizeHandle(i))

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

    this.$slots.default && children.unshift(...this.$slots.default)

    return h('thead', {
      class: 'v-data-header'
    }, children)
  }
})
