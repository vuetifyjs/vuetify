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
  import 'github-markdown-css/github-markdown.css'

  // Utilities
  import { get } from 'vuex-pathify'

  // Language
  import { loadLocale } from '@/plugins/i18n'

  export default {
    name: 'RootLayout',

    computed: {
      translating: get('app/translating'),
    },

    created () {
      if (!this.translating) return

      const crowdin = document.createElement('script')

      crowdin.src = 'https://cdn.crowdin.com/jipt/jipt.js'

      document.head.appendChild(crowdin)
    },

    beforeRouteUpdate: (to, _, next) => {
      loadLocale(to.params.locale).then(next)
    },
  }
</script>
