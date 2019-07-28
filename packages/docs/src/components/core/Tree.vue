<script>
  // Utilities
  import { getComponent } from '@/util/helpers'

  export default {
    functional: true,

    props: {
      children: {
        type: Array,
        default: () => ([]),
      },
    },

    render (h, { props }) {
      return props.children.map(child => {
        if (child.children) {
          return h('doc-section', {
            props: { value: child },
          })
        }

        return h(getComponent(child.type), {
          props: {
            lang: child.lang,
            value: child.value,
          },
        }, child.lang)
      })
    },
  }
</script>
