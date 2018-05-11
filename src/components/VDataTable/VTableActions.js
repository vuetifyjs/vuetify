// import VRow from './VRow'
import VBtn from '../VBtn'
import VIcon from '../VIcon'
import VSelect from '../VSelect'

export default {
  name: 'v-table-actions',
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
    firstIcon: {
      type: String,
      default: 'first_page'
    },
    lastIcon: {
      type: String,
      default: 'last_page'
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
    },
    showFirstLastPage: {
      type: Boolean
    }
  },
  methods: {
    genRowsPerPageSelect (h) {
      return h('div', {
        staticClass: 'v-data-table__actions__select'
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
        'class': 'v-data-table__actions__pagination'
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
    const icons = []

    icons.push(this.genIcon(h, () => {
      this.dataIterator.page = this.dataIterator.page - 1
    }, this.dataIterator.page === 1, 'Previous page', this.prevIcon))

    icons.push(this.genIcon(h, () => {
      this.dataIterator.page = this.dataIterator.page + 1
    }, this.dataIterator.rowsPerPage < 0 || this.dataIterator.page * this.dataIterator.rowsPerPage >= this.dataIterator.itemsLength || this.dataIterator.pageStop < 0, 'Next page', this.nextIcon))

    if (this.showFirstLastPage) {
      icons.unshift(this.genIcon(h, () => {
        this.dataIterator.page = 1
      }, this.dataIterator.page === 1, 'First page', this.firstIcon))

      icons.push(this.genIcon(h, () => {
        this.dataIterator.page = this.dataIterator.pageCount
      }, this.dataIterator.page === this.dataIterator.pageCount || this.dataIterator.rowsPerPage === -1, 'Last page', this.lastIcon))
    }

    return h('div', {
      staticClass: 'v-data-table__actions'
    }, [
      this.genRowsPerPageSelect(h),
      this.genPagination(h),
      ...icons
    ])
  }
}
