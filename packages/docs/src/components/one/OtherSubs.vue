<template>
  <v-container class="pa-md-12 pa-sm-6 mx-auto text-center" max-width="1200" fluid>
    <h2 class="text-h4 text-md-h3 mb-6 mb-md-12 font-weight-bold">
      Other ways to subscribe
    </h2>

    <v-row>
      <v-col
        v-for="sponsor in sponsorships"
        :key="sponsor.name"
        cols="12"
        md="4"
      >
        <v-card
          class="pa-6 h-100 d-flex flex-column text-center"
          elevation="0"
          rounded="xl"
          border
        >
          <v-card-title class="text-h5 font-weight-bold mb-4">
            {{ sponsor.name }}
          </v-card-title>

          <div class="d-flex justify-center align-center mb-4">
            <v-icon
              :icon="sponsor.icon"
              aria-hidden="false"
              color="primary"
              role="img"
              size="64"
            />
          </div>

          <v-card-text class="text-body-1 text-medium-emphasis mb-6 flex-grow-1">
            Support Vuetify development directly through {{ sponsor.name }} and gain access to exclusive benefits and updates.
          </v-card-text>

          <v-btn
            :href="sponsor.link"
            :text="`Sponsor on ${sponsor.name}`"
            class="text-none"
            color="primary"
            rounded="lg"
            size="large"
            target="_blank"
            variant="outlined"
          />
        </v-card>
      </v-col>
    </v-row>
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
