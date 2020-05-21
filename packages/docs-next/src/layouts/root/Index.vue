<template>
  <router-view />
</template>

<script>
  // TODO: Find a better home for these
  import 'markdown-it-prism'
  import 'prismjs/themes/prism.css'
  import 'prismjs/components/prism-bash'
  import 'prismjs/components/prism-css'
  import 'prismjs/components/prism-javascript'
  import 'prismjs/components/prism-json'
  import 'prismjs/components/prism-sass'
  import 'prismjs/components/prism-scss'
  import 'prismjs/components/prism-stylus'
  import 'prismjs/components/prism-typescript'
  import '@/styles/overrides.sass'

  export default {
    //
  }
</script>
