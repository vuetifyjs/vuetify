export default {
  methods: {
    genPrevIcon () {
      return this.$createElement('v-btn', {
        props: {
          disabled: this.computedPagination.page === 1,
          icon: true,
          flat: true
        },
        nativeOn: { click: () => (this.computedPagination.page--) }
      }, [this.$createElement('v-icon', 'chevron_left')])
    },
    genNextIcon () {
      return this.$createElement('v-btn', {
        props: {
          disabled: this.computedPagination.page * this.computedPagination.rowsPerPage >= this.itemsLength || this.pageStop < 0,
          icon: true,
          flat: true
        },
        nativeOn: { click: () => (this.computedPagination.page++) }
      }, [this.$createElement('v-icon', 'chevron_right')])
    },
    genSelect () {
      return this.$createElement('div', {
        'class': 'datatable__actions__select'
      }, [
        this.rowsPerPageText,
        this.$createElement('v-select', {
          props: {
            items: this.rowsPerPageItems,
            value: this.computedPagination.rowsPerPage,
            hideDetails: true,
            auto: true
          },
          on: { input: val => { this.computedPagination.rowsPerPage = val; this.computedPagination.page = 1 } }
        })
      ])
    },
    genPagination () {
      let pagination = '&mdash;'

      if (this.itemsLength) {
        const stop = this.itemsLength < this.pageStop || this.pageStop < 0
                ? this.itemsLength
                : this.pageStop

        pagination = this.$scopedSlots.pageText
          ? this.$scopedSlots.pageText({
            pageStart: this.pageStart,
            pageStop: this.itemsLength
          })
          : `${this.pageStart + 1}-${stop} of ${this.itemsLength}`
      }

      return this.$createElement('div', {
        'class': 'datatable__actions__pagination'
      }, [pagination])
    },
    genActions () {
      return [this.$createElement('div', {
        'class': 'datatable__actions'
      }, [
        this.genSelect(),
        this.genPagination(),
        this.genPrevIcon(),
        this.genNextIcon()
      ])]
    },
    genTFoot () {
      return this.$createElement('tfoot', [
        this.genTR([
          this.$createElement('td', {
            attrs: { colspan: '100%' }
          }, this.genActions())
        ])
      ])
    }
  }
}
