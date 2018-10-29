// Helpers
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { DataOptions } from '../VData/VLocalData'
import TableHeader from './TableHeader'

export default Vue.extend({
  props: {
    headers: {
      type: Array,
      required: true
    } as PropValidator<TableHeader[]>,
    options: {
      type: Object,
      default: () => ({
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: []
      })
    } as PropValidator<DataOptions>,
    multiSort: Boolean
  },

  methods: {
    genSortIcon (beingSorted: boolean, isDesc: boolean): VNode {
      return this.$createElement('div', [`${beingSorted ? 's' : ''}${isDesc ? 'd' : ''}`])
    },
    genHeaders () {
      return this.headers.map(header => {
        const listeners: any = {}
        const children = [
          this.$createElement('span', [header.text])
        ]

        let classes = {
          [`text-xs-${header.align || 'left'}`]: true
        }

        if (header.sortable || !header.hasOwnProperty('sortable')) {
          listeners['click'] = () => {
            this.$emit('sort', header.value)
          }

          const sortIndex = this.options.sortBy.findIndex(k => k === header.value)
          const beingSorted = sortIndex >= 0
          const isDesc = this.options.sortDesc[sortIndex]

          classes = {
            ...classes,
            'sortable': true,
            'active': beingSorted,
            'asc': beingSorted && !isDesc,
            'desc': beingSorted && isDesc
          }

          if (header.align === 'end') children.unshift(this.genSortIcon(beingSorted, isDesc))
          else children.push(this.genSortIcon(beingSorted, isDesc))
        }

        return this.$createElement('th', {
          class: classes,
          on: listeners
        }, children)
      })
    }
  },

  render (): VNode {
    return this.$createElement('thead', [
      this.$createElement('tr', this.genHeaders())
    ])
  }
})
