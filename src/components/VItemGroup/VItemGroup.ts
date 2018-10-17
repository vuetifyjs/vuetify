// Styles
import '../../stylus/components/_item-group.styl'

// Mixins
import Groupable from '../../mixins/groupable'
import Proxyable from '../../mixins/proxyable'
import Themeable from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import { VNode } from 'vue/types'

type GroupableInstance = InstanceType<typeof Groupable> & { value?: any }

export const BaseItemGroup = mixins(
  Proxyable,
  Themeable
).extend({
  name: 'base-item-group',

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
    classes (): Record<string, boolean> {
      return {
        ...this.themeClasses
      }
    },
    selectedItems (): GroupableInstance[] {
      return this.items.filter((item, index) => {
        return this.toggleMethod(this.getValue(item, index))
      })
    },
    selectedValues (): any[] {
      return Array.isArray(this.internalValue)
        ? this.internalValue
        : [this.internalValue]
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
    this.$nextTick(this.init)
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
    onClick (item: GroupableInstance, index: number) {
      this.updateInternalValue(
        this.getValue(item, index)
      )
    },
    register (item: GroupableInstance) {
      const index = this.items.push(item) - 1

      item.$on('change', () => this.onClick(item, index))
      this.updateItem(item, index)
    },
    unregister (item: GroupableInstance) {
      const index = this.items.indexOf(item)
      const value = this.getValue(item, index)

      this.items.splice(index, 1)

      const valueIndex = this.selectedValues.indexOf(value)

      // Items is not selected, do nothing
      if (valueIndex < 0) return

      // If not mandatory, use regular update process
      if (!this.mandatory) {
        return this.updateInternalValue(value)
      }

      // Remove the value
      if (this.multiple && Array.isArray(this.internalValue)) {
        this.internalValue = this.internalValue.filter(v => v !== value)
      } else {
        this.internalValue = undefined
      }

      // If mandatory and we have no selection
      // add the last item as value
      /* istanbul ignore else */
      if (!this.selectedItems.length) {
        this.updateMandatory(true)
      }
    },
    updateItem (item: GroupableInstance, index: number) {
      const value = this.getValue(item, index)

      item.isActive = this.toggleMethod(value)
    },
    updateItemsState () {
      if (this.mandatory &&
        !this.selectedItems.length
      ) {
        return this.updateMandatory()
      }

      // TODO: Make this smarter so it
      // doesn't have to iterate every
      // child in an update
      this.items.forEach(this.updateItem)
    },
    updateInternalValue (value: any) {
      this.multiple
        ? this.updateMultiple(value)
        : this.updateSingle(value)
    },
    updateMandatory (last?: boolean) {
      if (!this.items.length) return

      const index = last ? this.items.length - 1 : 0

      this.updateInternalValue(
        this.getValue(this.items[index], index)
      )
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
      staticClass: 'v-item-group',
      class: this.classes
    }, this.$slots.default)
  }
})

export default BaseItemGroup.extend({
  name: 'v-item-group',

  provide (): object {
    return {
      itemGroup: this
    }
  }
})
