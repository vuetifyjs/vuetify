<template>
  <v-card
    class="mx-auto"
    elevation="1"
    max-width="500"
  >
    <v-card-title class="py-5 font-weight-black">Securely access your tax form</v-card-title>

    <v-card-text>
      To download your tax form from GitHub Sponsors on Stripe Express, you must also verify the Tax ID number used on your tax forms, as they contain sensitive personal information.
    </v-card-text>

    <v-card-text>
      <div class="text-subtitle-2 font-weight-black mb-1">Last 4 digits of your SSN</div>

      <v-text-field variant="outlined" label="Enter value here" single-line></v-text-field>

      <v-btn block color="indigo-darken-3" class="text-none mb-4" variant="flat" size="x-large">Verify and continue</v-btn>
      <v-btn block color="grey-lighten-3" variant="flat" size="x-large" class="text-none">Cancel</v-btn>
    </v-card-text>
  </v-card>
</template>
