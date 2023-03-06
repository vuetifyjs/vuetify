<template>
  <div
    id="home"
    class="fill-height grey darken-4"
  >
    <v-content>
      <v-container
        fluid
        pa-0
      >
        <hero />
      </v-container>
    </v-content>

    <home-footer />
  </div>
</template>

<script>
  export default {
    components: {
      Hero: () => import('./components/Hero'),
      HomeFooter: () => import('./components/Footer')
    }
  }
</script>

<style lang="stylus">
  #home
    .v-card {
      border-radius: 6px;
    }
  .mono
    font-family: 'Roboto Mono', monospace !important
</style>
