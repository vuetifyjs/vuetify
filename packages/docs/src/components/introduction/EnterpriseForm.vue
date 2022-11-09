<template>
  <v-card
    id="request-a-quote"
    border
    class="mx-auto pa-2"
    max-width="440"
    title="Request a Quote"
    variant="flat"
  >
    <template #append>
      <v-img
        width="96"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
      />
    </template>

    <v-card-text>
      <v-text-field label="Name" />

      <v-text-field label="Email address" />
    </v-card-text>

    <v-card-actions class="px-4 mt-n4 pb-4">
      <v-spacer />

      <v-btn size="large" block color="primary" variant="flat">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  // import { computed, ref } from 'vue'
</script>
