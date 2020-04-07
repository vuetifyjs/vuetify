<template>
  <base-section
    id="home-sponsors"
    class="text-center"
  >
    <v-sheet
      :color="$vuetify.theme.dark ? undefined : 'grey lighten-5'"
      :max-width="1280 + ($vuetify.breakpoint.mdAndUp ? 48 : 0)"
      class="pa-0 pa-md-12 mx-auto"
      tag="v-container"
    >
      <base-heading>Vuetify.Home.proudlySponsoredBy</base-heading>

      <base-text
        class="mx-auto mb-6"
        max-width="600"
      >Vuetify.Home.proundlySponsoredByText</base-text>

      <supporters-sponsors
        :tier="tier"
        class="mb-12"
        dense
        hide-titles
      />

      <supporters-sponsor-btn
        :to="`/${$route.params.lang}/introduction/sponsors-and-backers/`"
        large
      />
    </v-sheet>
  </base-section>
</template>

<script>
  export default {
    name: 'HomeSponsors',

    provide: { id: 'home-sponsors' },

    computed: {
      tier () {
        return this.$vuetify.breakpoint.smAndUp
          ? [0, 1, 2, 3, 5, 6]
          : [0, 1, 2]
      },
    },
  }
</script>

<style lang="sass">
  #home-sponsors
    .v-sheet
      border-radius: 6px
</style>
