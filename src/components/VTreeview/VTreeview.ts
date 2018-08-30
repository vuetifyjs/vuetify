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

// Utils
import { getObjectValueByPath } from '../../util/helpers'

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
        this.parents = {}
        this.children = {}
        this.buildTree(this.items)
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    buildTree (items: any[], parent = null) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const key = getObjectValueByPath(item, this.itemKey)
        const children = getObjectValueByPath(item, this.itemChildren, [])

        this.parents[key] = parent
        this.children[key] = children.map((c: any) => getObjectValueByPath(c, this.itemKey))
        this.state[key] = {
          isSelected: this.state[key] ? this.state[key].isSelected : false,
          isIndeterminate: this.state[key] ? this.state[key].isIndeterminate : false
        }

        this.buildTree(children, key)
      }
    },
    register (node: VTreeviewNodeInstance) {
      const key = getObjectValueByPath(node.item, this.itemKey)
      this.vnodes[key] = node

      const state = this.state[key]
      if (state) {
        node.isSelected = state.isSelected
        node.isIndeterminate = state.isIndeterminate
      }
    },
    unregister (node: VTreeviewNodeInstance) {
      const key = getObjectValueByPath(node.item, this.itemKey)
      delete this.vnodes[key]
    },
    updateActive (key: string | number, value: boolean) {
      this.active = {}

      if (!this.multipleActive) {
        Object.keys(this.active).forEach(active => {
          const vnode = this.vnodes[active]
          if (vnode) vnode.isActive = false
        })
      }

      if (value) this.active[key] = value

      const vnode = this.vnodes[key]
      if (vnode) vnode.isActive = value
    },
    updateSelected (key: string | number, state: NodeState) {
      const descendants = [key, ...this.getDescendants(key)]

      descendants.forEach(descendant => {
        this.state[descendant] = state
      })

      const parents = this.getParents(key)

      parents.forEach(key => {
        const children = this.children[key] || []
        const counts = children.reduce((counts: number[], child: string | number) => {
          counts[0] += +this.state[child].isSelected
          counts[1] += +this.state[child].isIndeterminate
          return counts
        }, [0, 0])

        const isSelected = counts[0] === children.length
        const isIndeterminate = !isSelected && (counts[0] > 0 || counts[1] > 0)

        this.state[key] = { isSelected, isIndeterminate }
      })

      const all = [key, ...descendants, ...parents]

      all.forEach(item => {
        const vnode = this.vnodes[item]

        if (!vnode) return

        const state = this.state[item]
        vnode.isSelected = state.isSelected
        vnode.isIndeterminate = state.isIndeterminate
      })

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
