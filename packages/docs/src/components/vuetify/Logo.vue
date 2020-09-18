<template>
  <router-link
    class="d-inline-block"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-img
      :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light' }-text.svg`"
      :alt="$t('logo')"
      class="shrink"
      max-width="148"
      width="148"
    />
  </router-link>
</template>

<script>
  export default {
    name: 'VuetifyLogo',

    inject: ['theme'],
  }
</script>
