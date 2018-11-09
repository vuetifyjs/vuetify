<template>
  <core-goto :id="id">
    <doc-markdown
      :id="id"
      :tag="tag"
    ><slot /></doc-markdown>
  </core-goto>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'

  export default {
    name: 'Heading',

    props: {
      lang: {
        type: String,
        default: ''
      },
      tag: {
        type: String,
        default: 'v-display-1'
      }
    },

    computed: {
      id () {
        return kebabCase(this.lang)
      }
    }
  }
</script>
