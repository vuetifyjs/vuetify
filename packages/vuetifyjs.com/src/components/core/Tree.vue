<script>
  // Utilities
  import { getComponent } from '@/util/helpers'

  export default {
    props: {
      children: {
        type: Array,
        default: () => ([])
      }
    },

    render (h) {
      const children = this.children.map(child => {
        if (child.children) {
          return h('core-tree', {
            props: { children: child.children }
          })
        }

        return h(getComponent(child.type), {
          props: { value: child.value }
        }, child.lang)
      })

      return h('div', children)
    }
  }
</script>
