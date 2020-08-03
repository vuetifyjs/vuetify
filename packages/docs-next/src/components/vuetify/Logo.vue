<template>
  <router-link
    :to="{
      name: 'Home',
      params: { locale }
    }"
    class="d-inline-block"
  >
    <v-img
      :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light' }-text.svg`"
      :alt="$i18n.t('logo')"
      class="shrink"
      max-width="164"
      transition="scale-transition"
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
