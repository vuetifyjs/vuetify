import Vue, { VNode, VNodeChildrenArrayContents } from 'vue'
import { VTreeviewNode } from '.'
import { VIcon } from '../VIcon'

import { inject as RegistrableInject, provide as RegistrableProvide } from '../../mixins/registrable'
import mixins from '../../util/mixins'

export default mixins(
  RegistrableInject('treeview'),
  RegistrableProvide('treeview')
).extend({
  name: 'v-treeview-node',

  provide (): object {
    const treeview = {
      register: this.register,
      unregister: this.unregister,
      updateParent: this.updateParent
    }

    return { treeview }
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
    children: [] as any[]
  }),

  computed: {
    isLeaf (): boolean {
      return !this.data.children
    },
    scopedProps (): object {
      return {
        data: this.data,
        isLeaf: this.isLeaf
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
    register (child: InstanceType<typeof VTreeviewNode>) {
      this.children.push(child)

      this.treeview.register(child)
    },
    unregister (child: InstanceType<typeof VTreeviewNode>) {
      this.children = this.children.filter((c: any) => c._uid !== child._uid)

      this.treeview.unregister(child)
    },
    updateParent () {
      if (!this.isLeaf) {
        const numberOfSelectedChildren = this.children.reduce((count, c) => count + c.isSelected, 0)

        this.isSelected = numberOfSelectedChildren === this.children.length
        this.isIndeterminate = !this.isSelected && numberOfSelectedChildren > 0
      }

      this.treeview.updateParent()
    },
    updateChildren () {
      this.children.forEach(c => c.isSelected = this.isSelected)
    },
    genLabel () {
      if (this.$scopedSlots.label) return this.$scopedSlots.label(this.scopedProps)

      const children = [this.data.name]

      if (this.data.icon) children.unshift(this.$createElement(VIcon, [this.data.icon]))

      return this.$createElement('label', {
        slot: 'label',
        staticClass: 'v-treeview-node__label'
      }, children)
    },
    genToggle () {
      return this.$createElement(VIcon, {
        staticClass: 'v-treeview-node__toggle',
        slot: 'prepend',
        on: {
          click: () => {
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
        on: {
          click: () => {
            this.isSelected = !this.isSelected

            if (this.isLeaf) {
              this.treeview.updateParent()
            } else {
              this.updateChildren()
              this.updateParent()
            }
          }
        }
      }, [this.computedIcon])
    },
    genNode (): VNode {
      const children = [this.genLabel(), this.genActions()]

      if (this.selectable) children.unshift(this.genCheckbox())
      if (!this.isLeaf) children.unshift(this.genToggle())

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__root'
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
