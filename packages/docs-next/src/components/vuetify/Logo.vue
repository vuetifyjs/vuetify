<template>
  <router-link
    :to="{
      name: 'Home',
      params: { locale }
    }"
    class="d-inline-block"
  >
    <v-img
      :src="`https://cdn.vuetifyjs.com/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light' }.png`"
      alt="Vuetify Logo"
      class="shrink"
      transition="scale-transition"
      width="32"
    />
  </router-link>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'VuetifyLogo',

    inject: ['theme'],

    computed: { locale: get('route/params@locale') },
  }
</script>
