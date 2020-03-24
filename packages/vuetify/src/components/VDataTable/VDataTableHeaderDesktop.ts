// Helpers
import { VNode, VNodeData } from 'vue'
import mixins from '../../util/mixins'
import header from './mixins/header'
import { wrapInArray, convertToUnit } from '../../util/helpers'
import { DataTableHeader } from 'types'

export default mixins(header).extend({
  name: 'v-data-table-header-desktop',

  methods: {
    genGroupByToggle (header: DataTableHeader) {
      return this.$createElement('span', {
        on: {
          click: (e: MouseEvent) => {
            e.stopPropagation()
            this.$emit('group', header.value)
          },
        },
      }, ['group'])
    },
    getAria (beingSorted: boolean, isDesc: boolean) {
      const $t = (key: string) => this.$vuetify.lang.t(`$vuetify.dataTable.ariaLabel.${key}`)

      let ariaSort = 'none'
      let ariaLabel = [
        $t('sortNone'),
        $t('activateAscending'),
      ]

      if (!beingSorted) {
        return { ariaSort, ariaLabel: ariaLabel.join(' ') }
      }

      if (isDesc) {
        ariaSort = 'descending'
        ariaLabel = [
          $t('sortDescending'),
          $t(this.options.mustSort ? 'activateAscending' : 'activateNone'),
        ]
      } else {
        ariaSort = 'ascending'
        ariaLabel = [
          $t('sortAscending'),
          $t('activateDescending'),
        ]
      }

      return { ariaSort, ariaLabel: ariaLabel.join(' ') }
    },
    genHeader (header: DataTableHeader) {
      const data: Required<Pick<VNodeData, 'attrs' | 'on' | 'class' | 'style'>> = {
        attrs: {
          role: 'columnheader',
          scope: 'col',
          'aria-label': header.text || '',
        },
        style: {
          width: convertToUnit(header.width),
          minWidth: convertToUnit(header.width),
        },
        class: [
          `text-${header.align || 'start'}`,
          ...wrapInArray(header.class),
          header.divider && 'v-data-table__divider',
        ],
        on: {},
      }
      const children = []

      if (header.value === 'data-table-select' && !this.singleSelect) {
        return this.$createElement('th', data, [this.genSelectAll()])
      }

      children.push(
        this.$scopedSlots[header.value]
          ? this.$scopedSlots[header.value]!({ header })
          : this.$createElement('span', [header.text])
      )

      if (!this.disableSort && (header.sortable || !header.hasOwnProperty('sortable'))) {
        data.on['click'] = () => this.$emit('sort', header.value)

        const sortIndex = this.options.sortBy.findIndex(k => k === header.value)
        const beingSorted = sortIndex >= 0
        const isDesc = this.options.sortDesc[sortIndex]

        data.class.push('sortable')

        const { ariaLabel, ariaSort } = this.getAria(beingSorted, isDesc)

        data.attrs['aria-label'] += `${header.text ? ': ' : ''}${ariaLabel}`
        data.attrs['aria-sort'] = ariaSort

        if (beingSorted) {
          data.class.push('active')
          data.class.push(isDesc ? 'desc' : 'asc')
        }

        if (header.align === 'end') children.unshift(this.genSortIcon())
        else children.push(this.genSortIcon())

        if (this.options.multiSort && beingSorted) {
          children.push(this.$createElement('span', { class: 'v-data-table-header__sort-badge' }, [String(sortIndex + 1)]))
        }
      }

      if (this.showGroupBy) children.push(this.genGroupByToggle(header))

      return this.$createElement('th', data, children)
    },
  },

  render (): VNode {
    return this.$createElement('thead', {
      staticClass: 'v-data-table-header',
    }, [
      this.$createElement('tr', this.headers.map(header => this.genHeader(header))),
    ])
  },
})
