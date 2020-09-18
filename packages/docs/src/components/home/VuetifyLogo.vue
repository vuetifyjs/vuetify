<template>
  <v-img
    :height="size"
    :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light'}-atom.svg`"
    :width="size"
    class="mx-auto"
    max-width="100%"
  />
</template>

<script>
  export default {
    name: 'HomeVuetifyLogo',

    inject: ['theme'],

    computed: {
      size () {
        return this.$vuetify.breakpoint.smAndUp ? 400 : 250
      },
    },
  }
</script>
