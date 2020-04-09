// Styles
import './VTreeview.sass'

// Types
import { VNode, VNodeChildrenArrayContents, PropType } from 'vue'

// Components
import VTreeviewNode, { VTreeviewNodeProps } from './VTreeviewNode'

// Mixins
import Themeable from '../../mixins/themeable'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Utils
import {
  arrayDiff,
  deepEqual,
  getObjectValueByPath,
} from '../../util/helpers'
import mixins from '../../util/mixins'
import { consoleWarn } from '../../util/console'
import {
  filterTreeItems,
  filterTreeItem,
} from './util/filterTreeItems'
import { TreeviewItemFunction } from 'types'

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
  item: any
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
      type: Array as PropType<NodeArray>,
      default: () => ([]),
    },
    dense: Boolean,
    filter: Function as PropType<TreeviewItemFunction>,
    hoverable: Boolean,
    items: {
      type: Array as PropType<any[]>,
      default: () => ([]),
    },
    multipleActive: Boolean,
    open: {
      type: Array as PropType<NodeArray>,
      default: () => ([]),
    },
    openAll: Boolean,
    returnObject: {
      type: Boolean,
      default: false, // TODO: Should be true in next major
    },
    search: String,
    selectionType: {
      type: String as PropType<'leaf' | 'independent'>,
      default: 'leaf',
      validator: (v: string) => ['leaf', 'independent'].includes(v),
    },
    value: {
      type: Array as PropType<NodeArray>,
      default: () => ([]),
    },
    ...VTreeviewNodeProps,
  },

  data: () => ({
    level: -1,
    activeCache: new Set() as NodeCache,
    nodes: {} as Record<string | number, NodeState>,
    openCache: new Set() as NodeCache,
    selectedCache: new Set() as NodeCache,
  }),

  computed: {
    excludedItems (): Set<string | number> {
      const excluded = new Set<string|number>()

      if (!this.search) return excluded

      for (let i = 0; i < this.items.length; i++) {
        filterTreeItems(
          this.filter || filterTreeItem,
          this.items[i],
          this.search,
          this.itemKey,
          this.itemText,
          this.itemChildren,
          excluded
        )
      }

      return excluded
    },
  },

  watch: {
    items: {
      handler () {
        const oldKeys = Object.keys(this.nodes).map(k => getObjectValueByPath(this.nodes[k].item, this.itemKey))
        const newKeys = this.getKeys(this.items)
        const diff = arrayDiff(newKeys, oldKeys)

        // We only want to do stuff if items have changed
        if (!diff.length && newKeys.length < oldKeys.length) return

        // If nodes are removed we need to clear them from this.nodes
        diff.forEach(k => delete this.nodes[k])

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
      deep: true,
    },
    active (value: (string | number | any)[]) {
      this.handleNodeCacheWatcher(value, this.activeCache, this.updateActive, this.emitActive)
    },
    value (value: (string | number | any)[]) {
      this.handleNodeCacheWatcher(value, this.selectedCache, this.updateSelected, this.emitSelected)
    },
    open (value: (string | number | any)[]) {
      this.handleNodeCacheWatcher(value, this.openCache, this.updateOpen, this.emitOpen)
    },
  },

  created () {
    this.buildTree(this.items)
    this.value.forEach(key => this.updateSelected(this.returnObject ? getObjectValueByPath(key, this.itemKey) : key, true))
    this.active.forEach(key => this.updateActive(this.returnObject ? getObjectValueByPath(key, this.itemKey) : key, true))
  },

  mounted () {
    // Save the developer from themselves
    if (this.$slots.prepend || this.$slots.append) {
      consoleWarn('The prepend and append slots require a slot-scope attribute', this)
    }

    if (this.openAll) {
      this.updateAll(true)
    } else {
      this.open.forEach(key => this.updateOpen(this.returnObject ? getObjectValueByPath(key, this.itemKey) : key, true))
      this.emitOpen()
    }
  },

  methods: {
    /** @public */
    updateAll (value: boolean) {
      Object.keys(this.nodes).forEach(key => this.updateOpen(getObjectValueByPath(this.nodes[key].item, this.itemKey), value))
      this.emitOpen()
    },
    getKeys (items: any[], keys: any[] = []) {
      for (let i = 0; i < items.length; i++) {
        const key = getObjectValueByPath(items[i], this.itemKey)
        keys.push(key)
        const children = getObjectValueByPath(items[i], this.itemChildren)
        if (children) {
          keys.push(...this.getKeys(children))
        }
      }

      return keys
    },
    buildTree (items: any[], parent: (string | number | null) = null) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const key = getObjectValueByPath(item, this.itemKey)
        const children = getObjectValueByPath(item, this.itemChildren, [])
        const oldNode = this.nodes.hasOwnProperty(key) ? this.nodes[key] : {
          isSelected: false, isIndeterminate: false, isActive: false, isOpen: false, vnode: null,
        } as NodeState

        const node: any = {
          vnode: oldNode.vnode,
          parent,
          children: children.map((c: any) => getObjectValueByPath(c, this.itemKey)),
          item,
        }

        this.buildTree(children, key)

        // This fixed bug with dynamic children resetting selected parent state
        if (!this.nodes.hasOwnProperty(key) && parent !== null && this.nodes.hasOwnProperty(parent)) {
          node.isSelected = this.nodes[parent].isSelected
        } else {
          node.isSelected = oldNode.isSelected
          node.isIndeterminate = oldNode.isIndeterminate
        }

        node.isActive = oldNode.isActive
        node.isOpen = oldNode.isOpen

        this.nodes[key] = !children.length ? node : this.calculateState(node, this.nodes)

        // Don't forget to rebuild cache
        if (this.nodes[key].isSelected && (this.selectionType === 'independent' || node.children.length === 0)) this.selectedCache.add(key)
        if (this.nodes[key].isActive) this.activeCache.add(key)
        if (this.nodes[key].isOpen) this.openCache.add(key)

        this.updateVnodeState(key)
      }
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
      this.emitNodeCache('update:open', this.openCache)
    },
    emitSelected () {
      this.emitNodeCache('input', this.selectedCache)
    },
    emitActive () {
      this.emitNodeCache('update:active', this.activeCache)
    },
    emitNodeCache (event: string, cache: NodeCache) {
      this.$emit(event, this.returnObject ? [...cache].map(key => this.nodes[key].item) : [...cache])
    },
    handleNodeCacheWatcher (value: any[], cache: NodeCache, updateFn: Function, emitFn: Function) {
      value = this.returnObject ? value.map(v => getObjectValueByPath(v, this.itemKey)) : value
      const old = [...cache]
      if (deepEqual(old, value)) return

      old.forEach(key => updateFn(key, false))
      value.forEach(key => updateFn(key, true))

      emitFn()
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
      if (this.nodes[key]) this.nodes[key].vnode = null
    },
    isParent (key: string | number) {
      return this.nodes[key].children && this.nodes[key].children.length
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

      const changed = new Map()

      if (this.selectionType !== 'independent') {
        const descendants = [key, ...this.getDescendants(key)]
        descendants.forEach(descendant => {
          this.nodes[descendant].isSelected = isSelected
          this.nodes[descendant].isIndeterminate = false
          changed.set(descendant, isSelected)
        })

        const parents = this.getParents(key)
        parents.forEach(parent => {
          this.nodes[parent] = this.calculateState(this.nodes[parent], this.nodes)
          changed.set(parent, this.nodes[parent].isSelected)
        })
      } else {
        this.nodes[key].isSelected = isSelected
        this.nodes[key].isIndeterminate = false
        changed.set(key, isSelected)
      }

      for (const [key, value] of changed.entries()) {
        this.updateVnodeState(key)

        if (this.selectionType === 'leaf' && this.isParent(key)) continue

        value === true ? this.selectedCache.add(key) : this.selectedCache.delete(key)
      }
    },
    updateOpen (key: string | number, isOpen: boolean) {
      if (!this.nodes.hasOwnProperty(key)) return

      const node = this.nodes[key]
      const children = getObjectValueByPath(node.item, this.itemChildren)

      if (children && !children.length && node.vnode && !node.vnode.hasLoaded) {
        node.vnode.checkChildren().then(() => this.updateOpen(key, isOpen))
      } else if (children && children.length) {
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
    },
    isExcluded (key: string | number) {
      return !!this.search && this.excludedItems.has(key)
    },
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
        'v-treeview--dense': this.dense,
        ...this.themeClasses,
      },
    }, children)
  },
})
