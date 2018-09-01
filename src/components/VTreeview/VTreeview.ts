// Styles
import '../../stylus/components/_treeview.styl'

// Types
import { VNode, VNodeChildrenArrayContents } from 'vue'
import { PropValidator } from '../../../node_modules/vue/types/options'

// Components
import VTreeviewNode, { VTreeviewNodeProps } from './VTreeviewNode'

// Mixins
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Utils
import { getObjectValueByPath, deepEqual } from '../../util/helpers'
import mixins from '../../util/mixins'

type VTreeviewNodeInstance = InstanceType<typeof VTreeviewNode>

type NodeState = {
  parent: number | string | null
  children: (number | string)[]
  vnode: VTreeviewNodeInstance | null
  isActive: boolean
  isSelected: boolean
  isIndeterminate: boolean
}

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
      updateSelected: this.updateSelected,
      emitSelected: this.emitSelected
    }

    return { treeview }
  },

  props: {
    items: {
      type: Array,
      default: () => ([])
    } as PropValidator<any[]>,
    selected: Array as PropValidator<(string | number)[]>,
    active: Array as PropValidator<(string | number)[]>,
    multipleActive: Boolean,
    ...VTreeviewNodeProps
  },

  data: () => ({
    nodes: {} as Record<string | number, NodeState>,
    internalSelected: [] as (string | number)[]
  }),

  watch: {
    items: {
      handler () {
        this.buildTree(this.items, Object.assign({}, this.nodes))
      },
      deep: true,
      immediate: true
    },
    selected: {
      handler (newVal, oldVal) {
        if (!newVal || deepEqual(newVal, this.internalSelected)) return

        this.selected.forEach(key => this.updateSelected(key, true))
        this.emitSelected()
      },
      immediate: true
    }
  },

  methods: {
    buildTree (items: any[], oldState: Record<string | number, NodeState>, parent = null) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const key = getObjectValueByPath(item, this.itemKey)
        const children = getObjectValueByPath(item, this.itemChildren, [])

        const node: any = {
          vnode: null,
          parent,
          children: children.map((c: any) => getObjectValueByPath(c, this.itemKey))
        }

        this.buildTree(children, oldState, key)

        node.isSelected = oldState.hasOwnProperty(key) ? oldState[key].isSelected : false
        node.isIndeterminate = oldState.hasOwnProperty(key) ? oldState[key].isIndeterminate : false
        node.isActive = oldState.hasOwnProperty(key) ? oldState[key].isActive : false

        this.nodes[key] = !children.length ? node : this.calculateState(node, oldState)

        this.updateVnodeState(key)
      }
    },
    register (node: VTreeviewNodeInstance) {
      const key = getObjectValueByPath(node.item, this.itemKey)
      this.nodes[key].vnode = node

      this.updateVnodeState(key)
    },
    unregister (node: VTreeviewNodeInstance) {
      const key = getObjectValueByPath(node.item, this.itemKey)
      this.nodes[key].vnode = null
    },
    updateActive (key: string | number, value: boolean) {
      if (!this.multipleActive) {
        Object.keys(this.nodes).forEach(active => {
          this.nodes[active].isActive = false

          this.updateVnodeState(active)
        })
      }

      if (value) this.nodes[key].isActive = value

      this.updateVnodeState(key)
    },
    calculateState (node: NodeState, state: Record<string | number, NodeState>) {
      const counts = node.children.reduce((counts: number[], child: string | number) => {
        counts[0] += +(state.hasOwnProperty(child) ? state[child].isSelected : false)
        counts[1] += +(state.hasOwnProperty(child) ? state[child].isIndeterminate : false)
        return counts
      }, [0, 0])

      node.isSelected = !!node.children.length && counts[0] === node.children.length
      node.isIndeterminate = !node.isSelected && (counts[0] > 0 || counts[1] > 0)

      return node
    },
    updateSelected (key: string | number, isSelected: boolean) {
      if (!this.nodes.hasOwnProperty(key)) return

      const descendants = [key, ...this.getDescendants(key)]
      descendants.forEach(descendant => {
        this.nodes[descendant].isSelected = isSelected
        this.nodes[descendant].isIndeterminate = false
      })

      const parents = this.getParents(key)
      parents.forEach(parent => {
        this.nodes[parent] = this.calculateState(this.nodes[parent], this.nodes)
      })

      const all = [key, ...descendants, ...parents]
      all.forEach(this.updateVnodeState)

      this.internalSelected = Object.keys(this.nodes)
        .filter(k => this.nodes[k].isSelected)
        .map(k => isNaN(Number(k)) ? k : Number(k))
    },
    emitSelected () {
      this.$emit('update:selected', this.internalSelected)
    },
    getDescendants (key: string | number, descendants: (string | number)[] = []) {
      const children = this.nodes[key].children

      descendants.push(...children)

      for (let i = 0; i < children.length; i++) {
        descendants = this.getDescendants(children[i], descendants)
      }

      return descendants
    },
    getParents (key: string | number) {
      let parent = this.nodes[key].parent

      const parents = []
      while (parent !== null) {
        parents.push(parent)
        parent = this.nodes[parent].parent
      }

      return parents
    },
    updateVnodeState (key: string | number) {
      const node = this.nodes[key]

      if (node && node.vnode) {
        node.vnode.isSelected = node.isSelected
        node.vnode.isIndeterminate = node.isIndeterminate
        node.vnode.isActive = node.isActive
      }
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
