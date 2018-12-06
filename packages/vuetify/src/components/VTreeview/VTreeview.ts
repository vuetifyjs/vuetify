// Styles
import '../../stylus/components/_treeview.styl'

// Types
import { VNode, VNodeChildrenArrayContents } from 'vue'
import { PropValidator } from 'vue/types/options'

// Components
import VTreeviewNode, { VTreeviewNodeProps } from './VTreeviewNode'

// Mixins
import Themeable from '../../mixins/themeable'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Utils
import { getObjectValueByPath, deepEqual } from '../../util/helpers'
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'

type VTreeviewNodeInstance = InstanceType<typeof VTreeviewNode>

type NodeCache = Set<string | number>
type NodeArray = (string | number)[]

type NodeState = {
  parent: number | string | null
  children: (number | string)[]
  vnode: VTreeviewNodeInstance | null
  isActive: boolean
  isSelected: boolean
  isIndeterminate: boolean
  isOpen: boolean
}

function ston (s: string | number) {
  const n = Number(s)
  return !isNaN(n) ? n : s
}

export default mixins(
  RegistrableProvide('treeview'),
  Themeable
  /* @vue/component */
).extend({
  name: 'v-treeview',

  provide (): object {
    return { treeview: this }
  },

  props: {
    active: {
      type: Array,
      default: () => ([])
    } as PropValidator<NodeArray>,
    items: {
      type: Array,
      default: () => ([])
    } as PropValidator<any[]>,
    hoverable: Boolean,
    multipleActive: Boolean,
    open: {
      type: Array,
      default: () => ([])
    } as PropValidator<NodeArray>,
    openAll: Boolean,
    value: {
      type: Array,
      default: () => ([])
    } as PropValidator<NodeArray>,
    ...VTreeviewNodeProps
  },

  data: () => ({
    nodes: {} as Record<string | number, NodeState>,
    selectedCache: new Set() as NodeCache,
    activeCache: new Set() as NodeCache,
    openCache: new Set() as NodeCache
  }),

  watch: {
    items: {
      handler () {
        // We only care if nodes are removed or added
        if (Object.keys(this.nodes).length === this.countItems(this.items)) return

        const oldSelectedCache = [...this.selectedCache]
        this.selectedCache = new Set()
        this.activeCache = new Set()
        this.openCache = new Set()
        this.buildTree(this.items)

        // Only emit selected if selection has changed
        // as a result of items changing. This fixes a
        // potential double emit when selecting a node
        // with dynamic children
        if (!deepEqual(oldSelectedCache, [...this.selectedCache])) this.emitSelected()
      },
      deep: true
    },
    active (value: (string | number)[]) {
      const old = [...this.activeCache]
      if (!value || deepEqual(old, value)) return

      old.forEach(key => this.updateActive(key, false))
      value.forEach(key => this.updateActive(key, true))
      this.emitActive()
    },
    value (value: (string | number)[]) {
      const old = [...this.selectedCache]
      if (!value || deepEqual(old, value)) return

      old.forEach(key => this.updateSelected(key, false))
      value.forEach(key => this.updateSelected(key, true))
      this.emitSelected()
    },
    open (value: (string | number)[]) {
      const old = [...this.openCache]
      if (deepEqual(old, value)) return

      old.forEach(key => this.updateOpen(key, false))
      value.forEach(key => this.updateOpen(key, true))
      this.emitOpen()
    }
  },

  created () {
    this.buildTree(this.items)
    this.value.forEach(key => this.updateSelected(key, true))
    this.emitSelected()
    this.active.forEach(key => this.updateActive(key, true))
    this.emitActive()
  },

  mounted () {
    // Save the developer from themselves
    if (this.$slots.prepend || this.$slots.append) {
      consoleWarn('The prepend and append slots require a slot-scope attribute', this)
    }

    if (this.openAll) {
      Object.keys(this.nodes).forEach(key => this.updateOpen(ston(key), true))
    } else {
      this.open.forEach(key => this.updateOpen(key, true))
    }

    this.emitOpen()
  },

  methods: {
    buildTree (items: any[], parent: (string | number | null) = null) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const key = getObjectValueByPath(item, this.itemKey)
        const children = getObjectValueByPath(item, this.itemChildren, [])
        const oldNode = this.nodes.hasOwnProperty(key) ? this.nodes[key] : {
          isSelected: false, isIndeterminate: false, isActive: false, isOpen: false, vnode: null
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
        node.isOpen = oldNode.isOpen

        this.nodes[key] = !children.length ? node : this.calculateState(node, this.nodes)

        // Don't forget to rebuild cache
        if (this.nodes[key].isSelected) this.selectedCache.add(key)
        if (this.nodes[key].isActive) this.activeCache.add(key)
        if (this.nodes[key].isOpen) this.openCache.add(key)

        this.updateVnodeState(key)
      }
    },
    countItems (items: any[]) {
      let count = 0
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        count += 1
        count += item.children ? this.countItems(item.children) : 0
      }

      return count
    },
    calculateState (node: NodeState, state: Record<string | number, NodeState>) {
      const counts = node.children.reduce((counts: number[], child: string | number) => {
        counts[0] += +Boolean(state[child].isSelected)
        counts[1] += +Boolean(state[child].isIndeterminate)
        return counts
      }, [0, 0])

      node.isSelected = !!node.children.length && counts[0] === node.children.length
      node.isIndeterminate = !node.isSelected && (counts[0] > 0 || counts[1] > 0)

      return node
    },
    emitOpen () {
      this.$emit('update:open', [...this.openCache])
    },
    emitSelected () {
      this.$emit('input', [...this.selectedCache])
    },
    emitActive () {
      this.$emit('update:active', [...this.activeCache])
    },
    getDescendants (key: string | number, descendants: NodeArray = []) {
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
    register (node: VTreeviewNodeInstance) {
      const key = getObjectValueByPath(node.item, this.itemKey)
      this.nodes[key].vnode = node

      this.updateVnodeState(key)
    },
    unregister (node: VTreeviewNodeInstance) {
      const key = getObjectValueByPath(node.item, this.itemKey)
      this.nodes[key].vnode = null
    },
    updateActive (key: string | number, isActive: boolean) {
      if (!this.nodes.hasOwnProperty(key)) return

      if (!this.multipleActive) {
        this.activeCache.forEach(active => {
          this.nodes[active].isActive = false
          this.updateVnodeState(active)
          this.activeCache.delete(active)
        })
      }

      const node = this.nodes[key]
      if (!node) return

      if (isActive) this.activeCache.add(key)
      else this.activeCache.delete(key)

      node.isActive = isActive

      this.updateVnodeState(key)
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

      Object.keys(changed).forEach(k => {
        changed[k] === true ? this.selectedCache.add(ston(k)) : this.selectedCache.delete(ston(k))
      })
    },
    updateOpen (key: string | number, isOpen: boolean) {
      if (!this.nodes.hasOwnProperty(key)) return

      const node = this.nodes[key]

      if (node.children && !node.children.length && node.vnode && !node.vnode.hasLoaded) {
        node.vnode.checkChildren().then(() => this.updateOpen(key, isOpen))
      } else {
        node.isOpen = isOpen

        node.isOpen ? this.openCache.add(key) : this.openCache.delete(key)

        this.updateVnodeState(key)
      }
    },
    updateVnodeState (key: string | number) {
      const node = this.nodes[key]

      if (node && node.vnode) {
        node.vnode.isSelected = node.isSelected
        node.vnode.isIndeterminate = node.isIndeterminate
        node.vnode.isActive = node.isActive
        node.vnode.isOpen = node.isOpen
      }
    }
  },

  render (h): VNode {
    const children: VNodeChildrenArrayContents = this.items.length
      ? this.items.map(VTreeviewNode.options.methods.genChild.bind(this))
      /* istanbul ignore next */
      : this.$slots.default! // TODO: remove type annotation with TS 3.2

    return h('div', {
      staticClass: 'v-treeview',
      class: {
        'v-treeview--hoverable': this.hoverable,
        ...this.themeClasses
      }
    }, children)
  }
})
