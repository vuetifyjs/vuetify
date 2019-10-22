<template>
  <div id="home">
    <v-content>
      <v-container
        fluid
        pa-0
      >
        <hero />

        <sponsors />

        <premium-themes />

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
      PremiumThemes: () => import('./components/PremiumThemes'),
      Sponsors: () => import('./components/Sponsors'),
      HomeFooter: () => import('./components/Footer'),
    },
  }
</script>

<style lang="sass">
#home
  .v-card
    border-radius: 6px

.mono
  font-family: 'Roboto Mono', monospace !important
</style>
