// Styles
import '../../stylus/components/_item-group.styl'

// Mixins
import Proxyable from '../../mixins/proxyable'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Utilities
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import Vue, { VNode, VNodeData } from 'vue/types'

interface Groupable extends Vue {
  toggle: Function
  value: undefined | null | number | string
}

interface HTMLCollection {
  [Symbol.iterator](): IterableIterator<HTMLElement>
}

type Toggleable = Groupable | HTMLElement

/* @vue/component */
export default mixins(
  Proxyable('inputValue'),
  RegistrableProvide('group')
).extend({
  name: 'v-item-group',

  props: {
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
      items: [] as Toggleable[]
    }
  },

  computed: {
    classes (): VNodeData['class'] {
      return {
        'v-item-group--horizontal': this.horizontal
      }
    },
    selectedItems (): Toggleable[] {
      return this.items.filter((item, index) => {
        return this.toggleMethod(this.getValue(item, index))
      })
    },
    toggleMethod (): Function {
      if (!this.multiple) {
        return (v: any) => this.internalValue === v
      }

      if (Array.isArray(this.internalValue)) {
        return (v: any) => ((this.internalValue || []) as string[]).includes(v)
      }

      return () => false
    }
  },

  watch: {
    internalValue: 'updateItemsState'
  },

  created () {
    if (this.multiple && !Array.isArray(this.inputValue)) {
      consoleWarn('Model must be bound to an array if the multiple property is true.', this)
    }
  },

  mounted () {
    if (this.registerChildren) {
      const container = (this.$refs.container as HTMLElement)
      const children = [...container.children] as HTMLCollection

      for (const child of children) {
        this.register(child)
      }
    }

    this.init()
  },

  methods: {
    getValue (item: Toggleable, i: number): string | number {
      if (item instanceof HTMLElement) {
        const value = item.getAttribute('data-value')

        return value || i
      } else if (item.value == null || item.value === '') {
        return i
      } else {
        return item.value
      }
    },
    init () {
      this.updateItemsState()
    },
    onClick (index: number) {
      const value = this.getValue(this.items[index], index)

      this.multiple
        ? this.updateMultiple(value)
        : this.updateSingle(value)
    },
    register (item: Toggleable) {
      if (item instanceof HTMLElement) {
        this.registerElement(item)
      } else {
        this.registerComponent(item)
      }
    },
    registerComponent (item: Groupable) {
      const index = this.items.push(item) - 1

      item.$on('click', () => this.onClick(index))
    },
    registerElement (item: HTMLElement) {
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
      ) {
        this.internalValue = this.getValue(this.items[0], 0)
        return
      }

      if (this.registerChildren) return

      (this.items as Groupable[]).forEach((item, i) => {
        const value = this.getValue(item, i)

        item.toggle(this.toggleMethod(value))
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
    unregister (item: Toggleable) {
      if (item instanceof HTMLElement) {
        this.unregisterElement(item)
      } else {
        this.unregisterComponent(item)
      }
    },
    unregisterComponent (item: Groupable) {
      this.items = (this.items as Groupable[]).filter(component => {
        return component._uid !== item._uid
      })
    },
    unregisterElement (item: HTMLElement) {
      const value = item.getAttribute('data-value')

      this.items = (this.items as HTMLElement[]).filter(element => {
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
