// Components
import { VData } from '../VData'
import VDataFooter from './VDataFooter'

// Mixins
import Mobile from '../../mixins/mobile'
import Themeable from '../../mixins/themeable'

// Helpers
import mixins from '../../util/mixins'
import { deepEqual, getObjectValueByPath, getPrefixedScopedSlots, getSlot, camelizeObjectKeys } from '../../util/helpers'
import { breaking, removed } from '../../util/console'

// Types
import { VNode, VNodeChildren } from 'vue'
import { PropValidator } from 'vue/types/options'
import { DataItemProps, DataScopeProps } from 'vuetify/types'

/* @vue/component */
export default mixins(
  Mobile,
  Themeable
).extend({
  name: 'v-data-iterator',

  props: {
    ...VData.options.props, // TODO: filter out props not used
    itemKey: {
      type: String,
      default: 'id',
    },
    value: {
      type: Array,
      default: () => [],
    } as PropValidator<any[]>,
    singleSelect: Boolean,
    expanded: {
      type: Array,
      default: () => [],
    } as PropValidator<any[]>,
    mobileBreakpoint: {
      ...Mobile.options.props.mobileBreakpoint,
      default: 600,
    },
    singleExpand: Boolean,
    loading: [Boolean, String],
    noResultsText: {
      type: String,
      default: '$vuetify.dataIterator.noResultsText',
    },
    noDataText: {
      type: String,
      default: '$vuetify.noDataText',
    },
    loadingText: {
      type: String,
      default: '$vuetify.dataIterator.loadingText',
    },
    hideDefaultFooter: Boolean,
    footerProps: Object,
    selectableKey: {
      type: String,
      default: 'isSelectable',
    },
  },

  data: () => ({
    selection: {} as Record<string, any>,
    expansion: {} as Record<string, boolean>,
    internalCurrentItems: [] as any[],
  }),

  computed: {
    everyItem (): boolean {
      return !!this.selectableItems.length && this.selectableItems.every((i: any) => this.isSelected(i))
    },
    someItems (): boolean {
      return this.selectableItems.some((i: any) => this.isSelected(i))
    },
    sanitizedFooterProps (): Record<string, any> {
      return camelizeObjectKeys(this.footerProps)
    },
    selectableItems (): any[] {
      return this.internalCurrentItems.filter(item => this.isSelectable(item))
    },
  },

  watch: {
    value: {
      handler (value: any[]) {
        this.selection = value.reduce((selection, item) => {
          selection[getObjectValueByPath(item, this.itemKey)] = item
          return selection
        }, {})
      },
      immediate: true,
    },
    selection (value: Record<string, boolean>, old: Record<string, boolean>) {
      if (deepEqual(Object.keys(value), Object.keys(old))) return

      this.$emit('input', Object.values(value))
    },
    expanded: {
      handler (value: any[]) {
        this.expansion = value.reduce((expansion, item) => {
          expansion[getObjectValueByPath(item, this.itemKey)] = true
          return expansion
        }, {})
      },
      immediate: true,
    },
    expansion (value: Record<string, boolean>, old: Record<string, boolean>) {
      if (deepEqual(value, old)) return
      const keys = Object.keys(value).filter(k => value[k])
      const expanded = !keys.length ? [] : this.items.filter(i => keys.includes(String(getObjectValueByPath(i, this.itemKey))))
      this.$emit('update:expanded', expanded)
    },
  },

  created () {
    const breakingProps = [
      ['disable-initial-sort', 'sort-by'],
      ['filter', 'custom-filter'],
      ['pagination', 'options'],
      ['total-items', 'server-items-length'],
      ['hide-actions', 'hide-default-footer'],
      ['rows-per-page-items', 'footer-props.items-per-page-options'],
      ['rows-per-page-text', 'footer-props.items-per-page-text'],
      ['prev-icon', 'footer-props.prev-icon'],
      ['next-icon', 'footer-props.next-icon'],
    ]

    /* istanbul ignore next */
    breakingProps.forEach(([original, replacement]) => {
      if (this.$attrs.hasOwnProperty(original)) breaking(original, replacement, this)
    })

    const removedProps = [
      'expand',
      'content-class',
      'content-props',
      'content-tag',
    ]

    /* istanbul ignore next */
    removedProps.forEach(prop => {
      if (this.$attrs.hasOwnProperty(prop)) removed(prop)
    })
  },

  methods: {
    toggleSelectAll (value: boolean): void {
      const selection = Object.assign({}, this.selection)

      for (let i = 0; i < this.selectableItems.length; i++) {
        const item = this.selectableItems[i]

        if (!this.isSelectable(item)) continue

        const key = getObjectValueByPath(item, this.itemKey)
        if (value) selection[key] = item
        else delete selection[key]
      }

      this.selection = selection
      this.$emit('toggle-select-all', { items: this.internalCurrentItems, value })
    },
    isSelectable (item: any): boolean {
      return getObjectValueByPath(item, this.selectableKey) !== false
    },
    isSelected (item: any): boolean {
      return !!this.selection[getObjectValueByPath(item, this.itemKey)] || false
    },
    select (item: any, value = true, emit = true): void {
      if (!this.isSelectable(item)) return

      const selection = this.singleSelect ? {} : Object.assign({}, this.selection)
      const key = getObjectValueByPath(item, this.itemKey)

      if (value) selection[key] = item
      else delete selection[key]

      if (this.singleSelect && emit) {
        const keys = Object.keys(this.selection)
        const old = keys.length && getObjectValueByPath(this.selection[keys[0]], this.itemKey)
        old && old !== key && this.$emit('item-selected', { item: this.selection[old], value: false })
      }
      this.selection = selection
      emit && this.$emit('item-selected', { item, value })
    },
    isExpanded (item: any): boolean {
      return this.expansion[getObjectValueByPath(item, this.itemKey)] || false
    },
    expand (item: any, value = true): void {
      const expansion = this.singleExpand ? {} : Object.assign({}, this.expansion)
      const key = getObjectValueByPath(item, this.itemKey)

      if (value) expansion[key] = true
      else delete expansion[key]

      this.expansion = expansion
      this.$emit('item-expanded', { item, value })
    },
    createItemProps (item: any, index: number): DataItemProps {
      return {
        item,
        index,
        select: (v: boolean) => this.select(item, v),
        isSelected: this.isSelected(item),
        expand: (v: boolean) => this.expand(item, v),
        isExpanded: this.isExpanded(item),
        isMobile: this.isMobile,
      }
    },
    genEmptyWrapper (content: VNodeChildren) {
      return this.$createElement('div', content)
    },
    genEmpty (originalItemsLength: number, filteredItemsLength: number) {
      if (originalItemsLength === 0 && this.loading) {
        const loading = this.$slots.loading || this.$vuetify.lang.t(this.loadingText)
        return this.genEmptyWrapper(loading)
      } else if (originalItemsLength === 0) {
        const noData = this.$slots['no-data'] || this.$vuetify.lang.t(this.noDataText)
        return this.genEmptyWrapper(noData)
      } else if (filteredItemsLength === 0) {
        const noResults = this.$slots['no-results'] || this.$vuetify.lang.t(this.noResultsText)
        return this.genEmptyWrapper(noResults)
      }

      return null
    },
    genItems (props: DataScopeProps) {
      const empty = this.genEmpty(props.originalItemsLength, props.pagination.itemsLength)
      if (empty) return [empty]

      if (this.$scopedSlots.default) {
        return this.$scopedSlots.default({
          ...props,
          isSelected: this.isSelected,
          select: this.select,
          isExpanded: this.isExpanded,
          isMobile: this.isMobile,
          expand: this.expand,
        })
      }

      if (this.$scopedSlots.item) {
        return props.items.map((item: any, index) => this.$scopedSlots.item!(this.createItemProps(
          item,
          index
        )))
      }

      return []
    },
    genFooter (props: DataScopeProps) {
      if (this.hideDefaultFooter) return null

      const data = {
        props: {
          ...this.sanitizedFooterProps,
          options: props.options,
          pagination: props.pagination,
        },
        on: {
          'update:options': (value: any) => props.updateOptions(value),
        },
      }

      const scopedSlots = getPrefixedScopedSlots('footer.', this.$scopedSlots)

      return this.$createElement(VDataFooter, {
        scopedSlots,
        ...data,
      })
    },
    genDefaultScopedSlot (props: any) {
      const outerProps = {
        ...props,
        someItems: this.someItems,
        everyItem: this.everyItem,
        toggleSelectAll: this.toggleSelectAll,
      }

      return this.$createElement('div', {
        staticClass: 'v-data-iterator',
      }, [
        getSlot(this, 'header', outerProps, true),
        this.genItems(props),
        this.genFooter(props),
        getSlot(this, 'footer', outerProps, true),
      ])
    },
  },

  render (): VNode {
    return this.$createElement(VData, {
      props: this.$props,
      on: {
        'update:options': (v: any, old: any) => !deepEqual(v, old) && this.$emit('update:options', v),
        'update:page': (v: any) => this.$emit('update:page', v),
        'update:items-per-page': (v: any) => this.$emit('update:items-per-page', v),
        'update:sort-by': (v: any) => this.$emit('update:sort-by', v),
        'update:sort-desc': (v: any) => this.$emit('update:sort-desc', v),
        'update:group-by': (v: any) => this.$emit('update:group-by', v),
        'update:group-desc': (v: any) => this.$emit('update:group-desc', v),
        pagination: (v: any, old: any) => !deepEqual(v, old) && this.$emit('pagination', v),
        'current-items': (v: any[]) => {
          this.internalCurrentItems = v
          this.$emit('current-items', v)
        },
        'page-count': (v: number) => this.$emit('page-count', v),
      },
      scopedSlots: {
        default: this.genDefaultScopedSlot,
      },
    })
  },
})
