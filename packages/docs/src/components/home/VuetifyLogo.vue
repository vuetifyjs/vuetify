<template>
  <v-img
    :height="size"
    :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-${$vuetify.theme.isDark ? 'dark' : 'light'}-atom.svg`"
    :width="size"
    class="mx-auto"
    max-width="100%"
  />
</template>

<script>
  export default {
    name: 'HomeVuetifyLogo',

    computed: {
      size () {
        return this.$vuetify.breakpoint.smAndUp ? 400 : 250
      },
    },
  }
</script>
