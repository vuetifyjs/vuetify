<template>
  <v-container class=" d-flex flex-column justify-center align-center text-center py-10">
    <h2 class="text-h4 mb-6">Other ways to subscribe</h2>

    <div class="d-flex ga-6 justify-center align-center flex-wrap">
      <v-card v-for="sponsor in sponsorships" :key="sponsor" class="pa-8" elevation="6" max-width="400">
        <v-card-title class="text-h5 font-weight-bold mb-4">{{ sponsor.name }}</v-card-title>

        <v-card-text class="text-body-1 mb-6">
          Support Vuetify development directly through {{ sponsor.name }} Sponsors and gain access to exclusive benefits and updates.
        </v-card-text>

        <v-btn
          :href="sponsor.link"
          class="mb-4"
          color="primary"
          rounded="lg"
          size="large"
          target="_blank"
        >
          Sponsor on {{ sponsor.name }}
        </v-btn>

      </v-card>
    </div>
  </v-container>
</template>

<script setup>

  const sponsorships = [
    {
      name: 'GitHub',
      link: 'https://github.com/sponsors/johnleider',
    },
    {
      name: 'Discord',
      link: 'https://discord.com/servers/vuetify-340160225338195969',
    },
    {
      name: 'Open Collective',
      link: 'https://opencollective.com/vuetify',
    },
  ]

</script>
