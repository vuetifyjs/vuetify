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
  itemText: {
    type: String,
    default: 'name'
  },
  itemChildren: {
    type: String,
    default: 'children'
  }
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
    data: {
      type: Object,
      default: () => null
    },
    ...VTreeviewNodeProps
  },

  data: () => ({
    isOpen: false,
    isSelected: false,
    isIndeterminate: false,
    isActive: false,
    children: [] as any[]
  }),

  computed: {
    isLeaf (): boolean {
      return !this.data.children
    },
    scopedProps (): object {
      return {
        item: this.data,
        leaf: this.isLeaf,
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
    genLabel () {
      return this.$createElement('label', {
        slot: 'label',
        staticClass: 'v-treeview-node__label'
      }, [getObjectValueByPath(this.data, this.itemText)])
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
        slot: 'prepend',
        on: {
          click: (e: MouseEvent) => {
            e.stopPropagation()

            this.isOpen = !this.isOpen
          }
        }
      }, [this.isOpen ? 'arrow_drop_down' : 'arrow_right'])
    },
    genCheckbox () {
      return this.$createElement(VIcon, {
        staticClass: 'v-treeview-node__checkbox',
        on: {
          click: (e: MouseEvent) => {
            e.stopPropagation()

            this.isSelected = !this.isSelected
            this.isIndeterminate = false
            this.treeview.updateSelected(this._uid, this.isSelected)
          }
        }
      }, [this.computedIcon])
    },
    genNode (): VNode {
      const children = [this.genContent()]

      if (this.selectable) children.unshift(this.genCheckbox())
      if (!this.isLeaf) children.unshift(this.genToggle())

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__root',
        class: {
          'v-treeview-node__root--active': this.isActive
        },
        on: {
          click: () => {
            this.treeview.updateActive(this._uid, !this.isActive)
          }
        }
      }, children)
    },
    genChild (data: any): VNode {
      return this.$createElement(VTreeviewNode, {
        props: {
          data,
          selectable: this.selectable,
          indeterminateIcon: this.indeterminateIcon,
          offIcon: this.offIcon,
          onIcon: this.onIcon,
          itemText: this.itemText,
          itemChildren: this.itemChildren
        },
        scopedSlots: this.$scopedSlots
      })
    },
    genChildren (): any {
      const children = getObjectValueByPath(this.data, this.itemChildren)

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__children',
        directives: [{
          name: 'show',
          value: this.isOpen
        }] as any
      }, children.map(this.genChild))
    }
  },

  render (h): VNode {
    const children = [this.genNode()]

    if (!this.isLeaf) children.push(this.genChildren())

    return h('div', {
      staticClass: 'v-treeview-node',
      class: {
        'v-treeview-node--leaf': this.isLeaf
      }
    }, children)
  }
})
