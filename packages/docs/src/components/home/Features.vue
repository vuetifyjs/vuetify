<template>
  <v-responsive class="py-10">
    <v-container class="pb-0">
      <HomeBgGradient color="grey" />

      <h4 class="text-md-h4 text-h5 font-weight-bold mb-10">
        More Than Components. A Complete Vue Ecosystem.
      </h4>

      <v-row justify="center">
        <v-col
          v-for="(feature, i) in features"
          :key="i"
          class="d-flex flex-shrink-1"
          cols="12"
          lg="3"
          md="6"
        >
          <v-card
            class="text-left d-flex flex-column pa-5"
            rounded="lg"
            width="100%"
            border
            flat
          >
            <v-avatar :color="feature.color" class="ml-3 mb-3" size="60">
              <v-icon :icon="feature.icon" size="30" />
            </v-avatar>

            <v-card-title>
              {{ feature.title }}
            </v-card-title>

            <v-card-text>
              {{ feature.description }}
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary">
                Learn more
                <v-icon icon="mdi-arrow-right" />
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script setup>
  const features = [
    {
      title: 'Core Framework',
      description: '700+ Material-compliant Vue components, themable by default.',
      icon: 'mdi-view-dashboard',
      color: 'indigo',
    },
    {
      title: 'Official Labs',
      description: 'Pro tables, Charts, Maps, and more (beta).',
      icon: 'mdi-factory',
      color: 'teal',
    },
    {
      title: 'Community Plugins',
      description: '50+ extensions on Vuetify Hub.',
      color: 'deep-purple',
      icon: 'mdi-account-group-outline',
    },
    {
      title: 'Partner Integrations',
      description: 'Nuxt, Storybook, Vite, Figma kits.',
      color: 'purple',
      icon: 'mdi-source-commit',
    },
  ]
</script>
