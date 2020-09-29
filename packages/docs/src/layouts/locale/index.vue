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
  }
</script>
