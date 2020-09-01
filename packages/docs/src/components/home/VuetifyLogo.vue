<template>
  <v-img
    :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light'}-atom.svg`"
    class="mx-auto"
    height="400"
    max-width="100%"
    width="400"
  />
</template>

<script>
  export default {
    name: 'HomeVuetifyLogo',

    inject: ['theme'],
  }
</script>
