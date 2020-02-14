// Styles
import './VItemGroup.sass'

// Mixins
import Groupable from '../../mixins/groupable'
import Proxyable from '../../mixins/proxyable'
import Themeable from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import { VNode } from 'vue/types'

export type GroupableInstance = InstanceType<typeof Groupable> & {
  id?: string
  to?: any
  value?: any
 }

export const BaseItemGroup = mixins(
  Proxyable,
  Themeable
).extend({
  name: 'base-item-group',

  props: {
    activeClass: {
      type: String,
      default: 'v-item--active',
    },
    mandatory: Boolean,
    max: {
      type: [Number, String],
      default: null,
    },
    multiple: Boolean,
  },

  data () {
    return {
      // As long as a value is defined, show it
      // Otherwise, check if multiple
      // to determine which default to provide
      internalLazyValue: this.value !== undefined
        ? this.value
        : this.multiple ? [] : undefined,
      items: [] as GroupableInstance[],
    }
  },

  computed: {
    classes (): Record<string, boolean> {
      return {
        'v-item-group': true,
        ...this.themeClasses,
      }
    },
    selectedIndex (): number {
      return (this.selectedItem && this.items.indexOf(this.selectedItem)) || -1
    },
    selectedItem (): GroupableInstance | undefined {
      if (this.multiple) return undefined

      return this.selectedItems[0]
    },
    selectedItems (): GroupableInstance[] {
      return this.items.filter((item, index) => {
        return this.toggleMethod(this.getValue(item, index))
      })
    },
    selectedValues (): any[] {
      if (this.internalValue == null) return []

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
    },
  },

  watch: {
    internalValue: 'updateItemsState',
    items: 'updateItemsState',
  },

  created () {
    if (this.multiple && !Array.isArray(this.internalValue)) {
      consoleWarn('Model must be bound to an array if the multiple property is true.', this)
    }
  },

  methods: {

    genData (): object {
      return {
        class: this.classes,
      }
    },
    getValue (item: GroupableInstance, i: number): unknown {
      return item.value == null || item.value === ''
        ? i
        : item.value
    },
    onClick (item: GroupableInstance) {
      this.updateInternalValue(
        this.getValue(item, this.items.indexOf(item))
      )
    },
    register (item: GroupableInstance) {
      const index = this.items.push(item) - 1

      item.$on('change', () => this.onClick(item))

      // If no value provided and mandatory,
      // assign first registered item
      if (this.mandatory && !this.selectedValues.length) {
        this.updateMandatory()
      }

      this.updateItem(item, index)
    },
    unregister (item: GroupableInstance) {
      if (this._isDestroyed) return

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
    // https://github.com/vuetifyjs/vuetify/issues/5352
    updateItemsState () {
      this.$nextTick(() => {
        if (this.mandatory &&
          !this.selectedItems.length
        ) {
          return this.updateMandatory()
        }

        // TODO: Make this smarter so it
        // doesn't have to iterate every
        // child in an update
        this.items.forEach(this.updateItem)
      })
    },
    updateInternalValue (value: any) {
      this.multiple
        ? this.updateMultiple(value)
        : this.updateSingle(value)
    },
    updateMandatory (last?: boolean) {
      if (!this.items.length) return

      const items = this.items.slice()

      if (last) items.reverse()

      const item = items.find(item => !item.disabled)

      // If no tabs are available
      // aborts mandatory value
      if (!item) return

      const index = this.items.indexOf(item)

      this.updateInternalValue(
        this.getValue(item, index)
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
        // value would be increased above max
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
    },
  },

  render (h): VNode {
    return h('div', this.genData(), this.$slots.default)
  },
})

export default BaseItemGroup.extend({
  name: 'v-item-group',

  provide (): object {
    return {
      itemGroup: this,
    }
  },
})
