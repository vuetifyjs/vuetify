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
import { getObjectValueByPath } from '../../util/helpers'
import mixins from '../../util/mixins'

type VTreeviewNodeInstance = InstanceType<typeof VTreeviewNode>

type NodeState = {
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
    parents: {} as Record<string | number, string | null>,
    children: {} as Record<string | number, (string | number)[]>,
    vnodes: {} as Record<string | number, VTreeviewNodeInstance>,
    state: {} as Record<string | number, NodeState>,
    active: {} as Record<string | number, boolean>
  }),

  watch: {
    items: {
      handler () {
        const oldState = Object.assign({}, this.state)
        this.state = {}
        this.parents = {}
        this.children = {}
        this.buildTree(this.items, oldState)
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    buildTree (items: any[], oldState: Record<string | number, NodeState>, parent = null) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const key = getObjectValueByPath(item, this.itemKey)
        const children = getObjectValueByPath(item, this.itemChildren, [])

        this.parents[key] = parent
        this.children[key] = children.map((c: any) => getObjectValueByPath(c, this.itemKey))

        this.buildTree(children, oldState, key)

        const state = {
          isSelected: oldState.hasOwnProperty(key) ? oldState[key].isSelected : false,
          isIndeterminate: oldState.hasOwnProperty(key) ? oldState[key].isIndeterminate : false
        }

        this.state[key] = !children.length ? state : this.calculateState(this.children[key], oldState)

        this.updateVnodeState(key)
      }
    },
    register (node: VTreeviewNodeInstance) {
      const key = getObjectValueByPath(node.item, this.itemKey)
      this.vnodes[key] = node

      this.updateVnodeState(key)
    },
    unregister (node: VTreeviewNodeInstance) {
      const key = getObjectValueByPath(node.item, this.itemKey)
      delete this.vnodes[key]
    },
    updateActive (key: string | number, value: boolean) {
      if (!this.multipleActive) {
        Object.keys(this.active).forEach(active => {
          const vnode = this.vnodes[active]
          if (vnode) vnode.isActive = false
        })
      }

      this.active = {}

      if (value) this.active[key] = value

      const vnode = this.vnodes[key]
      if (vnode) vnode.isActive = value
    },
    calculateState (children: any[], state: Record<string | number, NodeState>) {
      const counts = children.reduce((counts: number[], child: string | number) => {
        counts[0] += +(state.hasOwnProperty(child) ? state[child].isSelected : false)
        counts[1] += +(state.hasOwnProperty(child) ? state[child].isIndeterminate : false)
        return counts
      }, [0, 0])

      const isSelected = !!children.length && counts[0] === children.length
      const isIndeterminate = !isSelected && (counts[0] > 0 || counts[1] > 0)

      return { isSelected, isIndeterminate }
    },
    updateSelected (key: string | number, state: NodeState) {
      const descendants = [key, ...this.getDescendants(key)]

      descendants.forEach(descendant => {
        this.state[descendant] = state
      })

      const parents = this.getParents(key)

      parents.forEach(parent => {
        const children = this.children[parent] || []
        this.state[parent] = this.calculateState(children, this.state)
      })

      const all = [key, ...descendants, ...parents]

      all.forEach(this.updateVnodeState)

      this.$emit('selected', Object.keys(this.state).filter(k => this.state[k].isSelected).map(k => isNaN(Number(k)) ? k : Number(k)))
    },
    getDescendants (key: string | number, descendants: (string | number)[] = []) {
      const children = this.children[key]

      descendants.push(...children)

      for (let i = 0; i < children.length; i++) {
        descendants = this.getDescendants(children[i], descendants)
      }

      return descendants
    },
    getParents (key: string | number) {
      let parent = this.parents[key]

      const parents = []

      while (parent !== null) {
        parents.push(parent)
        parent = this.parents[parent]
      }

      return parents
    },
    updateVnodeState (key: string | number) {
      const vnode = this.vnodes[key]
      const state = this.state[key]

      if (vnode && state) {
        vnode.isSelected = state.isSelected
        vnode.isIndeterminate = state.isIndeterminate
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
