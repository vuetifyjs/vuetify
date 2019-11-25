// Styles
import './VDataFooter.sass'

// Components
import { VSelect } from '../VSelect'
import { VIcon } from '../VIcon'
import { VBtn } from '../VBtn'

// Mixins
import Bidirectional from '../../mixins/bidirectional'
import Localable from '../../mixins/localable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { PropValidator } from 'vue/types/options'
import {
  VNode,
  VNodeChildrenArrayContents,
} from 'vue'
import {
  DataOptions,
  DataPagination,
} from '../VData/VData'

const baseMixins = mixins(
  Bidirectional,
  Localable,
)

export default baseMixins.extend({
  name: 'v-data-footer',

  props: {
    options: {
      type: Object,
      required: true,
    } as PropValidator<DataOptions>,
    pagination: {
      type: Object,
      required: true,
    } as PropValidator<DataPagination>,
    itemsPerPageOptions: {
      type: Array,
      default: () => ([5, 10, 15, -1]),
    } as PropValidator<any[]>,
    prevIcon: {
      type: String,
      default: '$prev',
    },
    nextIcon: {
      type: String,
      default: '$next',
    },
    firstIcon: {
      type: String,
      default: '$first',
    },
    lastIcon: {
      type: String,
      default: '$last',
    },
    itemsPerPageText: {
      type: String,
      default: '$vuetify.dataFooter.itemsPerPageText',
    },
    itemsPerPageAllText: {
      type: String,
      default: '$vuetify.dataFooter.itemsPerPageAll',
    },
    showFirstLastPage: Boolean,
    showCurrentPage: Boolean,
    disablePagination: Boolean,
    disableItemsPerPage: Boolean,
    pageText: {
      type: String,
      default: '$vuetify.dataFooter.pageText',
    },
  },

  computed: {
    computedItemsPerPageOptions (): any[] {
      return this.itemsPerPageOptions.map(option => {
        if (typeof option === 'object') return option
        else return this.genItemsPerPageOption(option)
      })
    },
    disableNextPageIcon (): boolean {
      return this.options.itemsPerPage < 0 ||
        this.options.page * this.options.itemsPerPage >= this.pagination.itemsLength ||
        this.pagination.pageStop < 0
    },
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
    genItemsPerPageOption (option: number) {
      return {
        text: option === -1
          ? this.langInstance.t(this.itemsPerPageAllText)
          : String(option),
        value: option,
      }
    },
    genItemsPerPageSelect () {
      let value = this.options.itemsPerPage
      const computedIPPO = this.computedItemsPerPageOptions

      if (computedIPPO.length <= 1) return null

      if (!computedIPPO.find(ippo => ippo.value === value)) value = computedIPPO[0]

      return this.$createElement('div', {
        staticClass: 'v-data-footer__select',
      }, [
        this.langInstance.t(this.itemsPerPageText),
        this.$createElement(VSelect, {
          attrs: {
            'aria-label': this.itemsPerPageText,
          },
          props: {
            disabled: this.disableItemsPerPage,
            items: computedIPPO,
            value,
            hideDetails: true,
            auto: true,
            minWidth: '75px',
          },
          on: {
            input: this.onChangeItemsPerPage,
          },
        }),
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
          : [this.langInstance.t(this.pageText, pageStart, pageStop, itemsLength)]
      }

      return this.$createElement('div', {
        class: 'v-data-footer__pagination',
      }, children)
    },
    genIcon (click: Function, disabled: boolean, label: string, icon: string): VNode {
      return this.$createElement(VBtn, {
        props: {
          disabled: disabled || this.disablePagination,
          icon: true,
          text: true,
          // dark: this.dark, // TODO: add mixin
          // light: this.light // TODO: add mixin
        },
        on: {
          click,
        },
        attrs: {
          'aria-label': label, // TODO: Localization
        },
      }, [this.$createElement(VIcon, icon)])
    },
    genIcons () {
      const before: VNodeChildrenArrayContents = []
      const after: VNodeChildrenArrayContents = []

      before.push(this.genIcon(
        this.onPreviousPage,
        this.options.page === 1,
        this.langInstance.t('$vuetify.dataFooter.prevPage'),
        this.hasRtl ? this.nextIcon : this.prevIcon
      ))

      after.push(this.genIcon(
        this.onNextPage,
        this.disableNextPageIcon,
        this.langInstance.t('$vuetify.dataFooter.nextPage'),
        this.hasRtl ? this.prevIcon : this.nextIcon
      ))

      if (this.showFirstLastPage) {
        before.unshift(this.genIcon(
          this.onFirstPage,
          this.options.page === 1,
          this.langInstance.t('$vuetify.dataFooter.firstPage'),
          this.hasRtl ? this.lastIcon : this.firstIcon
        ))

        after.push(this.genIcon(
          this.onLastPage,
          this.options.page >= this.pagination.pageCount || this.options.itemsPerPage === -1,
          this.langInstance.t('$vuetify.dataFooter.lastPage'),
          this.hasRtl ? this.firstIcon : this.lastIcon
        ))
      }

      return [
        this.$createElement('div', {
          staticClass: 'v-data-footer__icons-before',
        }, before),
        this.showCurrentPage && this.$createElement('span', [this.options.page.toString()]),
        this.$createElement('div', {
          staticClass: 'v-data-footer__icons-after',
        }, after),
      ]
    },
  },

  render (): VNode {
    return this.$createElement('div', {
      staticClass: 'v-data-footer',
    }, [
      this.genItemsPerPageSelect(),
      this.genPaginationInfo(),
      this.genIcons(),
    ])
  },
})
