// Types
import { VNode } from 'vue'

// Components
import { VExpandTransition } from '../transitions'
import VTreeviewNode from './VTreeviewNode'
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
  expandIcon: {
    type: String,
    default: '$vuetify.icons.subgroup'
  },
  loadingIcon: {
    type: String,
    default: '$vuetify.icons.loading'
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
  loadChildren: Function,
  transition: Boolean
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
    isLoading: false
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
      // TODO: Potential issue with always trying
      // to load children if response is empty?
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
      const children = [
        this.$scopedSlots.prepend && this.$scopedSlots.prepend(this.scopedProps),
        this.genLabel(),
        this.$scopedSlots.append && this.$scopedSlots.append(this.scopedProps)
      ]

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
      }, [this.isLoading ? this.loadingIcon : this.expandIcon])
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

            // We nextTick here so that items watch in VTreeview has a chance to run first
            this.$nextTick(() => {
              this.isSelected = !this.isSelected
              this.isIndeterminate = false

              this.treeview.updateSelected(this.key, this.isSelected)
              this.treeview.emitSelected()
            })
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
          loadChildren: this.loadChildren,
          transition: this.transition
        },
        scopedSlots: this.$scopedSlots
      })
    },
    genChildrenWrapper (): any {
      if (!this.isOpen || !this.children) return null

      const children = [this.children.map(this.genChild)]

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__children'
      }, children)
    },
    genTransition () {
      return this.$createElement(VExpandTransition, [this.genChildrenWrapper()])
    }
  },

  render (h): VNode {
    const children = [this.genNode()]

    if (this.transition) children.push(this.genTransition())
    else children.push(this.genChildrenWrapper())

    return h('div', {
      staticClass: 'v-treeview-node',
      class: {
        'v-treeview-node--leaf': !this.children,
        'v-treeview-node--active': this.isActive,
        'v-treeview-node--selected': this.isSelected
      }
    }, children)
  }
})
