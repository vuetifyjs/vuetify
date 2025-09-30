<template>
  <div class="d-grid grid-cols-3 ga-4 bg-surface-variant pa-4">
    <v-sheet
      v-for="n in 6"
      :key="n"
      class="pa-2 text-center"
    >
      Item {{ n }}
    </v-sheet>
  </div>
</template>
