<template>
  <pre
    v-html="highlight(String(code))"
  />
</template>

<script setup lang="ts">
  // Styles
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  import 'prismjs/components/prism-scss.js'
  import 'prismjs/components/prism-typescript.js'

  // Utilities
  import { insertLinks, stripLinks } from './utils'
  import { PropType } from 'vue'

  const props = defineProps({
    code: null,
    language: {
      type: String as PropType<'typescript' | 'scss'>,
      default: 'typescript',
    },
  })

  const MAP = {
    typescript: [Prism.languages.typescript, 'ts'] as const,
    scss: [Prism.languages.scss, 'scss'] as const,
  }

  function highlight (value: string) {
    const code = typeof value === 'object' ? JSON.stringify(value) : value
    const [out, stripped] = stripLinks(code ?? '')
    const [grammar, language] = MAP[props.language]
    const highlighted = Prism.highlight(out, grammar, language)
    return insertLinks(highlighted, stripped)
  }
</script>
