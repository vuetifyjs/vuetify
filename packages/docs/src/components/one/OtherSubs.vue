<template>
  <v-container class=" d-flex flex-column justify-center align-center text-center py-10">
    <h2 class="text-h4 mb-6 font-weight-bold">Other ways to subscribe</h2>

    <div class="d-flex ga-6 justify-center align-center flex-wrap">
      <v-card
        v-for="sponsor in sponsorships"
        :key="sponsor.name"
        class="pa-6"
        elevation="6"
        max-width="400"
      >
        <v-card-title class="text-h5 font-weight-bold mb-4">{{ sponsor.name }}</v-card-title>

        <v-icon aria-hidden="false" role="img" size="48">
          {{ sponsor.icon }}
        </v-icon>

        <v-card-text class="text-body-1 mb-6">
          Support Vuetify development directly through {{ sponsor.name }} and gain access to exclusive benefits and updates.
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

<script setup lang="ts">

  const sponsorships = [
    {
      name: 'GitHub',
      link: 'https://github.com/sponsors/johnleider',
      icon: 'mdi-github',
    },
    {
      name: 'Discord',
      link: 'https://discord.com/servers/vuetify-340160225338195969',
      icon: 'mdi-discord',
    },
    {
      name: 'Open Collective',
      link: 'https://opencollective.com/vuetify',
      icon: 'mdi-account-group-outline',
    },
  ]

</script>
