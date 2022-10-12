<template>
  <pre
    v-html="highlight(String(code))"
  />
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  import 'prismjs/components/prism-scss.js'
  import 'prismjs/components/prism-typescript.js'
  import { insertLinks, stripLinks } from './utils'

  const MAP = {
    typescript: [Prism.languages.typescript, 'ts'] as const,
    scss: [Prism.languages.scss, 'scss'] as const,
  }

  export default defineComponent({
    props: {
      code: null,
      language: {
        type: String as PropType<'typescript' | 'scss'>,
        default: 'typescript',
      },
    },
    setup (props) {
      return {
        highlight: (value: string) => {
          const code = typeof value === 'object' ? JSON.stringify(value) : value
          const [out, stripped] = stripLinks(code)
          const [grammar, language] = MAP[props.language]
          const highlighted = Prism.highlight(out, grammar, language)
          return insertLinks(highlighted, stripped)
        },
      }
    },
  })
</script>
