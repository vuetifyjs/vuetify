<template>
  <router-link
    :to="{ name: 'Home' }"
    class="d-inline-block"
  >
    <v-img
      :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light' }.svg`"
      :alt="$i18n.t('logo')"
      class="shrink"
      max-width="40"
      transition="scale-transition"
    />
  </router-link>
</template>

<script>
  export default {
    name: 'VuetifyLogoAlt',

    inject: ['theme'],
  }
</script>
