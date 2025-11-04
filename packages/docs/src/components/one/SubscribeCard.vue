<template>
  <v-container class=" d-flex justify-center align-center text-center py-10">
    <v-card class="pa-10" elevation="6" max-width="600">
      <v-card-title class="text-h4 font-weight-bold mb-4">Unlock Vuetify One</v-card-title>

      <v-card-text class="text-body-1 mb-6">
        Get priority support, advanced themes, and the future of Vuetify UI<span v-if="team">, for your entire team, all</span> in one subscription.
      </v-card-text>

      <v-row class="mb-6" justify="center">
        <v-col cols="12">
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-check">Ad Free Experience on all Vuetify properties</v-list-item>
            <v-list-item prepend-icon="mdi-check">Save and share across our platforms VPlay, VBin, and VStudio</v-list-item>
            <v-list-item prepend-icon="mdi-check">Pinned Navigation Items and Rail drawer in Documentation</v-list-item>
            <v-list-item prepend-icon="mdi-check">Customize Navigation components with Page Suits</v-list-item>
            <v-list-item prepend-icon="mdi-check">Custom Vuetify One menu avatar</v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <div class="d-flex flex-column justify-center align-center mb-2">
        <p class="text-h5 font-weight-bold">{{ price }}</p>
        <v-switch v-model="team" color="primary" label="Team Subscription" />
      </div>

      <v-btn class="mb-4" color="primary" rounded="lg" size="x-large">
        Subscribe Now
      </v-btn>

      <div class="text-caption text-medium-emphasis">
        Cancel any time. No long‑term commitment.
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
  const team = ref(false)

  const price = computed(() => {
    return team.value ? '$29.99/month' : '$2.99/month'
  })
</script>

<style scoped>
.fill-height {
min-height: 100vh;
}
</style>
