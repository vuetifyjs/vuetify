<template>
  <base-section
    id="home-sponsors"
    class="text-center"
  >
    <v-sheet
      class="pa-12"
      color="grey lighten-4"
      tag="v-container"
    >
      <base-subheading>Vuetify.Home.proudlySponsoredBy</base-subheading>

      <supporters-sponsors
        :tier="[0, 1, 2, 3]"
        class="mb-12"
        dense
        hide-titles
      />

      <base-subheading>Vuetify.Home.openCollective</base-subheading>

      <supporters-sponsor-btn
        append
        to="getting-started/sponsors-and-backers"
        large
      />
    </v-sheet>
  </base-section>
</template>

<script>
  export default {
    name: 'HomeSponsors',
  }
</script>

<style lang="sass">
  #home-sponsors
    .v-sheet
      border-radius: 6px
</style>
