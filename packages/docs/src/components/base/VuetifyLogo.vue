<template>
  <router-link
    :to="{
      name: 'Home',
      params: {
        lang: $route.params.lang
      }
    }"
    aria-label="Vuetify Home Page"
    class="d-none d-sm-flex align-center text--primary"
    style="text-decoration: none;"
    title="Vuetify Home Page"
    @click.native="$vuetify.goTo(0)"
  >
    <v-img
      :src="`https://cdn.vuetifyjs.com/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light' }.png`"
      alt="Vuetify Logo"
      class="shrink mr-2"
      contain
      transition="scale-transition"
      width="40"
    />

    <v-sheet
      class="display-1 hidden-sm-and-down font-weight-medium mr-0 mr-md-4"
      color="transparent"
    >
      Vuetify
    </v-sheet>
  </router-link>
</template>

<script>
  export default {
    name: 'BaseVuetifyLogo',

    inject: ['theme'],
  }
</script>
