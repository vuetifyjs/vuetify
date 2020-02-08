<template>
  <component
    :is="id ? 'section' : 'div'"
    :id="id"
    class="mb-12"
  >
    <core-tree :children="value.children" />
  </component>
</template>

<script>
  // Utilities
  import {
    mapGetters,
  } from 'vuex'
  import marked from 'marked'
  import kebabCase from 'lodash/kebabCase'

  export default {
    name: 'DocSection',

    provide () {
      return {
        id: this.id,
      }
    },

    props: {
      value: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      ...mapGetters('documentation', [
        'namespace',
        'page',
      ]),
      id () {
        const children = this.value.children

        if (!children || !children.length) return undefined

        let lang

        for (const child of children) {
          if (child.type === 'heading') {
            lang = child.lang
            break
          }

          if (child.type === 'accessibility') return 'accessibility'
          if (child.type === 'api') return 'api'
          if (child.type === 'examples') return 'examples'
          if (child.type === 'functional') return 'functional'
          if (child.type === 'playground') return 'playground'
          if (child.type === 'up-next') return 'up-next'
          if (child.type === 'usage' || child.type === 'usage-new') return 'usage'
          if (child.type === 'variable-api') return 'variable-api'
        }

        if (!lang) return undefined

        const str = lang.indexOf('.') > -1
          ? lang
          : `${this.namespace}.${this.page}.${lang}`

        const innerHTML = marked(this.$t(str))
        const index = innerHTML.indexOf('</')
        const text = innerHTML.slice(4, index)

        return kebabCase(text)
      },
    },
  }
</script>
