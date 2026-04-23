<template>
  <v-container class="pa-md-12 pa-4 mx-auto" max-width="700" fluid>
    <v-card
      class="pa-8 pa-md-12 text-center"
      elevation="0"
      rounded="xl"
      border
    >
      <h2 class="text-headline-large text-md-display-small font-weight-bold mb-4">
        Talk to the team
      </h2>

      <p class="text-body-large text-medium-emphasis mb-8">
        Every sponsorship starts with a short conversation about what your team needs. Email is the fastest way to kick it off.
      </p>

      <div class="d-flex ga-4 justify-center flex-wrap">
        <v-btn
          class="text-none"
          color="primary"
          href="mailto:sponsor@vuetifyjs.com"
          rounded="lg"
          size="x-large"
          text="Email the team"
        />

        <v-btn
          class="text-none"
          color="primary"
          href="https://calendly.com/vuetify/conference-call-30-min"
          rel="noopener noreferrer"
          rounded="lg"
          size="x-large"
          target="_blank"
          text="Schedule a call"
          variant="outlined"
        />
      </div>

      <p class="text-body-small text-medium-emphasis mt-6 mb-0">
        Or reach out directly at
        <AppLink href="mailto:sponsor@vuetifyjs.com">sponsor@vuetifyjs.com</AppLink>
      </p>
    </v-card>
  </v-container>
</template>
