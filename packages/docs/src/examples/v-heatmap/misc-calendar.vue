<template>
  <v-container fluid>
    <v-card class="pa-2">

      <v-heatmap
        :group-by="groupBy"
        :group-gap="groupGap"
        :item-row="itemRow"
        :items="items"
        :rows="rows"
        :thresholds="thresholds"
        cell-size="20"
        gap="4"
        style="max-width: 100%"
        hover
        legend
      >

        <template v-slot:row-header="{ row, items: rowItems }">
          {{ row % 2 ? adapter.format(rowItems[0].raw.date, 'weekdayShort') : '' }}
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

    </v-card>

    <v-container max-width="500">
      <div class="px-4 py-2 rounded border">
        <v-slider
          v-model="hue"
          :max="360"
          :min="0"
          :step="1"
          class="hue-slider mb-1"
          track-size="8"
          hide-details
        ></v-slider>
        <v-slider
          v-model="groupGap"
          :max="50"
          :min="0"
          :step="1"
          label="Group offset"
          hide-details
        ></v-slider>
      </div>
    </v-container>

  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useDate, useTheme } from 'vuetify'

  const adapter = useDate()
  const theme = useTheme()

  const groupGap = ref(24)
  const hue = ref(140)

  const rows = [0, 1, 2, 3, 4, 5, 6]
  const groupBy = v => adapter.format(v.date, 'monthAndYear')
  const itemRow = v => adapter.toJsDate(v.date).getDay()

  const thresholds = computed(() => {
    const isDark = theme.current.value.dark
    const saturation = isDark ? 60 : 55
    const lightnesses = isDark ? [16, 28, 42, 58] : [78, 60, 42, 28]

    return [1, 4, 8, 12].map((min, i) => ({
      min,
      color: `hsl(${hue.value}, ${saturation}%, ${lightnesses[i]}%)`,
    }))

    // works with linear scale too
    // return {
    //   from: { min: 1, color: `hsl(${hue.value}, ${saturation}%, ${lightnesses[0]}%)` },
    //   to: { min: 12, color: `hsl(${hue.value}, ${saturation}%, ${lightnesses[3]}%)` },
    // }
  })

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
    const value = isWeekend || isFuture ? null : Math.floor(Math.random() * 14.99) || null
    items.push({ date, value })
  }
</script>

<style>
.hue-slider {
  .v-slider-track__background {
    background: linear-gradient(to right, red, #ff0, #0f0, #0ff, #00f, #f0f, red);
    opacity: 1;
  }
  .v-slider-track__fill {
    opacity: 0;
  }
}
</style>
