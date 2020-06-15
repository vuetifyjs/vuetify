<template>
  <router-view />
</template>

<script>
  // Styles
  import '@/styles/overrides.sass'

  // Utilities
  import { get } from 'vuex-pathify'
  import { waitForReadystate } from '@/util/helpers'

  export default {
    name: 'LocaleLayout',

    computed: {
      hash: get('route/hash'),
      translating: get('i18n/translating'),
    },

    created () {
      if (!this.translating) return

      const crowdin = document.createElement('script')

      crowdin.src = 'https://cdn.crowdin.com/jipt/jipt.js'

      document.head.appendChild(crowdin)
    },

    async mounted () {
      if (!this.hash) return

      await waitForReadystate()

      this.$vuetify.goTo(this.hash)
    },
  }
</script>
