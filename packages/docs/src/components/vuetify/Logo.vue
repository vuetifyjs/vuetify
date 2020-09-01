<template>
  <router-link
    :to="{ name: 'Home' }"
    class="d-inline-block"
  >
    <v-img
      :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light' }-text.svg`"
      :alt="$i18n.t('logo')"
      class="shrink"
      max-width="164"
    />
  </router-link>
</template>

<script>
  export default {
    name: 'VuetifyLogo',

    inject: ['theme'],
  }
</script>
