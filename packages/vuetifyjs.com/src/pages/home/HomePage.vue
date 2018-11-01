<template>
  <div>
    <v-container
      fluid
      pa-0
    >
      <hero />

      <feature />

      <sponsors />

      <made-with-vuetify />
    </v-container>

    <home-footer />
  </div>
</template>

<script>
  export default {
    components: {
      Feature: () => import('./components/Feature'),
      Hero: () => import('./components/Hero'),
      MadeWithVuetify: () => import('./components/MadeWithVuetify'),
      Sponsors: () => import('./components/Sponsors'),
      HomeFooter: () => import('./components/Footer')
    }
  }
</script>

<style lang="stylus">
  .mono
    font-family: 'Roboto Mono', monospace !important
</style>
