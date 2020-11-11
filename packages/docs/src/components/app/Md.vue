<script>
  // Utilities
  const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
  })

  export default {
    name: 'AppMd',

    functional: true,

    props: {
      tag: {
        type: String,
        default: 'div',
      },
    },

    render (h, { children: nodes = [], data, props, slots }) {
      const children = []
      const node = nodes[0] || {}

      if (node.children) {
        children.push(...node.children)
      } else if (nodes.length > 1) {
        children.push(nodes)
      } else {
        const text = node.text || data.domProps.textContent || ''

        data.domProps = {
          ...data.domProps,
          innerHTML: md.render(text, {}),
        }
      }

      data.staticClass = `v-markdown ${data.staticClass || ''}`.trim()

      return h(props.tag, data, children)
    },
  }
</script>
