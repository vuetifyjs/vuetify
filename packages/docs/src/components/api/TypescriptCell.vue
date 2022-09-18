<template>
  <pre
    v-html="highlight(String(code))"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  import 'prismjs/components/prism-scss.js'
  import 'prismjs/components/prism-typescript.js'
  import { stripLinks, insertLinks } from './utils'

  export default defineComponent({
    props: {
      code: null,
    },
    setup () {
      return {
        highlight: (value: string) => {
          const code = typeof value === 'object' ? JSON.stringify(value) : value
          const [out, stripped] = stripLinks(code)
          const highlighted = Prism.highlight(out, Prism.languages.typescript, 'ts')
          return insertLinks(highlighted, stripped)
        },
      }
    },
  })
</script>
