<template>
  <v-container class="sponsor-hero mx-auto text-center pa-md-12 pa-6 pb-7" fluid>
    <v-responsive class="mx-auto" max-width="760">
      <v-chip
        class="mb-6"
        color="primary"
        size="small"
        text="Enterprise Sponsorship"
        variant="tonal"
      />

      <h1 class="text-headline-large text-md-display-large font-weight-bold mb-4">
        Enterprise sponsorship for teams running Vuetify in production
      </h1>

      <p class="text-body-large text-md-title-large text-medium-emphasis mb-8">
        Direct support from the Vuetify team. Private Discord, priority bug fixes, roadmap input, and more.
      </p>

      <div class="d-flex ga-4 justify-center flex-wrap">
        <v-btn
          color="primary"
          href="mailto:sponsor@vuetifyjs.com"
          rounded="lg"
          size="x-large"
          text="Get in touch"
        />

        <v-btn
          color="primary"
          rounded="lg"
          size="x-large"
          text="See what's included"
          to="#included"
          variant="outlined"
        />
      </div>
    </v-responsive>
  </v-container>
</template>

<style scoped>
  .sponsor-hero {
    background: linear-gradient(
      180deg,
      rgba(var(--v-theme-primary), 0.28) 0%,
      rgba(var(--v-theme-background), 1) 100%
    );
  }
</style>
