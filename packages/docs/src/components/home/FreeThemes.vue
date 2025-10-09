<template>
  <v-responsive class="py-16">
    <v-container class="pt-0">
      <HomeBgGradient color="grey" />

      <v-icon class="mb-5" color="primary" size="60">
        mdi-palette-outline
      </v-icon>

      <h4 class="text-h4 font-weight-bold mb-5">
        Free Themes for Everyone
      </h4>

      <v-responsive class="mx-auto mb-10" max-width="700">
        <h6 class="text-h6 font-weight-regular text-medium-emphasis">
          We're excited to announce that all Vuetify themes are now available for free!
          Download and use them in your projects with no limitations.
        </h6>
      </v-responsive>

      <v-row class="mb-10" justify="center">
        <v-col
          v-for="(theme, i) in themes"
          :key="i"
          class="d-flex"
          cols="12"
          lg="3"
          md="6"
        >
          <v-card
            class="text-left d-flex flex-column"
            rounded="lg"
            width="100%"
            border
            flat
          >
            <v-img
              gradient="to top, rgba(0,0,0,.0), rgba(0,0,0,0.1)"
              min-height="200px"
              cover
            >
              <HomeBgGradient :color="theme.primary" remove-opacity />
            </v-img>

            <v-card-title>
              {{ theme.title }}
            </v-card-title>

            <v-card-text class="flex-shrink-0">
              {{ theme.description }}
            </v-card-text>

            <v-card-actions class="flex-column align-start">
              <div class="px-2 mb-3">
                <v-avatar :color="theme.primary" class="border-sm me-2" size="30" />
                <v-avatar class="border-sm me-2" color="surface-light" size="30" />
                <v-avatar class="border-sm me-2" color="surface-bright" size="30" />
                <v-avatar class="border-sm me-2" color="surface-variant" size="30" />
              </div>

              <v-btn class="text-none" color="primary">
                <v-icon icon="mdi-download-outline" />
                Download
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <div>
        <v-btn
          append-icon="mdi-chevron-right"
          class="text-none"
          color="primary"
          rounded="lg"
          text="View all available themes"
          variant="text"
          flat
        />
      </div>
    </v-container>
  </v-responsive>
</template>

<script setup>
  const themes = [
    {
      title: 'Material Light',
      description: 'Classic Material Design light theme',
      primary: 'primary',
    },
    {
      title: 'Material Dark',
      description: 'Sleek dark mode Material Design theme',
      primary: 'grey',
    },
    {
      title: 'Corporate',
      description: 'Professional theme for business applications',
      primary: 'green',
    },
    {
      title: 'Creative',
      description: 'Vibrant theme for creative projects',
      primary: 'purple',
    },
  ]
</script>
