<template>
  <base-section
    id="home-sponsors"
    class="text-center"
  >
    <v-sheet
      class="pa-12"
      color="grey lighten-5"
      tag="v-container"
    >
      <base-subheading>Vuetify.Home.proudlySponsoredBy</base-subheading>

      <base-text
        class="mx-auto"
        max-width="600"
      >Vuetify.Home.proundlySponsoredByText</base-text>

      <supporters-sponsors
        :tier="[0, 1, 2, 3]"
        class="mb-12"
        dense
        hide-titles
      />

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
