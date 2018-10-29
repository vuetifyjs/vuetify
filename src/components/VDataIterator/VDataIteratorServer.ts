import Vue, { VNode, VNodeChildrenArrayContents } from 'vue'
import VLocalData, { DataOptions, DataProps, DataPaginaton } from '../VData/VLocalData'
import { PropValidator } from 'vue/types/options'
import { getObjectValueByPath, deepEqual } from '../../util/helpers'

export default Vue.extend({
  name: 'v-data-iterator-server',

  props: {
    loadData: {
      type: Function,
      required: true
    },
    options: {
      type: Object,
      default: () => ({
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: []
      })
    } as PropValidator<DataOptions>,
    itemKey: {
      type: String,
      default: 'id'
    },
    itemsKey: {
      type: String,
      default: 'data'
    },
    lengthKey: {
      type: String,
      default: 'count'
    },
    value: {
      type: Array,
      default: () => []
    } as PropValidator<any[]>,
    singleSelect: Boolean,
    expanded: {
      type: Array,
      default: () => []
    } as PropValidator<any[]>,
    singleExpand: Boolean
  },

  data () {
    return {
      loading: false,
      items: [],
      itemsLength: 0,
      internalOptions: this.options as DataOptions,
      selection: {} as Record<string, boolean>,
      expansion: {} as Record<string, boolean>
    }
  },

  computed: {
    computedPagination (): DataPaginaton {
      return {
        page: this.internalOptions.page,
        itemsPerPage: this.internalOptions.itemsPerPage,
        pageStart: (this.internalOptions.page - 1) * this.internalOptions.itemsPerPage,
        pageStop: ((this.internalOptions.page - 1) * this.internalOptions.itemsPerPage) + this.internalOptions.itemsPerPage,
        pageCount: Math.ceil(this.itemsLength / this.internalOptions.itemsPerPage),
        itemsLength: this.itemsLength
      }
    }
  },

  watch: {
    internalOptions: {
      handler () {
        this.query()
      },
      deep: true,
      immediate: true
    },
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
        // const selected = !keys.length ? [] : this.items.filter(i => keys.includes(String(getObjectValueByPath(i, this.itemKey))))
        // this.$emit('input', selected)
      },
      deep: true
    }
  },

  methods: {
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
    query () {
      this.loading = true
      this.loadData(this.internalOptions, this.itemsKey, this.lengthKey)
        .then((response: any) => {
          this.items = response[this.itemsKey]
          this.itemsLength = response[this.lengthKey]
        })
        .catch((error: any) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    itemSlotProps (item: any) {
      const props = {
        item
      }

      Object.defineProperties(props, {
        selected: {
          get: () => this.isSelected(item),
          set: (value: boolean) => this.select(item, value),
          enumerable: true
        },
        expanded: {
          get: () => this.isExpanded(item),
          set: v => this.expand(item, v),
          enumerable: true
        }
      })

      return props
    },
    genItems (props: DataProps) {
      if (this.$scopedSlots.default) return this.$scopedSlots.default(props)

      if (this.$scopedSlots.item) {
        console.log(props.items)
        return props.items.map((item: any) => this.$scopedSlots.item(this.itemSlotProps(item)))
      }

      return []
    },
    genSlots (slot: string, props: any) {
      return [
        ...this.$slots[slot] || [],
        this.$scopedSlots[slot] && this.$scopedSlots[slot](props)
      ]
    },
    createSlotProps () {
      const props = {
        items: this.items
      } as any as DataProps

      Object.defineProperties(props, {
        pagination: {
          get: () => this.computedPagination
        },
        options: {
          get: () => this.internalOptions,
          set: v => this.internalOptions = v
        }
      })

      return props
    },
    genContent (): VNodeChildrenArrayContents {
      const props = this.createSlotProps()

      return [
        this.genSlots('prepend', props),
        this.genItems(props),
        this.genSlots('append', props)
      ]
    }
  },

  render (h): VNode {
    return this.$createElement('div', {
      staticClass: 'v-data-iterator-server'
    }, this.genContent())
  }
})
