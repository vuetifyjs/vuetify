// Styles
import '../../stylus/components/_treeview.styl'

// Types
import { VNode, VNodeChildrenArrayContents } from 'vue'
import { PropValidator } from '../../../node_modules/vue/types/options'
import mixins from '../../util/mixins'

// Components
import VTreeviewNode, { VTreeviewNodeProps } from './VTreeviewNode'

// Mixins
import { provide as RegistrableProvide } from '../../mixins/registrable'

type VTreeviewNodeInstance = InstanceType<typeof VTreeviewNode>

/* eslint-disable no-use-before-define */
type TreeNode = {
  value: VTreeviewNodeInstance
  parent: TreeNode | null
  children: TreeNode[]
}
/* eslint-enable no-use-before-define */

export default mixins(
  RegistrableProvide('treeview')
  /* @vue/component */
).extend({
  name: 'v-treeview',

  provide (): object {
    const treeview = {
      register: this.register,
      unregister: this.unregister,
      updateActive: this.updateActive,
      updateSelected: this.updateSelected
    }

    return { treeview }
  },

  props: {
    items: {
      type: Array,
      default: () => ([])
    } as PropValidator<any[]>,
    multipleActive: Boolean,
    ...VTreeviewNodeProps
  },

  data: () => ({
    tree: [] as TreeNode[]
  }),

  methods: {
    register (child: VTreeviewNodeInstance) {
      const parentUid = child.$parent._uid
      if (parentUid === this._uid) {
        this.tree.push(this.createNode(child))
      } else {
        const parent = this.findNode(this.tree, parentUid)
        parent!.children.push(this.createNode(child, parent))
      }
    },
    unregister (child: VTreeviewNodeInstance) {
      const node = this.findNode(this.tree, child._uid)

      if (!node) return

      const parent = node.parent

      if (parent) parent.children = parent.children.filter((c: TreeNode) => c.value._uid !== child._uid)
      else this.tree = this.tree.filter((c: TreeNode) => c.value._uid !== child._uid)
    },
    createNode (value: VTreeviewNodeInstance, parent: TreeNode | null = null): TreeNode {
      return { value, parent, children: [] }
    },
    findNode (nodes: TreeNode[], uid: number): TreeNode | null {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        if (node.value._uid === uid) return node

        const found = this.findNode(node.children, uid)

        if (found) return found
      }

      return null
    },
    updateNodes (nodes: TreeNode[], callback: (node: TreeNode) => void) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        callback(node)

        this.updateNodes(node.children, callback)
      }
    },
    getDescendantNodes (node: TreeNode, descendants: TreeNode[] = []) {
      if (!node) return []

      descendants.push(...node.children)

      for (let i = 0; i < node.children.length; i++) {
        descendants = this.getDescendantNodes(node.children[i], descendants)
      }

      return descendants
    },
    getParentNodes (node: TreeNode | null) {
      node = node!.parent

      const parents = []
      while (node !== null) {
        parents.push(node)
        node = node.parent
      }

      return parents
    },
    updateActive (uid: number, value: boolean) {
      const active: any[] = []
      this.updateNodes(this.tree, (node: TreeNode) => {
        if (node.value._uid === uid) node.value.isActive = value
        else if (!this.multipleActive) node.value.isActive = false

        if (node.value.isActive) active.push(node.value.item)
      })

      this.$emit('update:active', active)
    },
    updateSelected (uid: number, value: boolean) {
      const node = this.findNode(this.tree, uid)

      if (!node) return

      this.getDescendantNodes(node)
        .forEach((c: TreeNode) => {
          c.value.isSelected = value
          c.value.isIndeterminate = false
        })

      this.getParentNodes(node)
        .forEach((p: TreeNode) => {
          const count = p.children.reduce((count: number, c: any) => count + (c.value.isSelected || c.value.isIndeterminate), 0)
          p.value.isSelected = count === p.children.length
          p.value.isIndeterminate = !p.value.isSelected && count > 0
        })

      const selected: any[] = []
      this.updateNodes(this.tree, (n: TreeNode) => {
        if (n.value.isSelected) selected.push(n.value.item)
      })

      this.$emit('update:selected', selected)
    }
  },

  render (h): VNode {
    const children: VNodeChildrenArrayContents = this.items.length
      ? this.items.map(VTreeviewNode.options.methods.genChild.bind(this))
      : this.$slots.default

    return h('div', {
      staticClass: 'v-treeview'
    }, children)
  }
})
