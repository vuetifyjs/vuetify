<template>
  <pre
    v-html="highlight(String(code))"
  />
</template>

<script lang="ts">
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  import 'prismjs/components/prism-scss.js'
  import 'prismjs/components/prism-typescript.js'

  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      code: null,
    },
    setup () {
      return {
        highlight: (value: string) => Prism.highlight(String(value), Prism.languages.typescript, 'ts'),
      }
    },
  })
</script>
