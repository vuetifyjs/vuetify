<template>
  <v-container>
    <v-card>
      <v-card-title class="px-8 pt-6 pb-3">Documents uploaded</v-card-title>
      <v-card-text class="px-6 pt-3 pb-8 overflow-x-auto">
        <v-heatmap
          :group-by="(v) => v.date.substring(0, 7)"
          :item-row="(v) => new Date(v.date).getDay()"
          :items="items"
          :rows="[0, 1, 2, 3, 4, 5, 6]"
          :thresholds="thresholds"
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

  const currentYear = new Date().getFullYear()
  const startMonth = 3 * Math.floor(new Date().getMonth() / 3 - 1)
  const monthCount = 4

  const items = []
  for (let i = 0; i < monthCount; i++) {
    const month = startMonth + i
    const daysCount = new Date(currentYear, month + 1, 0).getDate()
    for (let day = 0; day < daysCount; day++) {
      const date = new Date(currentYear, month, day + 1)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const isFuture = date > new Date()
      const value = isWeekend || isFuture ? 0 : Math.floor(Math.random() * 14.99)
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      items.push({ date: `${currentYear}-${m}-${d}`, value })
    }
  }
</script>
