<template>
  <v-container>
    <v-card>
      <v-card-title class="px-8 pt-6 pb-3">Documents uploaded</v-card-title>
      <v-card-text class="px-6 pt-3 pb-8">
        <v-heatmap
          :group-by="(v) => adapter.format(v.date, 'monthAndYear')"
          :item-row="(v) => adapter.toJsDate(v.date).getDay()"
          :items="items"
          :rows="[0, 1, 2, 3, 4, 5, 6]"
          :thresholds="thresholds"
          style="max-width: 100%"
          hover
          legend
        >
          <template v-slot:row-header="{ items: rowItems }">
            {{ adapter.format(rowItems[0].raw.date, 'weekdayShort') }}
          </template>
          <template v-slot:group-header="{ items: groupItems }">
            <div class="text-center">
              {{ adapter.format(groupItems[0].raw.date, 'month') }}
            </div>
          </template>
          <template v-slot:cell="{ item }">
            <v-menu
              v-if="item && item.value > 0"
              :close-delay="0"
              :open-delay="400"
              activator="parent"
              location="bottom"
              open-on-hover
            >
              <v-card min-width="220" rounded="lg">
                <v-card-text>
                  <div class="text-body-1 mb-3">
                    {{ adapter.format(item.raw.date, 'fullDateWithWeekday') }}
                  </div>
                  <div class="text-caption text-medium-emphasis">Documents</div>
                  <div class="d-flex align-center ga-2 mt-1">
                    <div
                      :style="{ background: item.color, width: '14px', height: '14px', borderRadius: '2px' }"
                    ></div>
                    <span class="text-h6">{{ item.value }}</span>
                  </div>
                </v-card-text>
              </v-card>
            </v-menu>
          </template>
        </v-heatmap>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { computed } from 'vue'
  import { useDate, useTheme } from 'vuetify'

  const adapter = useDate()
  const theme = useTheme()

  const thresholds = computed(() => theme.current.value.dark
    ? [
      { min: 1, color: '#0E4429' },
      { min: 4, color: '#006D32' },
      { min: 8, color: '#26A641' },
      { min: 12, color: '#39D353' },
    ]
    : [
      { min: 1, color: '#9BE9A8' },
      { min: 4, color: '#40C463' },
      { min: 8, color: '#30A14E' },
      { min: 12, color: '#216E39' },
    ])

  const today = adapter.date()
  const startDate = adapter.startOfMonth(adapter.addMonths(today, -6))
  const endDate = adapter.endOfMonth(adapter.addMonths(today, 1))
  const totalDays = adapter.getDiff(endDate, startDate, 'days') + 1

  const items = []
  for (let i = 0; i < totalDays; i++) {
    const date = adapter.addDays(startDate, i)
    const weekday = adapter.toJsDate(date).getDay()
    const isWeekend = weekday === 0 || weekday === 6
    const isFuture = adapter.isAfter(date, today)
    const value = isWeekend || isFuture ? 0 : Math.floor(Math.random() * 14.99)
    items.push({ date, value })
  }
</script>
