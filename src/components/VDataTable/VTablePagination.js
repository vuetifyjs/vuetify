// import VRow from './VRow'
import VBtn from '../VBtn'
import VIcon from '../VIcon'
import VSelect from '../VSelect'

export default {
  name: 'v-table-pagination',
  inheritAttrs: false,
  props: {
    itemsLength: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    pageStart: {
      type: Number,
      required: true
    },
    pageStop: {
      type: Number,
      required: true
    },
    rowsPerPage: {
      type: Number,
      required: true
    },
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
        // 'class': this.actionsSelectClasses
      }, [
        this.rowsPerPageText,
        h(VSelect, {
          attrs: {
            'aria-label': this.rowsPerPageText
          },
          props: {
            items: this.rowsPerPageItems,
            value: this.rowsPerPage,
            hideDetails: true,
            auto: true,
            minWidth: '75px'
          },
          on: {
            input: val => {
              this.$emit('update:page', 1)
              this.$emit('update:rowsPerPage', val)
            }
          }
        })
      ])
    },
    genPagination (h) {
      let pagination = '–'

      if (this.itemsLength) {
        const stop = this.itemsLength < this.pageStop || this.pageStop < 0
          ? this.itemsLength
          : this.pageStop

        pagination = this.$scopedSlots.pageText
          ? this.$scopedSlots.pageText({
            pageStart: this.pageStart + 1,
            pageStop: stop,
            itemsLength: this.itemsLength
          })
          : `${this.pageStart + 1}-${stop} of ${this.itemsLength}`
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
      this.$emit('update:page', this.page + 1)
    }, this.rowsPerPage < 0 || this.page * this.rowsPerPage >= this.itemsLength || this.pageStop < 0, 'Next page', this.nextIcon)

    const prevIcon = this.genIcon(h, () => {
      this.$emit('update:page', this.page - 1)
    }, this.page === 1, 'Previous page', this.prevIcon)

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
