<template>
  <div class="d-grid grid-rows-auto-fit-120 grid-cols-1 ga-4 bg-surface-variant pa-4" style="height: 400px;">
    <v-sheet
      v-for="n in 5"
      :key="n"
      class="pa-4 text-center d-flex align-center justify-center"
    >
      <div>
        <div class="text-subtitle-1 mb-2">Row {{ n }}</div>
        <div class="text-body-2">Auto-fit rows</div>
      </div>
    </v-sheet>
  </div>
</template>
