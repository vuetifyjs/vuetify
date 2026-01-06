<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="px-8 pt-6 pb-3">Documents uploaded</v-card-title>
        <v-card-text class="px-6 pt-3 pb-8">
          <v-heatmap
            :first-weekday="6"
            :month-limit="monthLimit"
            :start-month="startMonth"
            :thresholds="thresholds"
            :values="eventsPerDay"
            :year="currentYear"
          >
            <template #tooltip="{ item }">
              <v-tooltip
                v-if="item"
                :close-delay="0"
                :open-delay="400"
                activator="parent"
                location="bottom"
                open-on-hover
              >
                <span>
                  {{ item.dateText }}:
                  <span :class="{ 'font-weight-bold': item.value > 0 }">{{ item.value || 'No' }}</span>
                  document{{ item.value === 1 ? '' : 's' }}
                </span>
              </v-tooltip>
            </template>
          </v-heatmap>
        </v-card-text>
      </v-card>
    </v-container>
    <v-btn
      class="ma-2"
      icon="mdi-theme-light-dark"
      location="top right"
      position="absolute"
      @click="$vuetify.theme.cycle()"
    />
  </v-app>
</template>

<script setup lang="ts">
  import { useTheme } from '@/composables'
  import { toRef } from 'vue'

  const { global } = useTheme()

  const currentYear = new Date().getFullYear()
  const startMonth = 3 * Math.floor(new Date().getMonth() / 3 - 1)
  const monthLimit = 6

  const thresholds = toRef(() => global.current.value.dark
    ? [
      { min: 1, color: '#12334C' },
      { min: 4, color: '#1D5783' },
      { min: 8, color: '#2978B3' },
      { min: 12, color: '#3BABFF' },
    ] : [
      { min: 1, color: '#ACD3F0' },
      { min: 4, color: '#83BDE9' },
      { min: 8, color: '#59A7E1' },
      { min: 12, color: '#2674AE' },
    ])

  const eventsPerDay: number[][] = Array.from({ length: monthLimit })
    .map((_, i) => startMonth + i)
    .map(month => {
      const daysCount = new Date(currentYear, month + 1, 0).getDate()
      return Array.from({ length: daysCount })
        .map((_, day) => {
          const date = new Date(currentYear, month, day)
          const isWeekend = date.getDay() >= 5
          const isFuture = date > new Date()
          return isWeekend || isFuture ? 0 : Math.floor(Math.random() * 14.99)
        })
    })
</script>
