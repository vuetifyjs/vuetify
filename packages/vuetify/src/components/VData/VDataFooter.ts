// Helpers
import { DataOptions, DataPaginaton } from './VData'
import { PropValidator } from 'vue/types/options'
import Vue, { VNode } from 'vue'

// Styles

export default Vue.extend({
  props: {
    options: {
      type: Object,
      required: true
    } as PropValidator<DataOptions>,
    pagination: {
      type: Object,
      required: true
    } as PropValidator<DataPaginaton>
  },

  methods: {
    previousPage () {
      this.$emit('update:options', Object.assign({}, this.options, { page: this.options.page - 1 }))
    },
    nextPage () {
      this.$emit('update:options', Object.assign({}, this.options, { page: this.options.page + 1 }))
    },
    changeItemsPerPage (e: Event) {
      this.$emit('update:options', Object.assign({}, this.options, { itemsPerPage: (e.target as any).value }))
    },
    genItemsPerPageSelect () {
      return this.$createElement('select', {
        attrs: {
          value: this.options.itemsPerPage
        },
        on: {
          change: this.changeItemsPerPage
        }
      })
    },
    genPaginationInfo () {
      return this.$createElement('span', [`Showing ${this.pagination.pageStart} - ${this.pagination.pageStop} of ${this.pagination.itemsLength}`])
    },
    genPrevPage () {
      return this.$createElement('button', {
        on: {
          click: this.previousPage
        }
      }, ['prev'])
    },
    genNextPage () {
      return this.$createElement('button', {
        on: {
          click: this.nextPage
        }
      }, ['next'])
    }
  },

  render (): VNode {
    return this.$createElement('div', [
      this.genItemsPerPageSelect(),
      this.genPaginationInfo(),
      this.genPrevPage(),
      this.genNextPage()
    ])
  }
})
