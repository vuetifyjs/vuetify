<template>
  <div>
    <v-content>
      <v-container
        fluid
        pa-0
      >
        <hero />

        <sponsors />

        <made-with-vuetify />
      </v-container>
    </v-content>

    <home-footer />
  </div>
</template>

<script>
  export default {
    components: {
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
