<template>
  <v-container class=" d-flex justify-center align-center text-center py-8 ga-4">
    <v-card
      id="subscribe"
      class="py-10"
      elevation="6"
      max-width="600"
    >
      <v-card-title class="text-h4 font-weight-bold mb-4">Unlock Vuetify One</v-card-title>

      <v-card-text class="text-body-1 mb-6">
        <h3 class="mb-1">{{ team ? 'Team Access' : 'Solo Developer' }}</h3>
        Get priority support, advanced themes, and the future of Vuetify UI<span v-if="team">, for your entire team, all</span> in one subscription.
      </v-card-text>

      <v-row justify="center">
        <v-col cols="12">
          <v-list density="compact">
            <v-list-item v-if="team" prepend-icon="mdi-check">Access for up to 25 team members</v-list-item>
            <v-list-item prepend-icon="mdi-check">Ad Free Experience on all Vuetify properties</v-list-item>
            <v-list-item prepend-icon="mdi-check">Save and share across our platforms VPlay, VBin, and VStudio</v-list-item>
            <v-list-item prepend-icon="mdi-check">Pinned Navigation Items and Rail drawer in Documentation</v-list-item>
            <v-list-item prepend-icon="mdi-check">Customize Navigation components with Page Suits</v-list-item>
            <v-list-item prepend-icon="mdi-check">Custom Vuetify One menu avatar</v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <div class="d-flex flex-column justify-center align-center mb-2">
        <p class="text-h5 font-weight-bold">${{ prices[type][interval] }}</p>
        <v-switch v-model="type" color="primary" false-value="solo" label="Team Subscription" true-value="team" />

        <v-btn :loading="one.isLoading" color="primary" rounded="lg" size="x-large" @click="subscribe">
          Subscribe Now
        </v-btn>
        <v-checkbox v-model="interval" color="primary" false-value="month" label="Annual Billing (Save 20%)" true-value="year" />
      </div>
      <div class="text-caption text-medium-emphasis">
        Cancel any time. No long‑term commitment.
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  const one = useOneStore()
  const type = ref <'solo' | 'team'>('solo')
  const interval = ref<'month' | 'year'>('month')

  const team = computed(() => type.value === 'team')

  const prices = {
    solo: {
      month: '2.99 /month',
      year: '29.99 /year',
    },
    team: {
      month: '29.99 /month',
      year: '299.99 /year',
    },
  }

  async function subscribe () {
    await one.subscribe(interval.value, type.value)
  }
</script>

<style scoped>
.fill-height {
min-height: 100vh;
}
</style>
