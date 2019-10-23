<template>
  <router-link
    :to="{
      name: 'Home',
      params: {
        lang: $route.params.lang
      }
    }"
    aria-label="Vuetify Home Page"
    class="d-flex align-center"
    title="Vuetify Home Page"
    @click.native="$vuetify.goTo(0)"
  >
    <v-img
      alt="Vuetify Logo"
      class="shrink mr-2"
      contain
      src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
      transition="scale-transition"
      width="40"
    />

    <v-img
      alt="Vuetify Name"
      class="shrink mt-1 hidden-sm-and-down"
      contain
      min-width="100"
      src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
      width="100"
    />
  </router-link>
</template>

<script>
  export default {
    name: 'BaseVuetifyLogo',
  }
</script>
