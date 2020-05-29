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

  // Utilities
  import { get, call } from 'vuex-pathify'

  export default {
    name: 'RootLayout',

    computed: {
      translating: get('i18n/translating'),
    },

    created () {
      this.init()

      if (!this.translating) return

      const crowdin = document.createElement('script')

      crowdin.src = 'https://cdn.crowdin.com/jipt/jipt.js'

      document.head.appendChild(crowdin)
    },

    methods: {
      init: call('app/init'),
      switchLocale: call('i18n/switch'),
    },

    beforeRouteUpdate (to, _, next) {
      this.switchLocale({ locale: to.params.locale }).then(next)
    },
  }
</script>
