export default {
  methods: {
    genPrevIcon () {
      return this.$createElement('v-btn', {
        props: {
          disabled: this.computedPagination.page === 1,
          icon: true,
          flat: true,
          dark: this.dark,
          light: this.light
        },
        on: {
          click: () => {
            const page = this.computedPagination.page
            this.updatePagination({ page: page - 1 })
          }
        },
        attrs: {
          'aria-label': 'Previous page' // TODO: Localization
        }
      }, [this.$createElement('v-icon', 'chevron_left')])
    },
    genNextIcon () {
      const pagination = this.computedPagination
      const disabled = pagination.rowsPerPage < 0 ||
        pagination.page * pagination.rowsPerPage >= this.itemsLength ||
        this.pageStop < 0

      return this.$createElement('v-btn', {
        props: {
          disabled,
          icon: true,
          flat: true,
          dark: this.dark,
          light: this.light
        },
        on: {
          click: () => {
            const page = this.computedPagination.page
            this.updatePagination({ page: page + 1 })
          }
        },
        attrs: {
          'aria-label': 'Next page' // TODO: Localization
        }
      }, [this.$createElement('v-icon', 'chevron_right')])
    },
    genSelect () {
      return this.$createElement('div', {
        'class': 'datatable__actions__select'
      }, [
        this.rowsPerPageText,
        this.$createElement('v-select', {
          attrs: {
            'aria-label': this.rowsPerPageText
          },
          props: {
            items: this.rowsPerPageItems,
            value: this.computedPagination.rowsPerPage,
            hideDetails: true,
            auto: true,
            minWidth: '75px'
          },
          on: {
            input: (val) => {
              this.updatePagination({
                page: 1,
                rowsPerPage: val
              })
            }
          }
        })
      ])
    },
    genPagination () {
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
      const children = []

      if (this.$slots.footer) {
        const footer = this.$slots.footer
        const row = this.needsTR(footer) ? this.genTR(footer) : footer

        children.push(row)
      }

      if (!this.hideActions) {
        children.push(this.genTR([
          this.$createElement('td', {
            attrs: { colspan: '100%' }
          }, this.genActions())
        ]))
      }

      if (!children.length) return null
      return this.$createElement('tfoot', children)
    }
  }
}
