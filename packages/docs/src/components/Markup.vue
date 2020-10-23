<template>
  <app-code
    class="my-0"
    v-bind="$attrs"
  >
    <prism
      ref="code"
      :code="code"
      :inline="inline"
      :language="language"
    />
  </app-code>
</template>

<script>
  // Imports
  import 'markdown-it-prism'
  import 'prismjs/themes/prism.css'
  import 'prismjs/components/prism-bash'
  import 'prismjs/components/prism-css'
  import 'prismjs/components/prism-javascript'
  import 'prismjs/components/prism-json'
  import 'prismjs/components/prism-pug'
  import 'prismjs/components/prism-sass'
  import 'prismjs/components/prism-scss'
  import 'prismjs/components/prism-stylus'
  import 'prismjs/components/prism-typescript'

  // Components
  import Prism from 'vue-prism-component'

  export default {
    name: 'Markup',

    components: { Prism },

    props: {
      code: String,
      inline: Boolean,
      language: String,
    },
  }
</script>
