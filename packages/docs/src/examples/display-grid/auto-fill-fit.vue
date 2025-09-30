<template>
  <div>
    <div class="mb-4">
      <h6 class="text-subtitle-1 mb-2">Auto-Fill (keeps empty columns, items stay narrow)</h6>
      <div class="d-grid grid-cols-auto-fill-200 ga-4 bg-surface-variant pa-4" style="width: 100%; min-width: 800px;">
        <v-sheet
          v-for="n in 2"
          :key="n"
          class="pa-4 text-center"
          style="min-height: 80px;"
        >
          <div class="text-subtitle-2">Fill Item {{ n }}</div>
          <div class="text-caption">Stays 200px wide</div>
        </v-sheet>
      </div>
    </div>

    <div>
      <h6 class="text-subtitle-1 mb-2">Auto-Fit (removes empty columns, items stretch to fill)</h6>
      <div class="d-grid grid-cols-auto-fit-200 ga-4 bg-surface-variant pa-4" style="width: 100%; min-width: 800px;">
        <v-sheet
          v-for="n in 2"
          :key="n"
          class="pa-4 text-center"
          style="min-height: 80px;"
        >
          <div class="text-subtitle-2">Fit Item {{ n }}</div>
          <div class="text-caption">Stretches to fill space</div>
        </v-sheet>
      </div>
    </div>
  </div>
</template>
