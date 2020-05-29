<template>
  <router-view />
</template>

<script>
  // TODO: Find a better home for these
  import 'markdown-it-prism'
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
