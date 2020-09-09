<template>
  <router-view />
</template>

<script>
  // Styles
  import '@/styles/overrides.sass'

  // Utilities
  import { get } from 'vuex-pathify'
  import { IN_BROWSER } from '@/util/globals'

  export default {
    name: 'LocaleLayout',

    computed: { translating: get('pages/translating') },

    created () {
      if (!IN_BROWSER || !this.translating) return

      const crowdin = document.createElement('script')

      crowdin.src = 'https://cdn.crowdin.com/jipt/jipt.js'

      document.head.appendChild(crowdin)
    },
  }
</script>
