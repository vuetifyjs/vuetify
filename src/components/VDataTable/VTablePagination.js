// import VRow from './VRow'
import VBtn from '../VBtn'
import VIcon from '../VIcon'
import VSelect from '../VSelect'

export default {
  name: 'v-table-pagination',
  inheritAttrs: false,
  inject: ['dataIterator'],
  props: {
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    rowsPerPageItems: {
      type: Array,
      default: () => ([
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '15', value: 15 },
        { text: 'All', value: -1 }
      ])
    },
    rowsPerPageText: {
      type: String,
      default: 'Rows per page:'
    }
  },
  methods: {
    genRowsPerPageSelect (h) {
      return h('div', {
        staticClass: 'v-table-pagination__select'
      }, [
        this.rowsPerPageText,
        h(VSelect, {
          attrs: {
            'aria-label': this.rowsPerPageText
          },
          props: {
            items: this.rowsPerPageItems,
            value: this.dataIterator.rowsPerPage,
            hideDetails: true,
            auto: true,
            minWidth: '75px'
          },
          on: {
            input: val => {
              this.dataIterator.page = 1
              this.dataIterator.rowsPerPage = val
            }
          }
        })
      ])
    },
    genPagination (h) {
      let pagination = '–'

      if (this.dataIterator.itemsLength) {
        const stop = this.dataIterator.itemsLength < this.dataIterator.pageStop || this.dataIterator.pageStop < 0
          ? this.dataIterator.itemsLength
          : this.dataIterator.pageStop

        pagination = this.$scopedSlots.pageText
          ? this.$scopedSlots.pageText({
            pageStart: this.dataIterator.pageStart + 1,
            pageStop: stop,
            itemsLength: this.dataIterator.itemsLength
          })
          : `${this.dataIterator.pageStart + 1}-${stop} of ${this.dataIterator.itemsLength}`
      }

      return h('div', {
        'class': this.actionsPaginationClasses
      }, [pagination])
    },
    genIcon (h, click, disabled, label, icon) {
      return h(VBtn, {
        props: {
          disabled,
          icon: true,
          flat: true,
          dark: this.dark, // TODO: add mixin
          light: this.light // TODO: add mixin
        },
        on: {
          click
        },
        attrs: {
          'aria-label': label // TODO: Localization
        }
      }, [h(VIcon, icon)])
    }
  },
  render (h) {
    const nextIcon = this.genIcon(h, () => {
      this.dataIterator.page = this.dataIterator.page + 1
    }, this.dataIterator.rowsPerPage < 0 || this.dataIterator.page * this.dataIterator.rowsPerPage >= this.dataIterator.itemsLength || this.dataIterator.pageStop < 0, 'Next page', this.nextIcon)

    const prevIcon = this.genIcon(h, () => {
      this.dataIterator.page = this.dataIterator.page - 1
    }, this.dataIterator.page === 1, 'Previous page', this.prevIcon)

    return h('div', {
      staticClass: 'v-table-pagination'
    }, [
      this.genRowsPerPageSelect(h),
      this.genPagination(h),
      prevIcon,
      nextIcon
    ])
  }
}
