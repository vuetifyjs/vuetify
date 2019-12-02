<template>
  <base-section
    id="home-sponsors"
    class="text-center"
  >
    <v-sheet
      :color="$vuetify.theme.dark ? undefined : 'grey lighten-5'"
      class="pa-12"
      tag="v-container"
    >
      <base-heading>Vuetify.Home.proudlySponsoredBy</base-heading>

      <base-text
        class="mx-auto mb-6"
        max-width="600"
      >Vuetify.Home.proundlySponsoredByText</base-text>

      <supporters-sponsors
        :tier="[0, 1, 2, 3, 5]"
        class="mb-12"
        dense
        hide-titles
      />

      <supporters-sponsor-btn
        append
        to="introduction/sponsors-and-backers"
        large
      />
    </v-sheet>
  </base-section>
</template>

<script>
  export default {
    name: 'HomeSponsors',

    provide: { id: 'home-sponsors' },
  }
</script>

<style lang="sass">
  #home-sponsors
    .v-sheet
      border-radius: 6px
</style>
