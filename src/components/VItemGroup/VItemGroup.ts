// Styles
import '../../stylus/components/_item-group.styl'

// Mixins
import Proxyable from '../../mixins/proxyable'
import { provide as RegistrableProvide, Registrable } from '../../mixins/registrable'

// Utilities
import mixins, { ExtractVue } from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import Vue, { VNode } from 'vue/types'

interface GroupableComponent extends Vue {
  toggle: (v: boolean) => void
  value: unknown
}

type Groupable = GroupableComponent | Element

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
      items: [] as Groupable[]
    }
  },

  computed: {
    classes (): object {
      return {
        'v-item-group--horizontal': this.horizontal
      }
    },
    selectedItems (): Groupable[] {
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
    if (this.multiple && !Array.isArray(this.value)) {
      consoleWarn('Model must be bound to an array if the multiple property is true.', this)
    }
  },

  mounted () {
    if (this.registerChildren) {
      const container = this.$refs.container
      const children = [...container.children]

      for (const child of children) {
        this.register(child)
      }
    }

    this.init()
  },

  methods: {
    getValue (item: Groupable, i: number): unknown {
      if (item instanceof Element) {
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
    register (item: Groupable) {
      if (item instanceof Element) {
        this.registerElement(item)
      } else {
        this.registerComponent(item)
      }
    },
    registerComponent (item: GroupableComponent) {
      const index = this.items.push(item) - 1

      item.$on('click', () => this.onClick(index))
    },
    registerElement (item: Element) {
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

      (this.items as GroupableComponent[]).forEach((item, i) => {
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
    unregister (item: Groupable) {
      if (item instanceof Element) {
        this.unregisterElement(item)
      } else {
        this.unregisterComponent(item)
      }
    },
    unregisterComponent (item: GroupableComponent) {
      this.items = (this.items as GroupableComponent[]).filter(component => {
        return component._uid !== item._uid
      })
    },
    unregisterElement (item: Element) {
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
