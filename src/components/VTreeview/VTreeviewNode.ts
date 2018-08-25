import { VNode } from 'vue'
import { VTreeviewNode } from '.'
import { VIcon } from '../VIcon'

import { inject as RegistrableInject } from '../../mixins/registrable'
import mixins from '../../util/mixins'

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
    selectable: Boolean,
    indeterminateIcon: String,
    onIcon: String,
    offIcon: String
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
        data: this.data,
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

  created (): void {
    this.treeview.register(this)
  },

  beforeDestroy () {
    this.treeview.unregister(this)
  },

  methods: {
    genLabel () {
      const children = []

      if (this.data.icon) children.push(this.$createElement(VIcon, [this.data.icon]))
      children.push(this.data.name)

      return this.$createElement('label', {
        slot: 'label',
        staticClass: 'v-treeview-node__label'
      }, children)
    },
    genContent () {
      const children = [this.genLabel(), this.genActions()]

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
    genActions () {
      return this.$scopedSlots.actions && this.$scopedSlots.actions(this.scopedProps)
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
          onIcon: this.onIcon
        },
        scopedSlots: this.$scopedSlots
      })
    },
    genChildren (): any {
      return this.$createElement('div', {
        staticClass: 'v-treeview-node__children',
        directives: [{
          name: 'show',
          value: this.isOpen
        }] as any
      }, this.data.children.map(this.genChild))
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
