<template>
  <v-btn
    :to="`/${$route.params.lang}/introduction/sponsors-and-backers/`"
    color="primary"
    outlined
    rounded
    v-bind="$attrs"
    v-on="$listeners"
    @click="$ga.event('sponsors', 'click', 'sponsor-btn')"
  >
    <v-icon left>mdi-vuetify</v-icon>

    <span class="caption font-weight-bold">
      {{ $t("Vuetify.Home.becomeSponsor") }}
    </span>
  </v-btn>
</template>

<script>
  export default {
    name: 'SponsorBtn',
  }
</script>
