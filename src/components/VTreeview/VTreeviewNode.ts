// Types
import { VNode } from 'vue'

// Components
import { VTreeviewNode } from '.'
import { VIcon } from '../VIcon'

// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable'

// Utils
import mixins from '../../util/mixins'
import { getObjectValueByPath } from '../../util/helpers'

export const VTreeviewNodeProps = {
  selectable: Boolean,
  selectedColor: {
    type: String,
    default: 'accent'
  },
  indeterminateIcon: {
    type: String,
    default: '$vuetify.icons.checkboxIndeterminate'
  },
  onIcon: {
    type: String,
    default: '$vuetify.icons.checkboxOn'
  },
  offIcon: {
    type: String,
    default: '$vuetify.icons.checkboxOff'
  },
  toggleIcon: {
    type: String,
    default: 'arrow_right'
  },
  loadingIcon: {
    type: String,
    default: 'cached'
  },
  itemKey: {
    type: String,
    default: 'id'
  },
  itemText: {
    type: String,
    default: 'name'
  },
  itemChildren: {
    type: String,
    default: 'children'
  },
  loadChildren: Function
}

export default mixins(
  RegistrableInject('treeview')
  /* @vue/component */
).extend({
  name: 'v-treeview-node',

  inject: {
    treeview: {
      default: null
    }
  },

  props: {
    item: {
      type: Object,
      default: () => null
    },
    ...VTreeviewNodeProps
  },

  data: () => ({
    isOpen: false, // Node is open/expanded
    isSelected: false, // Node is selected (checkbox)
    isIndeterminate: false, // Node has at least one selected child
    isActive: false, // Node is selected (row)
    isLoading: false // Is loading children
  }),

  computed: {
    key (): string {
      return getObjectValueByPath(this.item, this.itemKey)
    },
    children (): any[] | null {
      return getObjectValueByPath(this.item, this.itemChildren)
    },
    text (): string {
      return getObjectValueByPath(this.item, this.itemText)
    },
    scopedProps (): object {
      return {
        item: this.item,
        leaf: !this.children,
        selected: this.isSelected,
        active: this.isActive
      }
    },
    computedIcon (): string {
      if (this.isIndeterminate) return this.indeterminateIcon
      else if (this.isSelected) return this.onIcon
      else return this.offIcon
    }
  },

  created () {
    this.treeview.register(this)
  },

  beforeDestroy () {
    this.treeview.unregister(this)
  },

  methods: {
    async checkChildren () {
      if (!this.children || this.children.length || !this.loadChildren) return

      this.isLoading = true
      await this.loadChildren(this.item)
      this.isLoading = false
    },
    genLabel () {
      return this.$createElement('label', {
        slot: 'label',
        staticClass: 'v-treeview-node__label'
      }, [this.text])
    },
    genContent () {
      const children = []

      if (this.$scopedSlots.prepend) children.push(this.$scopedSlots.prepend(this.scopedProps))

      children.push(this.genLabel())

      if (this.$scopedSlots.append) children.push(this.$scopedSlots.append(this.scopedProps))

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__content'
      }, children)
    },
    genToggle () {
      return this.$createElement(VIcon, {
        staticClass: 'v-treeview-node__toggle',
        class: {
          'v-treeview-node__toggle--open': this.isOpen,
          'v-treeview-node__toggle--loading': this.isLoading
        },
        slot: 'prepend',
        on: {
          click: async (e: MouseEvent) => {
            e.stopPropagation()

            if (this.isLoading) return

            await this.checkChildren()

            this.isOpen = !this.isOpen
          }
        }
      }, [this.isLoading ? this.loadingIcon : this.toggleIcon])
    },
    genCheckbox () {
      return this.$createElement(VIcon, {
        staticClass: 'v-treeview-node__checkbox',
        props: {
          color: this.isSelected ? this.selectedColor : undefined
        },
        on: {
          click: async (e: MouseEvent) => {
            e.stopPropagation()

            if (this.isLoading) return

            await this.checkChildren()

            this.isSelected = !this.isSelected
            this.isIndeterminate = false

            this.treeview.updateSelected(this.key, { isSelected: this.isSelected, isIndeterminate: this.isIndeterminate })
          }
        }
      }, [this.computedIcon])
    },
    genNode (): VNode {
      const children = [this.genContent()]

      if (this.selectable) children.unshift(this.genCheckbox())
      if (this.children) children.unshift(this.genToggle())

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__root',
        class: {
          'v-treeview-node__root--active': this.isActive
        },
        on: {
          click: () => {
            this.isActive = !this.isActive
            this.treeview.updateActive(this.key, this.isActive)
          }
        }
      }, children)
    },
    genChild (item: any): VNode {
      return this.$createElement(VTreeviewNode, {
        key: getObjectValueByPath(item, this.itemKey),
        props: {
          item,
          selectable: this.selectable,
          indeterminateIcon: this.indeterminateIcon,
          offIcon: this.offIcon,
          onIcon: this.onIcon,
          loadingIcon: this.loadingIcon,
          itemText: this.itemText,
          itemChildren: this.itemChildren,
          loadChildren: this.loadChildren
        },
        scopedSlots: this.$scopedSlots
      })
    },
    genChildren (): any {
      return this.$createElement('div', {
        staticClass: 'v-treeview-node__children'
      }, this.isOpen ? this.children!.map(this.genChild) : [])
    }
  },

  render (h): VNode {
    const children = [this.genNode()]

    if (this.children) children.push(this.genChildren())

    return h('div', {
      staticClass: 'v-treeview-node',
      class: {
        'v-treeview-node--leaf': !this.children
      }
    }, children)
  }
})
