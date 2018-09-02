// Styles
import '../../stylus/components/_item-group.styl'

// Mixins
import Proxyable from '../../mixins/proxyable'
import Groupable from '../../mixins/groupable'

// Utilities
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import { VNode } from 'vue/types'

type GroupableInstance = InstanceType<typeof Groupable>

export default mixins(Proxyable).extend({
  name: 'v-item-group',

  provide (): object {
    return {
      itemGroup: this
    }
  },

  props: {
    activeClass: {
      type: String,
      default: 'v-item--active'
    },
    mandatory: Boolean,
    max: {
      type: [Number, String],
      default: null
    },
    multiple: Boolean
  },

  data () {
    return {
      // As long as a value is defined, show it
      // Otherwise, check if multiple
      // to determine which default to provide
      internalLazyValue: this.value !== undefined
        ? this.value
        : this.multiple ? [] : undefined,
      items: [] as GroupableInstance[]
    }
  },

  computed: {
    selectedItems (): GroupableInstance[] {
      return this.items.filter((item, index) => {
        return this.toggleMethod(this.getValue(item, index))
      })
    },
    toggleMethod (): (v: any) => boolean {
      if (!this.multiple) {
        return (v: any) => this.internalValue === v
      }

      const internalValue = this.internalValue
      if (Array.isArray(internalValue)) {
        return (v: any) => internalValue.includes(v)
      }

      return () => false
    }
  },

  watch: {
    internalValue: 'updateItemsState'
  },

  created () {
    if (this.multiple && !Array.isArray(this.internalValue)) {
      consoleWarn('Model must be bound to an array if the multiple property is true.', this)
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    getValue (item: GroupableInstance, i: number): unknown {
      return item.value == null || item.value === ''
        ? i
        : item.value
    },
    init () {
      this.updateItemsState()
    },
    onClick (index: number) {
      this.updateInternalValue(
        this.getValue(this.items[index], index)
      )
    },
    register (item: GroupableInstance) {
      const index = this.items.push(item) - 1

      item.$on('change', () => this.onClick(index))
    },
    unregister (item: GroupableInstance) {
      this.items.splice(this.items.indexOf(item), 1)
    },
    updateItemsState () {
      if (this.mandatory &&
        !this.selectedItems.length &&
        this.items.length > 0
      ) {
        return this.updateInternalValue(
          this.getValue(this.items[0], 0)
        )
      }

      this.items.forEach((item, i) => {
        const value = this.getValue(item, i)

        item.isActive = this.toggleMethod(value)
      })
    },
    updateInternalValue (value: any) {
      this.multiple
        ? this.updateMultiple(value)
        : this.updateSingle(value)
    },
    updateMultiple (value: any) {
      const defaultValue = Array.isArray(this.internalValue)
        ? this.internalValue
        : []
      const internalValue = defaultValue.slice()
      const index = internalValue.findIndex(val => val === value)

      if (
        this.mandatory &&
        // Item already exists
        index > -1 &&
        // value would be reduced below min
        internalValue.length - 1 < 1
      ) return

      if (
        // Max is set
        this.max != null &&
        // Item doesn't exist
        index < 0 &&
        // value woudl be increased above max
        internalValue.length + 1 > this.max
      ) return

      index > -1
        ? internalValue.splice(index, 1)
        : internalValue.push(value)

      this.internalValue = internalValue
    },
    updateSingle (value: any) {
      const isSame = value === this.internalValue

      if (this.mandatory && isSame) return

      this.internalValue = isSame ? undefined : value
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-item-group'
    }, this.$slots.default)
  }
})
