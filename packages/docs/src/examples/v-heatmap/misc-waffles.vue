<template>
  <v-container max-width="800">
    <div class="d-flex flex-wrap justify-center">
      <template
        v-for="chart in charts"
        :key="chart.title"
      >
        <v-hover v-slot="{ isHovering, props: hoverProps }">
          <div class="py-3">
            <div
              v-bind="hoverProps"
              :class="['waffle-card text-center rounded-lg hover-elevation-3 pa-2 pt-3 mb-2', { 'bg-surface': isHovering }]"
              :style="{ transform: isHovering ? 'translateY(-2px)' : undefined }"
            >
              <div class="text-title-medium">{{ chart.title }}</div>

              <v-heatmap
                :cell-size="16"
                :columns="indexes"
                :gap="5"
                :items="toWaffle(chart.percent)"
                :rounded="3"
                :rows="indexes"
                :thresholds="[{ min: 1, color: chart.color }]"
                class="waffle-chart"
                hide-column-headers
                hide-row-headers
              ></v-heatmap>

            </div>
            <div class="d-flex align-center justify-center" style="height: 28px">
              <v-slide-y-transition>
                <v-chip
                  v-if="isHovering"
                  :color="chart.color"
                  :text="`${chart.percent}%`"
                  size="small"
                  variant="tonal"
                ></v-chip>
              </v-slide-y-transition>
            </div>
          </div>
        </v-hover>
      </template>
    </div>
  </v-container>
</template>

<script setup>
  import { computed, toRef } from 'vue'
  import { useDisplay } from 'vuetify'

  const { lgAndUp } = useDisplay()

  const waffleSize = toRef(() => lgAndUp.value ? 10 : 5)
  const indexes = computed(() => Array.from({ length: waffleSize.value }, (_, index) => index))

  const charts = [
    { title: 'Test coverage', percent: 87, color: '#10b981' },
    { title: 'Docs translated', percent: 64, color: '#8b5cf6' },
    { title: 'Budget used', percent: 23, color: '#f43f5e' },
  ]

  function toWaffle (percent) {
    const size = waffleSize.value
    const chunks = size * size
    return Array.from({ length: chunks }, (_, index) => ({
      row: size - Math.floor(index / size) - 1,
      column: index % size,
      value: index < percent * chunks / 100 ? 1 : 0,
    }))
  }
</script>

<style>
.waffle-card {
  transition: .2s ease-out;
}
.waffle-chart {
  .v-heatmap__body {
    padding: 2px;
  }
  .v-heatmap__cell-rect {
    stroke: currentColor;
    stroke-opacity: 0.3;
  }
}
</style>
