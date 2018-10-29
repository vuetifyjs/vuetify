import Vue, { VNode } from 'vue'
import { DataOptions, DataProps, DataPaginaton } from './VLocalData'
import { deepEqual } from '../../util/helpers'
import { PropValidator } from 'vue/types/options'

export default Vue.extend({
  name: 'v-server-data',

  props: {
    loadData: {
      type: Function,
      required: true
    },
    itemsKey: {
      type: String,
      default: 'items'
    },
    lengthKey: {
      type: String,
      default: 'length'
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
    } as PropValidator<DataOptions>
  },

  data () {
    return {
      loading: false,
      items: [],
      itemsLength: 0,
      internalOptions: this.options as DataOptions
    }
  },

  computed: {
    pageCount (): number {
      return this.internalOptions.itemsPerPage === -1
        ? 1
        : Math.ceil(this.computedLength / this.internalOptions.itemsPerPage) // TODO: can't use items.length here
    },
    pageStart (): number {
      return this.internalOptions.itemsPerPage === -1
        ? 0
        : (this.internalOptions.page - 1) * this.internalOptions.itemsPerPage
    },
    pageStop (): number {
      return this.internalOptions.itemsPerPage === -1
        ? this.computedLength
        : Math.min(this.computedLength, this.internalOptions.page * this.internalOptions.itemsPerPage)
    },
    computedLength (): number {
      return this.itemsLength > -1 ? this.itemsLength : this.items.length
    },
    pagination (): DataPaginaton {
      return {
        page: this.internalOptions.page,
        itemsPerPage: this.internalOptions.itemsPerPage,
        pageStart: this.pageStart,
        pageStop: this.pageStop,
        pageCount: this.pageCount,
        itemsLength: this.computedLength
      }
    }
  },

  watch: {
    options (options: DataOptions) {
      this.internalOptions = options
    },
    internalOptions: {
      handler (options: DataOptions, oldOptions: DataOptions) {
        if (deepEqual(options, oldOptions)) return

        this.internalLoadData()
        this.$emit('update:options', options)
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    createScopedProps (): DataProps {
      const props = {
        items: this.items,
        pagination: this.pagination,
        loading: this.loading
      }

      Object.defineProperties(props, {
        options: {
          get: () => this.internalOptions,
          set: v => this.internalOptions = v
        }
      })

      return props as any
    },
    internalLoadData () {
      this.loading = true
      this.loadData(this.internalOptions, this.itemsKey, this.lengthKey)
        .then((response: any) => {
          console.log(response)
          this.items = response[this.itemsKey]
          this.itemsLength = response[this.lengthKey]
        })
        .catch((error: any) => {
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  render (h): VNode {
    return this.$scopedSlots.default(this.createScopedProps()) as any
  }
})
