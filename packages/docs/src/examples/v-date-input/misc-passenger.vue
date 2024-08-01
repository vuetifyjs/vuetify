<template>
  <v-card class="mx-auto" max-width="420">
    <v-layout>
      <v-system-bar color="#4603c0">
        <v-icon icon="i-mdi:square"></v-icon>

        <v-icon icon="i-mdi:circle"></v-icon>

        <v-icon icon="i-mdi:triangle"></v-icon>
      </v-system-bar>

      <v-app-bar color="#6200ee" title="Passenger information" flat>
        <template v-slot:prepend>
          <v-btn icon="i-mdi:arrow-left"></v-btn>
        </template>
      </v-app-bar>

      <v-main>
        <v-container class="pt-8">
          <v-text-field
            label="Name"
            model-value="John Leider"
            variant="outlined"
          ></v-text-field>

          <v-date-input
            label="Date of birth"
            prepend-icon=""
            variant="outlined"
            persistent-placeholder
          ></v-date-input>

          <v-text-field label="Address" variant="outlined"></v-text-field>
          <v-text-field label="City" variant="outlined"></v-text-field>

          <div class="d-flex ga-2">
            <v-text-field label="State" variant="outlined"></v-text-field>

            <v-text-field label="Zip code" variant="outlined"></v-text-field>
          </div>
        </v-container>
      </v-main>
    </v-layout>

    <template v-slot:actions>
      <v-btn color="#4603c0" disabled>Prev</v-btn>

      <v-spacer></v-spacer>

      <v-btn color="#4603c0">Next</v-btn>
    </template>
  </v-card>
</template>
