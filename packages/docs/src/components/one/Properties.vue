<template>
  <v-container class="pa-4 mx-auto mb-12" max-width="1100" fluid>
    <h2 class="text-headline-large text-md-display-medium font-weight-bold mb-2 text-center">
      Premium Across the Ecosystem
    </h2>

    <p class="text-body-large text-medium-emphasis mb-8 text-center">
      Your subscription unlocks features on every Vuetify property
    </p>

    <v-row>
      <v-col
        v-for="property in properties"
        :key="property.name"
        cols="12"
        md="4"
        sm="6"
      >
        <v-card
          :href="property.url"
          class="pa-4 d-flex align-start"
          elevation="0"
          height="100%"
          rounded="xl"
          target="_blank"
          border
        >
          <v-avatar
            :color="property.color"
            class="mr-4"
            rounded="lg"
            size="48"
          >
            <v-icon
              :icon="property.icon"
              color="white"
              size="24"
            />
          </v-avatar>

          <div class="flex-grow-1">
            <div class="d-flex align-center mb-1">
              <span class="text-body-large font-weight-bold">{{ property.name }}</span>

              <v-icon
                class="ml-1 text-medium-emphasis"
                icon="mdi-open-in-new"
                size="14"
              />
            </div>

            <p class="text-body-medium text-medium-emphasis mb-2">
              {{ property.description }}
            </p>

            <div class="d-flex flex-wrap ga-1 mx-n1 mb-n1 mt-4">
              <v-chip
                v-for="feature in property.features"
                :key="feature"
                :text="feature"
                color="primary"
                size="x-small"
                variant="tonal"
              />
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  const properties = [
    {
      name: 'Vuetify Play',
      icon: '$vuetify-play',
      color: 'blue',
      url: 'https://play.vuetifyjs.com',
      description: 'Interactive playground for prototyping and sharing Vuetify code.',
      features: ['Private playgrounds', 'Cloud sync', 'Version history'],
    },
    {
      name: 'Vuetify Bin',
      icon: '$vuetify-bin',
      color: 'green',
      url: 'https://bin.vuetifyjs.com',
      description: 'Code snippet sharing with syntax highlighting and live collaboration.',
      features: ['Private bins', 'Embeds', 'Real-time editing'],
    },
    {
      name: 'Vuetify Studio',
      icon: '$vuetify-studio',
      color: 'deep-purple',
      url: 'https://studio.vuetifyjs.com',
      description: 'Visual design tool for building Vuetify interfaces.',
      features: ['Visual editor', 'Component library', 'Export code'],
    },
    {
      name: 'Vuetify Link',
      icon: '$vuetify-link',
      color: 'purple',
      url: 'https://link.vuetifyjs.com',
      description: 'URL shortener with click tracking for the Vuetify ecosystem.',
      features: ['Click analytics', 'Custom slugs', 'QR codes'],
    },
    {
      name: 'Vuetify Issues',
      icon: '$vuetify-issues',
      color: 'orange',
      url: 'https://issues.vuetifyjs.com',
      description: 'Structured bug reporting and feature requests for Vuetify.',
      features: ['Guided forms', 'Auto-validation', 'Issue tracking'],
    },
    {
      name: 'Documentation',
      icon: '$vuetify-outline',
      color: 'primary',
      url: 'https://vuetifyjs.com',
      description: 'The official Vuetify documentation with enhanced navigation.',
      features: ['Ad-free', 'Pinned pages', 'Rail nav'],
    },
  ]
</script>
