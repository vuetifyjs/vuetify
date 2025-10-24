<template>
  <div>
    <div class="d-grid grid-cols-1 grid-cols-md-2 grid-cols-lg-3 ga-4 bg-surface-variant pa-4 mb-6">
      <v-sheet
        v-for="n in 6"
        :key="n"
        class="pa-2 text-center"
      >
        Responsive Item {{ n }}
      </v-sheet>
    </div>
  </div>
</template>
