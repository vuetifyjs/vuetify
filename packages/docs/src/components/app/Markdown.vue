<template>
  <component :is="tag" class="v-markdown" v-html="markdown" />
</template>

<script>
  // Utilities
  import MarkdownIt from 'markdown-it'

  const md = MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  })

  export default {
    name: 'AppMarkdown',

    props: {
      tag: {
        type: String,
        default: 'div',
      },
      content: String,
    },

    setup (props) {
      return {
        markdown: md.render(props.content, {}),
      }
    },

    // render (h, { children: nodes = [], data, props, slots }) {
    //   const children = []
    //   const node = nodes[0] || {}

    //   if (node.children) {
    //     children.push(...node.children)
    //   } else if (nodes.length > 1) {
    //     children.push(nodes)
    //   } else {
    //     const text = node.text || data.domProps.textContent || ''

    //     data.domProps = {
    //       ...data.domProps,
    //       innerHTML: md.render(text, {}),
    //     }
    //   }

    //   data.staticClass = `v-markdown ${data.staticClass || ''}`.trim()

    //   return h(props.tag, data, children)
    // },
  }
</script>
