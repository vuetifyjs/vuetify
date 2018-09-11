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

function ston (s: string | number) {
  const n = Number(s)
  return !isNaN(n) ? n : s
}

export default mixins(
  RegistrableProvide('treeview')
  /* @vue/component */
).extend({
  name: 'v-treeview',

  provide (): object {
    return { treeview: this }
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    active: Array as PropValidator<(string | number)[]>,
    items: {
      type: Array,
      default: () => ([])
    } as PropValidator<any[]>,
    multipleActive: Boolean,
    value: {
      type: Array,
      default: () => ([])
    } as PropValidator<(string | number)[]>,
    ...VTreeviewNodeProps
  },

  data: () => ({
    nodes: {} as Record<string | number, NodeState>,
    selectedCache: [] as (string | number)[],
    activeCache: [] as (string | number)[]
  }),

  watch: {
    items: {
      handler () {
        // We only care if nodes are removed or added
        if (Object.keys(this.nodes).length === this.countItems(this.items)) return

        const oldSelectedCache = this.selectedCache.slice()
        this.selectedCache = []
        this.activeCache = []
        this.buildTree(this.items)

        // Only emit selected if selection has changed
        // as a result of items changing. This fixes a
        // potential double emit when selecting a node
        // with dynamic children
        if (!deepEqual(oldSelectedCache, this.selectedCache)) this.onChange()
      },
      deep: true
    },
    value (v) {
      if (!v || deepEqual(v, this.selectedCache)) return

      this.value.forEach(key => this.updateSelected(key, true))
      this.onChange()
    }
  },

  created () {
    this.buildTree(this.items)
    this.value.forEach(key => this.updateSelected(key, true))
  },

  methods: {
    countItems (items: any[], count = 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        count += 1
        count += item.children ? this.countItems(item.children) : 0
      }

      return count
    },
    buildTree (items: any[], parent: (string | number | null) = null) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const key = getObjectValueByPath(item, this.itemKey)
        const children = getObjectValueByPath(item, this.itemChildren, [])
        const oldNode = this.nodes.hasOwnProperty(key) ? this.nodes[key] : {
          isSelected: false, isIndeterminate: false, isActive: false, vnode: null
        } as NodeState

        const node: any = {
          vnode: oldNode.vnode,
          parent,
          children: children.map((c: any) => getObjectValueByPath(c, this.itemKey))
        }

        this.buildTree(children, key)

        // This fixed bug with dynamic children resetting selected parent state
        if (!this.nodes.hasOwnProperty(key) && parent !== null && this.nodes.hasOwnProperty(parent)) {
          node.isSelected = this.nodes[parent].isSelected
          node.isIndeterminate = this.nodes[parent].isIndeterminate
        } else {
          node.isSelected = oldNode.isSelected
          node.isIndeterminate = oldNode.isIndeterminate
        }

        node.isActive = oldNode.isActive

        this.nodes[key] = !children.length ? node : this.calculateState(node, this.nodes)

        // Don't forget to rebuild cache
        if (this.nodes[key].isSelected) this.selectedCache.push(key)
        if (this.nodes[key].isActive) this.activeCache.push(key)

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
        this.activeCache.forEach(active => {
          this.nodes[active].isActive = false
          this.updateVnodeState(active)
        })

        this.activeCache = []
      }

      this.nodes[key].isActive = value
      if (value) this.activeCache.push(key)

      this.updateVnodeState(key)

      this.$emit('update:active', this.activeCache)
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

      const changed: Record<string | number, boolean> = {}

      const descendants = [key, ...this.getDescendants(key)]
      descendants.forEach(descendant => {
        this.nodes[descendant].isSelected = isSelected
        this.nodes[descendant].isIndeterminate = false
        changed[descendant] = isSelected
      })

      const parents = this.getParents(key)
      parents.forEach(parent => {
        this.nodes[parent] = this.calculateState(this.nodes[parent], this.nodes)
        changed[parent] = this.nodes[parent].isSelected
      })

      const all = [key, ...descendants, ...parents]
      all.forEach(this.updateVnodeState)

      this.selectedCache = this.selectedCache.filter(k => changed[ston(k)] !== false)
      this.selectedCache.push(...Object.keys(changed).filter(k => changed[k] === true).map(ston))
    },
    onChange () {
      this.$emit('change', this.selectedCache)
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
