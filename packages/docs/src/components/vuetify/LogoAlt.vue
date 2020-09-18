<template>
  <router-link
    class="d-inline-block"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-img
      :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light' }.svg`"
      :alt="$t('logo')"
      class="shrink"
      max-width="34"
      min-width="34"
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
