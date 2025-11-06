<template>
  <v-container class="pa-md-12 pa-4 mx-auto text-center" max-width="700" fluid>
    <v-card
      id="subscribe"
      class="pa-2"
      elevation="0"
      rounded="xl"
      border
    >
      <v-card-title class="text-h4 text-md-h3 font-weight-bold mb-4">
        Unlock Vuetify One
      </v-card-title>

      <v-card-text class="text-body-2 text-medium-emphasis mb-6">
        <div class="text-h6 font-weight-bold text-high-emphasis mb-2">
          {{ team ? 'Team Access' : 'Solo Developer' }}
        </div>

        Get priority support, advanced themes, and the future of Vuetify UI<span v-if="team">, for your entire team, all</span> in one subscription.
      </v-card-text>

      <v-list class="mb-6 px-0 text-start" density="compact" slim>
        <v-list-item v-for="item in items" :key="item">
          <template #prepend>
            <v-icon color="primary" icon="mdi-check" />
          </template>

          <v-list-item-title :class="$vuetify.display.smAndDown ? 'text-caption' : ''" class="text-wrap">
            {{ item }}
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-btn-toggle
        v-model="type"
        class="mb-6"
        rounded="lg"
        variant="outlined"
        mandatory
      >
        <v-btn class="text-none" prepend-icon="mdi-account-outline" text="Solo Developer" value="solo" />
        <v-btn append-icon="mdi-account-group-outline" class="text-none" text="Team Access" value="team" />
      </v-btn-toggle>

      <div class="mb-6">
        <div class="text-overline text-medium-emphasis">
          {{ interval === 'year' ? 'ANNUAL' : 'MONTHLY' }}
        </div>
        <div class="text-h3 font-weight-bold text-primary mb-2">
          ${{ prices[type][interval] }}
        </div>
      </div>

      <v-btn
        :loading="one.isLoading"
        class="mb-4 text-none"
        color="primary"
        rounded="lg"
        size="x-large"
        text="Subscribe Now"
        variant="flat"
        block
        @click="subscribe"
      />

      <v-sheet
        class="d-flex justify-center align-center pa-2 mb-4"
        color="transparent"
        rounded="lg"
      >
        <v-switch
          v-model="interval"
          color="primary"
          density="compact"
          false-value="month"
          label="Annual Billing (Save 20%)"
          true-value="year"
          hide-details
          inset
        />
      </v-sheet>

      <div class="text-caption text-medium-emphasis">
        Cancel any time. No long‑term commitment.
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  const features = {
    solo: [
      'Access for a Single Developer',
      'Ad Free Experience on all Vuetify properties',
      'Premium tools on our platforms; VPlay, VBin, VLink, and VStudio',
      'Pinned Navigation Items and Rail drawer in Documentation',
      'Customize Navigation components with Page Suits',
      'Custom Vuetify One menu avatar',
    ],
    team: [
      'Access for up to 25 team members',
      'Ad Free Experience on all Vuetify properties',
      'Premium tools on our platforms; VPlay, VBin, VLink, and VStudio',
      'Pinned Navigation Items and Rail drawer in Documentation',
      'Customize Navigation components with Page Suits',
      'Custom Vuetify One menu avatar',
    ],
  }

  const one = useOneStore()
  const type = ref <'solo' | 'team'>('solo')
  const interval = ref<'month' | 'year'>('month')

  const team = computed(() => type.value === 'team')

  const items = computed(() => features[type.value])

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
