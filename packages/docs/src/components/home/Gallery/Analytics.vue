<template>
  <div>
    <v-toolbar color="transparent">
      <v-toolbar-title class="text-title-large">Analytics</v-toolbar-title>

      <template #append>
        <v-btn-toggle v-model="range" density="compact" variant="outlined" mandatory>
          <v-btn size="small" text="7D" value="7d" />
          <v-btn size="small" text="30D" value="30d" />
          <v-btn size="small" text="90D" value="90d" />
        </v-btn-toggle>
      </template>
    </v-toolbar>

    <v-container fluid>
      <v-row>
        <v-col v-for="stat in stats" :key="stat.title" cols="6" md="3">
          <v-card elevation="0" rounded="lg" border>
            <v-card-text class="pb-0">
              <div class="text-body-small text-medium-emphasis">{{ stat.title }}</div>
              <div class="d-flex align-center justify-space-between">
                <span class="text-title-large">{{ stat.value }}</span>
                <v-chip
                  :color="stat.change > 0 ? 'success' : 'error'"
                  :prepend-icon="stat.change > 0 ? 'mdi-arrow-up' : 'mdi-arrow-down'"
                  :text="`${Math.abs(stat.change)}%`"
                  size="x-small"
                  variant="tonal"
                />
              </div>
            </v-card-text>

            <v-sparkline
              :color="stat.change > 0 ? 'success' : 'error'"
              :gradient="stat.change > 0 ? ['#4CAF50', '#81C784'] : ['#F44336', '#E57373']"
              :line-width="2"
              :model-value="stat.data"
              height="40"
              padding="8"
              fill
              smooth
            />
          </v-card>
        </v-col>
      </v-row>

      <v-card
        class="mt-4"
        elevation="0"
        rounded="lg"
        title="Top Pages"
        border
        flat
      >
        <template #text>
          <v-data-table
            :headers="headers"
            :items="pages"
            :items-per-page="5"
            hide-default-footer
          >
            <template #item.page="{ item }">
              <div class="d-flex align-center ga-2">
                <v-icon color="primary" icon="mdi-file-document-outline" size="small" />
                <span>{{ item.page }}</span>
              </div>
            </template>

            <template #item.trend="{ item }">
              <v-sparkline
                :color="item.change >= 0 ? 'success' : 'error'"
                :line-width="2"
                :model-value="item.trend"
                height="24"
                padding="4"
                width="80"
                smooth
              />
            </template>

            <template #item.change="{ item }">
              <v-chip
                :color="item.change >= 0 ? 'success' : 'error'"
                size="small"
                variant="text"
              >
                <v-icon
                  :icon="item.change >= 0 ? 'mdi-trending-up' : 'mdi-trending-down'"
                  size="small"
                  start
                />
                {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
              </v-chip>
            </template>

            <template #item.sessions="{ item }">
              <span class="font-weight-medium">{{ item.sessions.toLocaleString() }}</span>
            </template>
          </v-data-table>
        </template>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  const range = shallowRef('30d')

  const stats = [
    {
      title: 'Page Views',
      value: '24.5K',
      change: 12,
      data: [4, 6, 8, 7, 10, 9, 12, 14, 13, 16, 15, 18],
    },
    {
      title: 'Visitors',
      value: '8,234',
      change: 8,
      data: [3, 4, 5, 4, 6, 7, 6, 8, 9, 8, 10, 11],
    },
    {
      title: 'Bounce Rate',
      value: '42.3%',
      change: -5,
      data: [50, 48, 52, 49, 47, 45, 48, 44, 46, 43, 45, 42],
    },
    {
      title: 'Avg. Duration',
      value: '3m 24s',
      change: 15,
      data: [2, 2.2, 2.5, 2.4, 2.8, 2.6, 3, 2.9, 3.2, 3.1, 3.3, 3.4],
    },
  ]

  const headers = [
    { title: 'Page', key: 'page', sortable: false },
    { title: 'Trend', key: 'trend', sortable: false, width: 100 },
    { title: 'Sessions', key: 'sessions', align: 'end' as const },
    { title: 'Change', key: 'change', align: 'end' as const },
  ]

  const pages = [
    {
      page: '/getting-started/installation',
      sessions: 12453,
      change: 24,
      trend: [8, 10, 9, 12, 11, 14, 13, 16],
    },
    {
      page: '/components/buttons',
      sessions: 8721,
      change: 18,
      trend: [6, 7, 8, 7, 9, 10, 11, 12],
    },
    {
      page: '/components/data-tables',
      sessions: 6534,
      change: -3,
      trend: [10, 9, 11, 8, 9, 7, 8, 7],
    },
    {
      page: '/styles/colors',
      sessions: 5210,
      change: 7,
      trend: [4, 5, 4, 6, 5, 7, 6, 7],
    },
    {
      page: '/features/theme',
      sessions: 4102,
      change: 31,
      trend: [3, 4, 5, 6, 7, 8, 10, 12],
    },
  ]
</script>
