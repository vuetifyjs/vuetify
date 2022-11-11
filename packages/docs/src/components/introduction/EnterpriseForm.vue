<template>
  <v-card
    id="request-service"
    border
    class="mx-auto pa-2"
    max-width="440"
    title="Request Service"
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

      <div class="py-2">
        <v-label>What services are you interested in?</v-label>

        <v-defaults-provider
          :defaults="{
            VCheckbox: {
              density: 'comfortable',
              hideDetails: true
            }
          }"
        >
          <v-checkbox label="Upgrading an existing project" />

          <v-checkbox label="Application performance review" />

          <v-checkbox label="Direct support or SLA" />

          <!-- <v-checkbox label="Training & workshops" /> -->
        </v-defaults-provider>
      </div>

      <v-textarea label="Questions and comments" />

      <small class="text-medium-emphasis">
        *All service packages are custom per client with pricing based upon the requested services.
      </small>
    </v-card-text>

    <v-card-actions class="px-4 pb-4">
      <v-spacer />

      <v-btn size="large" block color="primary" variant="flat">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  // import { computed, ref } from 'vue'
</script>
