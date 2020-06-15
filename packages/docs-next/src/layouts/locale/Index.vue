<template>
  <router-view />
</template>

<script>
  // Styles
  import '@/styles/overrides.sass'

  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'LocaleLayout',

    computed: { translating: get('i18n/translating') },

    created () {
      if (!this.translating) return

      const crowdin = document.createElement('script')

      crowdin.src = 'https://cdn.crowdin.com/jipt/jipt.js'

      document.head.appendChild(crowdin)
    },
  }
</script>
