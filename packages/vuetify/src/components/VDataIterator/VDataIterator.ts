import { VNode, VNodeChildren } from 'vue'

// Components
import { VData } from '../VData'

// Helpers
import { deepEqual, getObjectValueByPath } from '../../util/helpers'
import { DataProps } from '../VData/VData'
import { PropValidator } from 'vue/types/options'
import mixins from '../../util/mixins'
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default mixins(Themeable).extend({
  name: 'v-data-iterator',

  props: {
    ...VData.options.props, // TODO: filter out props not used
    value: {
      type: Array,
      default: () => []
    } as PropValidator<any[]>,
    singleSelect: Boolean,
    expanded: {
      type: Array,
      default: () => []
    } as PropValidator<any[]>,
    singleExpand: Boolean,
    loading: [Boolean, String],
    noResultsText: {
      type: String,
      default: '$vuetify.dataIterator.noResultsText'
    },
    noDataText: {
      type: String,
      default: '$vuetify.noDataText'
    },
    loadingText: {
      type: String,
      default: '$vuetify.dataIterator.loadingText'
    }
  },

  data: () => ({
    selection: {} as Record<string, boolean>,
    expansion: {} as Record<string, boolean>,
    internalCurrentItems: [] as any[]
  }),

  computed: {
    everyItem (): boolean {
      return !!this.internalCurrentItems.length && this.internalCurrentItems.every((i: any) => this.isSelected(i))
    },
    someItems (): boolean {
      return this.internalCurrentItems.some((i: any) => this.isSelected(i))
    }
  },

  watch: {
    value (value: any[]) {
      this.selection = value.reduce((selection, item) => {
        selection[getObjectValueByPath(item, this.itemKey)] = true
        return selection
      }, {})
    },
    selection: {
      handler (value: Record<string, boolean>, old: Record<string, boolean>) {
        if (deepEqual(value, old)) return
        const keys = Object.keys(value).filter(k => value[k])
        const selected = !keys.length ? [] : this.items.filter(i => keys.includes(String(getObjectValueByPath(i, this.itemKey))))
        this.$emit('input', selected)
      },
      deep: true
    },
    expanded (value: any[]) {
      this.expansion = value.reduce((expansion, item) => {
        expansion[getObjectValueByPath(item, this.itemKey)] = true
        return expansion
      }, {})
    },
    expansion (value: Record<string, boolean>, old: Record<string, boolean>) {
      if (deepEqual(value, old)) return
      const keys = Object.keys(value).filter(k => value[k])
      const expanded = !keys.length ? [] : this.items.filter(i => keys.includes(String(getObjectValueByPath(i, this.itemKey))))
      this.$emit('update:expanded', expanded)
    }
  },

  methods: {
    toggleSelectAll (value: boolean): void {
      this.internalCurrentItems.forEach((item: any) => {
        const key = getObjectValueByPath(item, this.itemKey)
        this.$set(this.selection, key, value)
      })
    },
    isSelected (item: any): boolean {
      return this.selection[getObjectValueByPath(item, this.itemKey)] || false
    },
    select (item: any, value = true): void {
      const selection = this.singleSelect ? {} : Object.assign({}, this.selection)
      const key = getObjectValueByPath(item, this.itemKey)

      if (value) selection[key] = true
      else delete selection[key]

      this.selection = selection
      this.$emit('item-selected', { item, value })
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
    createItemProps (item: any) {
      const props = {
        item,
        select: {
          props: {
            value: this.isSelected(item)
          },
          on: {
            input: (v: boolean) => this.select(item, v)
          }
        },
        expand: {
          props: {
            value: this.isExpanded(item)
          },
          on: {
            input: (v: boolean) => this.expand(item, v)
          }
        }
      }

      return props
    },
    genEmptyWrapper (content: VNodeChildren) {
      return this.$createElement('div', content)
    },
    genEmpty (itemsLength: number) {
      if (itemsLength <= 0 && this.loading) {
        const loading = this.$slots['loading'] || this.$vuetify.lang.t(this.loadingText)
        return this.genEmptyWrapper(loading)
      } else if (itemsLength <= 0 && !this.items.length) {
        const noData = this.$slots['no-data'] || this.$vuetify.lang.t(this.noDataText)
        return this.genEmptyWrapper(noData)
      } else if (itemsLength <= 0 && this.search) {
        const noResults = this.$slots['no-results'] || this.$vuetify.lang.t(this.noResultsText)
        return this.genEmptyWrapper(noResults)
      }

      return null
    },
    genItems (props: DataProps) {
      const empty = this.genEmpty(props.pagination.itemsLength)
      if (empty) return [empty]

      if (this.$scopedSlots.default) return this.$scopedSlots.default(props)

      if (this.$scopedSlots.item) {
        return props.items.map((item: any) => this.$scopedSlots.item!(this.createItemProps(item)))
      }

      return []
    },
    genSlots (slot: string, props: any = {}): VNodeChildren {
      if (this.$scopedSlots[slot]) return this.$scopedSlots[slot]!(props)
      else if (this.$slots[slot]) return this.$slots[slot]
      return []
    },
    genDefaultScopedSLot (props: any) {
      return this.$createElement('div', {
        staticClass: 'v-data-iterator'
      }, [
        this.genSlots('prepend', props),
        this.genItems(props),
        this.genSlots('append', props)
      ]) as any
    }
  },

  render (): VNode {
    return this.$createElement(VData, {
      props: this.$props,
      on: {
        'update:options': (v: any, old: any) => !deepEqual(v, old) && this.$emit('update:options', v),
        'update:page': (v: any) => this.$emit('update:page', v),
        'update:itemsPerPage': (v: any) => this.$emit('update:itemsPerPage', v),
        'update:sortBy': (v: any) => this.$emit('update:sortBy', v),
        'update:sortDesc': (v: any) => this.$emit('update:sortDesc', v),
        'update:groupBy': (v: any) => this.$emit('update:groupBy', v),
        'update:groupDesc': (v: any) => this.$emit('update:groupDesc', v),
        'pagination': (v: any, old: any) => !deepEqual(v, old) && this.$emit('pagination', v),
        'current-items': (v: any[]) => {
          this.internalCurrentItems = v
          this.$emit('current-items', v)
        }
      },
      scopedSlots: {
        default: this.genDefaultScopedSLot
      }
    })
  }
})
