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

    render (h, { data, props, slots }) {
      const children = slots().default
      const text = children && children.length
        ? children[0].text
        : data.domProps ? data.domProps.textContent : ''
      const innerHTML = md.render(text, {})

      data.staticClass = `v-markdown ${data.staticClass || ''}`.trim()

      return h(props.tag, {
        ...data,
        domProps: { innerHTML },
      })
    },
  }
</script>
