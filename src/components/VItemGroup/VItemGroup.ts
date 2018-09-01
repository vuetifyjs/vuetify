// Styles
import '../../stylus/components/_item-group.styl'

// Mixins
import Proxyable from '../../mixins/proxyable'
import { provide as RegistrableProvide, Registrable } from '../../mixins/registrable'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import { VNode } from 'vue/types'

interface options {
  $refs: {
    container: Element
  }
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    typeof Proxyable,
    Registrable<'group'>
  ]>
/* eslint-enable indent */
>(
  Proxyable,
  RegistrableProvide('group')
  /* @vue/component */
).extend({
  name: 'v-item-group',

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
      items: [] as Element[]
    }
  },

  computed: {
    selectedItems (): Element[] {
      return this.items.filter(item => {
        return this.toggleMethod(this.getValue(item))
      })
    },
    // Convert value to string
    // HTML data-attribute will
    // always be a string
    toggleMethod (): (v: any) => boolean {
      if (!this.multiple) {
        return (v: any) => this.internalValue === String(v)
      }

      const internalValue = this.internalValue

      if (Array.isArray(internalValue)) {
        return (v: any) => internalValue.includes(String(v))
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

  updated () {
    this.items = []
    const children = [...this.$el.children]

    children.forEach(this.register)
  },

  methods: {
    getValue (item: Element | null): string | null {
      if (!item) return item

      return item.getAttribute('data-value')
    },
    init () {
      [...this.$el.children].forEach(this.register)

      this.updateItemsState()
    },
    onClick (e: Event) {
      this.updateInternalValue(
        this.getValue(e.currentTarget as Element)
      )
    },
    register (item: Element) {
      const index = this.items.push(item) - 1

      if (!item.getAttribute('data-value')) {
        item.setAttribute('data-value', String(index))
      }

      item.addEventListener('click', this.onClick)
    },
    updateItemsState () {
      if (this.mandatory &&
        !this.selectedItems.length &&
        this.items.length > 0
      ) {
        return this.updateInternalValue(
          this.getValue(this.items[0])
        )
      }

      this.items.forEach(item => {
        const value = this.getValue(item)
        const method = this.toggleMethod(value) ? 'add' : 'remove'

        item.classList[method](this.activeClass)
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
    },
    unregister (item: Element) {
      this.items = (this.items as Element[]).filter(element => {
        const isRemoved = element !== item

        if (isRemoved) {
          item.removeEventListener('click', this.onClick)
        }

        return isRemoved
      })
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-item-group'
    }, this.$slots.default)
  }
})
