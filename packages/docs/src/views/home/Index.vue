<template>
  <section
    id="home"
    :class="!$vuetify.theme.dark && 'white'"
  >
    <home-hero />

    <home-tidelift />

    <home-feature />

    <home-sponsors />

    <home-premium-themes />

    <home-made-with-vuetify />
  </section>
</template>

<script>
  export default {
    name: 'Home',

    components: {
      HomeFeature: () => import('./components/Feature'),
      HomeHero: () => import('./components/Hero'),
      HomeMadeWithVuetify: () => import('./components/MadeWithVuetify'),
      HomePremiumThemes: () => import('./components/PremiumThemes'),
      HomeSponsors: () => import('./components/Sponsors'),
      HomeTidelift: () => import('./components/Tidelift'),
    },
  }
</script>

<style lang="sass">
  .mono
    font-family: 'Roboto Mono', monospace !important
</style>
