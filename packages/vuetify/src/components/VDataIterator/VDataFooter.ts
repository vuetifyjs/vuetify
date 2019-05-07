import './VDataFooter.sass'

// Components
import VSelect from '../VSelect/VSelect'
import VIcon from '../VIcon'
import VBtn from '../VBtn'

// Types
import Vue, { VNode, VNodeChildrenArrayContents } from 'vue'
import { DataOptions, DataPaginaton } from '../VData/VData'
import { PropValidator } from 'vue/types/options'

export default Vue.extend({
  name: 'v-data-footer',

  props: {
    options: {
      type: Object,
      required: true
    } as PropValidator<DataOptions>,
    pagination: {
      type: Object,
      required: true
    } as PropValidator<DataPaginaton>,
    itemsPerPageOptions: {
      type: Array,
      default: () => ([5, 10, 15, -1])
    } as PropValidator<any[]>,
    prevIcon: {
      type: String,
      default: '$vuetify.icons.prev'
    },
    nextIcon: {
      type: String,
      default: '$vuetify.icons.next'
    },
    firstIcon: {
      type: String,
      default: '$vuetify.icons.first'
    },
    lastIcon: {
      type: String,
      default: '$vuetify.icons.last'
    },
    itemsPerPageText: {
      type: String,
      default: '$vuetify.dataFooter.itemsPerPageText'
    },
    itemsPerPageAllText: {
      type: String,
      default: '$vuetify.dataFooter.itemsPerPageAll'
    },
    showFirstLastPage: Boolean,
    showCurrentPage: Boolean,
    disablePagination: Boolean,
    disableItemsPerPage: Boolean
  },

  computed: {
    disableNextPageIcon (): boolean {
      return this.options.itemsPerPage < 0 ||
        this.options.page * this.options.itemsPerPage >= this.pagination.itemsLength ||
        this.pagination.pageStop < 0
    },
    isCustomItemsPerPage (): boolean {
      for (let i = 0; i < this.itemsPerPageOptions.length; i++) {
        if (this.options.itemsPerPage === this.itemsPerPageOptions[i]) return false
      }

      return true
    },
    computedItemsPerPageOptions (): any[] {
      const itemsPerPageOptions = this.itemsPerPageOptions.slice()

      if (this.isCustomItemsPerPage) {
        itemsPerPageOptions.push(this.options.itemsPerPage)

        itemsPerPageOptions.sort((a, b) => {
          if (a === -1) return 1
          else if (b === -1) return -1
          else return a - b
        })
      }

      return itemsPerPageOptions.map(value => ({
        text: value === -1 ? this.$vuetify.lang.t(this.itemsPerPageAllText) : String(value), value
      }))
    }
  },

  methods: {
    updateOptions (obj: object) {
      this.$emit('update:options', Object.assign({}, this.options, obj))
    },
    onFirstPage () {
      this.updateOptions({ page: 1 })
    },
    onPreviousPage () {
      this.updateOptions({ page: this.options.page - 1 })
    },
    onNextPage () {
      this.updateOptions({ page: this.options.page + 1 })
    },
    onLastPage () {
      this.updateOptions({ page: this.pagination.pageCount })
    },
    onChangeItemsPerPage (itemsPerPage: number) {
      this.updateOptions({ itemsPerPage, page: 1 })
    },
    genItemsPerPageSelect () {
      return this.$createElement('div', {
        staticClass: 'v-data-footer__select'
      }, [
        this.$vuetify.lang.t(this.itemsPerPageText),
        this.$createElement(VSelect, {
          attrs: {
            'aria-label': this.itemsPerPageText
          },
          props: {
            disabled: this.disableItemsPerPage,
            items: this.computedItemsPerPageOptions,
            value: this.options.itemsPerPage,
            hideDetails: true,
            auto: true,
            minWidth: '75px'
          },
          on: {
            input: this.onChangeItemsPerPage
          }
        })
      ])
    },
    genPaginationInfo () {
      let children: VNodeChildrenArrayContents = ['–']

      if (this.pagination.itemsLength) {
        const itemsLength = this.pagination.itemsLength
        const pageStart = this.pagination.pageStart + 1
        const pageStop = itemsLength < this.pagination.pageStop || this.pagination.pageStop < 0
          ? itemsLength
          : this.pagination.pageStop

        children = this.$scopedSlots['page-text']
          ? [this.$scopedSlots['page-text']!({ pageStart, pageStop, itemsLength })]
          : [`${pageStart}-${pageStop} of ${itemsLength}`]
      }

      return this.$createElement('div', {
        'class': 'v-data-footer__pagination'
      }, children)
    },
    genIcon (click: Function, disabled: boolean, label: string, icon: string): VNode {
      return this.$createElement(VBtn, {
        props: {
          disabled: disabled || this.disablePagination,
          icon: true,
          text: true
          // dark: this.dark, // TODO: add mixin
          // light: this.light // TODO: add mixin
        },
        on: {
          click
        },
        attrs: {
          'aria-label': label // TODO: Localization
        }
      }, [this.$createElement(VIcon, icon)])
    },
    genIcons () {
      const before: VNodeChildrenArrayContents = []
      const after: VNodeChildrenArrayContents = []

      before.push(this.genIcon(
        this.onPreviousPage,
        this.options.page === 1,
        this.$vuetify.lang.t('$vuetify.dataFooter.prevPage'),
        this.$vuetify.rtl ? this.nextIcon : this.prevIcon
      ))

      after.push(this.genIcon(
        this.onNextPage,
        this.disableNextPageIcon,
        this.$vuetify.lang.t('$vuetify.dataFooter.nextPage'),
        this.$vuetify.rtl ? this.prevIcon : this.nextIcon
      ))

      if (this.showFirstLastPage) {
        before.unshift(this.genIcon(
          this.onFirstPage,
          this.options.page === 1,
          this.$vuetify.lang.t('$vuetify.dataFooter.firstPage'),
          this.$vuetify.rtl ? this.lastIcon : this.firstIcon
        ))

        after.push(this.genIcon(
          this.onLastPage,
          this.options.page === this.pagination.pageCount || this.options.itemsPerPage === -1,
          this.$vuetify.lang.t('$vuetify.dataFooter.lastPage'),
          this.$vuetify.rtl ? this.firstIcon : this.lastIcon
        ))
      }

      return [
        this.$createElement('div', {
          staticClass: 'v-data-footer__icons-before'
        }, before),
        this.showCurrentPage && this.$createElement('span', [this.options.page.toString()]),
        this.$createElement('div', {
          staticClass: 'v-data-footer__icons-after'
        }, after)
      ]
    }
  },

  render (): VNode {
    return this.$createElement('div', {
      staticClass: 'v-data-footer'
    }, [
      this.genItemsPerPageSelect(),
      this.genPaginationInfo(),
      this.genIcons()
    ])
  }
})
