// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'
import VSelect from '../VSelect'
import VDataIterator from './VDataIterator'

// Types
import Vue, { VNode, CreateElement, VNodeChildrenArrayContents } from 'vue'
import mixins from '../../util/mixins'
import { PropValidator } from 'vue/types/options'

type VDataIteratorInstance = InstanceType<typeof VDataIterator>

interface options extends Vue {
  dataIterator: VDataIteratorInstance
}

export default mixins<options>().extend({
  name: 'v-data-footer',

  inject: ['dataIterator'],

  inheritAttrs: false,

  props: {
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
    itemsPerPageOptions: {
      type: Array,
      default: () => ([
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '15', value: 15 },
        { text: 'All', value: -1 }
      ])
    } as PropValidator<any[]>,
    itemsPerPageText: {
      type: String,
      default: '$vuetify.dataIterator.itemsPerPageText'
    },
    showFirstLastPage: Boolean, // TODO: Better name?
    showPageNumber: Boolean
  },

  methods: {
    genItemsPerPageSelect (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-data-table__actions__select'
      }, [
        this.$vuetify.t(this.itemsPerPageText),
        this.$createElement(VSelect, {
          attrs: {
            'aria-label': this.itemsPerPageText
          },
          props: {
            items: this.itemsPerPageOptions,
            value: this.dataIterator.options.itemsPerPage,
            hideDetails: true,
            auto: true,
            minWidth: '75px'
          },
          on: {
            input: (val: any) => {
              this.dataIterator.options.page = 1
              this.dataIterator.options.itemsPerPage = val
            }
          }
        })
      ])
    },

    genPagination (): VNode {
      let children: VNodeChildrenArrayContents = ['–']

      if (this.dataIterator.itemsLength) {
        const itemsLength = this.dataIterator.itemsLength
        const pageStart = this.dataIterator.pageStart + 1
        const pageStop = itemsLength < this.dataIterator.pageStop || this.dataIterator.pageStop < 0
          ? itemsLength
          : this.dataIterator.pageStop

        children = this.$scopedSlots.pageText
          ? [this.$scopedSlots.pageText({ pageStart, pageStop, itemsLength })]
          : [`${pageStart}-${pageStop} of ${itemsLength}`]
      }

      return this.$createElement('div', {
        'class': 'v-data-table__actions__pagination'
      }, children)
    },

    genIcon (click: Function, disabled: boolean, label: string, icon: string): VNode {
      return this.$createElement(VBtn, {
        props: {
          disabled,
          icon: true,
          flat: true
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
      const icons: VNodeChildrenArrayContents = []

      icons.push(this.genIcon(() => {
        this.dataIterator.options.page = this.dataIterator.options.page - 1
      }, this.dataIterator.options.page === 1, 'Previous page', this.$vuetify.rtl ? this.nextIcon : this.prevIcon))

      if (this.showPageNumber) {
        icons.push(this.$createElement('span', [this.dataIterator.options.page.toString()]))
      }

      icons.push(this.genIcon(() => {
        this.dataIterator.options.page = this.dataIterator.options.page + 1
      }, this.dataIterator.options.itemsPerPage < 0 || this.dataIterator.options.page * this.dataIterator.options.itemsPerPage >= this.dataIterator.itemsLength || this.dataIterator.pageStop < 0, 'Next page', this.$vuetify.rtl ? this.prevIcon : this.nextIcon))

      if (this.showFirstLastPage) {
        icons.unshift(this.genIcon(() => {
          this.dataIterator.options.page = 1
        }, this.dataIterator.options.page === 1, 'First page', this.$vuetify.rtl ? this.lastIcon : this.firstIcon))

        icons.push(this.genIcon(() => {
          this.dataIterator.options.page = this.dataIterator.pageCount
        }, this.dataIterator.options.page === this.dataIterator.pageCount || this.dataIterator.options.itemsPerPage === -1, 'Last page', this.$vuetify.rtl ? this.firstIcon : this.lastIcon))
      }

      return icons
    }
  },

  render (h: CreateElement): VNode {
    return h('div', {
      staticClass: 'v-data-table__actions'
    }, [
      this.genItemsPerPageSelect(),
      this.genPagination(),
      this.genIcons()
    ])
  }
})
