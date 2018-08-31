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
    horizontal: Boolean,
    mandatory: Boolean,
    max: {
      type: [Number, String],
      default: null
    },
    multiple: Boolean,
    registerChildren: Boolean
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
    classes (): object {
      return {
        'v-item-group--horizontal': this.horizontal
      }
    },
    selectedItems (): Element[] {
      return this.items.filter((item, index) => {
        return this.toggleMethod(this.getValue(item, index))
      })
    },
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
    if (this.multiple && !Array.isArray(this.value)) {
      consoleWarn('Model must be bound to an array if the multiple property is true.', this)
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    getValue (item: Element, i: number): unknown {
      const value = item.getAttribute('data-value')

      return value || i
    },
    init () {
      const container = this.$refs.container
      const children = [...container.children]

      for (const child of children) {
        this.register(child)
      }

      this.updateItemsState()
    },
    onClick (index: number) {
      const value = this.getValue(this.items[index], index)

      this.multiple
        ? this.updateMultiple(value)
        : this.updateSingle(value)
    },
    register (item: Element) {
      const index = this.items.push(item) - 1

      if (!item.getAttribute('data-value')) {
        item.setAttribute('data-value', String(index))
      }

      item.addEventListener('click', () => this.onClick(index))
    },
    updateItemsState () {
      if (this.mandatory &&
        !this.selectedItems.length &&
        this.items.length > 0
      ) return this.onClick(0)

      this.items.forEach((item, i) => {
        const value = this.getValue(item, i)
        const method = this.toggleMethod(value) ? 'add' : 'remove'

        item.classList[method](this.activeClass)
      })
    },
    updateMultiple (value: any) {
      const internalValue = ((this.internalValue || []) as string[]).slice()
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
      const value = item.getAttribute('data-value')

      this.items = (this.items as Element[]).filter(element => {
        return element.getAttribute('data-value') !== value
      })
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-item-group',
      class: this.classes
    }, [
      h('div', {
        staticClass: 'v-item-group__container',
        ref: 'container'
      }, this.$slots.default)
    ])
  }
})
