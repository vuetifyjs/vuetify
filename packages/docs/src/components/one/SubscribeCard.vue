<template>
  <v-container id="features" class="pa-md-12 pa-4 mx-auto" max-width="900" fluid>
    <h2 class="text-headline-large text-md-display-medium font-weight-bold mb-2 text-center">
      What You Get
    </h2>

    <p class="text-body-large text-medium-emphasis mb-8 text-center">
      Choose the plan that fits your needs
    </p>

    <v-row>
      <v-col cols="12" md="6">
        <v-card
          :class="{ 'border-primary border-opacity-100': type === 'solo' }"
          class="pa-6 h-100 d-flex flex-column"
          elevation="0"
          rounded="xl"
          border
          @click="type = 'solo'"
        >
          <div class="d-flex align-center mb-4">
            <v-icon class="mr-3" color="primary" icon="mdi-account" size="32" />

            <div>
              <div class="text-title-large font-weight-bold">Solo Developer</div>

              <div class="text-body-medium text-medium-emphasis">For individual developers</div>
            </div>
          </div>

          <div class="mb-6">
            <span class="text-headline-large font-weight-bold">${{ prices.solo[interval].split(' ')[0] }}</span>

            <span class="text-body-medium text-medium-emphasis">{{ interval === 'year' ? '/year' : '/month' }}</span>
          </div>

          <v-list
            id="subscribe-now"
            bg-color="transparent"
            class="flex-grow-1 px-0"
            density="compact"
            slim
          >
            <v-list-item v-for="item in features.solo" :key="item.text" class="px-0">
              <template #prepend>
                <v-icon
                  :color="item.new ? 'success' : item.soon ? 'warning' : 'info-lighten-3'"
                  :icon="item.new ? 'mdi-new-box' : item.soon ? 'mdi-clock-outline' : 'mdi-check-circle'"
                  size="20"
                />
              </template>

              <v-list-item-title class="text-wrap text-body-medium">
                {{ item.text }}
              </v-list-item-title>

              <template v-if="item.soon" #append>
                <v-chip
                  color="warning"
                  size="x-small"
                  text="Soon"
                  variant="tonal"
                />
              </template>
            </v-list-item>
          </v-list>

          <v-btn
            :loading="one.isLoading && type === 'solo'"
            :text="type === 'solo' ? 'Subscribe Now' : 'Select Plan'"
            :variant="type === 'solo' ? 'flat' : 'outlined'"
            class="mt-4 text-none"
            color="primary"
            rounded="lg"
            size="large"
            block
            @click.stop="type = 'solo'; subscribe()"
          />
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          :class="{ 'border-primary border-opacity-100': type === 'team' }"
          class="pa-6 h-100 d-flex flex-column"
          elevation="0"
          rounded="xl"
          border
          @click="type = 'team'"
        >
          <div class="d-flex align-center mb-4">
            <v-icon
              class="mr-3"
              color="primary"
              icon="mdi-account-group"
              size="32"
            />

            <div>
              <div class="text-title-large font-weight-bold">
                Team

                <v-chip
                  class="ml-2"
                  color="primary"
                  size="x-small"
                  text="Best Value"
                  variant="tonal"
                />
              </div>

              <div class="text-body-medium text-medium-emphasis">For teams up to 25 members</div>
            </div>
          </div>

          <div class="mb-6">
            <span class="text-headline-large font-weight-bold">${{ prices.team[interval].split(' ')[0] }}</span>

            <span class="text-body-medium text-medium-emphasis">{{ interval === 'year' ? '/year' : '/month' }}</span>
          </div>

          <v-list bg-color="transparent" class="flex-grow-1 px-0" density="compact" slim>
            <v-list-item v-for="item in features.team" :key="item.text" class="px-0">
              <template #prepend>
                <v-icon
                  :color="item.new ? 'success' : item.soon ? 'warning' : 'info-lighten-3'"
                  :icon="item.new ? 'mdi-new-box' : item.soon ? 'mdi-clock-outline' : 'mdi-check-circle'"
                  size="20"
                />
              </template>

              <v-list-item-title class="text-wrap text-body-medium">
                {{ item.text }}
              </v-list-item-title>

              <template v-if="item.soon" #append>
                <v-chip
                  color="warning"
                  size="x-small"
                  text="Soon"
                  variant="tonal"
                />
              </template>
            </v-list-item>
          </v-list>

          <v-btn
            :loading="one.isLoading && type === 'team'"
            :text="type === 'team' ? 'Subscribe Now' : 'Select Plan'"
            :variant="type === 'team' ? 'flat' : 'outlined'"
            class="mt-4 text-none"
            color="primary"
            max-height="44"
            rounded="lg"
            size="large"
            block
            @click.stop="type = 'team'; subscribe()"
          />
        </v-card>
      </v-col>
    </v-row>

    <div class="d-flex justify-center align-center ga-4 mt-10">
      <v-btn-toggle
        v-model="interval"
        color="primary"
        rounded="pill"
        variant="outlined"
        mandatory
      >
        <v-btn class="text-none" min-width="137" text="Monthly" value="month" />

        <v-btn class="text-none" min-width="137" value="year">
          Annual

          <v-chip
            class="ml-2"
            color="success"
            size="x-small"
            text="-20%"
            variant="flat"
          />
        </v-btn>
      </v-btn-toggle>
    </div>

    <p class="text-body-small text-medium-emphasis text-center mt-4">
      Cancel anytime. Secure payment via Stripe.
    </p>
  </v-container>
</template>

<script setup lang="ts">
  const features = {
    solo: [
      { text: 'Ad-free experience across all Vuetify properties' },
      { text: 'Private playgrounds, bins, links, and studios with cloud sync' },
      { text: 'Premium documentation features (pinned nav, rail menu, copy page as markdown)' },
      { text: 'Early access to new tools and features' },
      { text: 'Vuetify MCP API (access to your one data anywhere that supports MCP)', new: true },
      { text: 'Share live updates on Bins and Playgrounds', soon: true },
      { text: 'Embed playgrounds in your own documentation', soon: true },
    ],
    team: [
      { text: 'Everything in Solo, for up to 25 members' },
      { text: 'Centralized team billing and member management' },
      { text: 'Shared playgrounds and code snippets', new: false },
      { text: 'Team shared Private Bins and Playgrounds', soon: true },
      { text: 'Usage analytics dashboard', soon: true },
    ],
  }

  const one = useOneStore()
  const type = shallowRef<'solo' | 'team'>('solo')
  const interval = shallowRef<'month' | 'year'>('year')

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
