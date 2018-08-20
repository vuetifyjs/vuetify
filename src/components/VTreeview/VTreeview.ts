// Styles
import '../../stylus/components/_treeview.styl'

// Types
import Vue, { VNode } from 'vue'
import mixins from '../../util/mixins'

// Components
import { VTreeviewNode } from '.'

// Mixins
import { provide as RegistrableProvide } from '../../mixins/registrable'

type VTreeviewNodeInstance = InstanceType<typeof VTreeviewNode>

export default mixins(
  RegistrableProvide('treeview')
).extend({
  name: 'v-treeview',

  provide (): object {
    const treeview = {
      register: this.register,
      unregister: this.unregister,
      updateParent: this.updateParent
    }

    return { treeview }
  },

  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: Array,
      default: () => null
    },
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
    }
  },

  data: () => ({
    children: []
  }),

  methods: {
    register (child: VTreeviewNodeInstance) {
      this.children.push(child)
    },
    unregister (child: VTreeviewNodeInstance) {
      this.children = this.children.filter(c => c._uid !== child._uid)
    },
    updateParent () {
      this.$emit('selected', this.children.reduce((arr, c) => {
        if (c.isLeaf && c.isSelected) arr.push(c.data)
        return arr
      }, []))
    },
    genNode (data: any): VNode {
      return this.$createElement(VTreeviewNode, {
        props: {
          data,
          selectable: !!this.value,
          indeterminateIcon: this.indeterminateIcon,
          onIcon: this.onIcon,
          offIcon: this.offIcon
        },
        scopedSlots: this.$scopedSlots
      })
    }
  },

  render (h): VNode {
    const children = this.items.length ? this.items.map(this.genNode) : this.$slots.default

    return h('div', {
      staticClass: 'v-treeview'
    }, children)
  }
})
