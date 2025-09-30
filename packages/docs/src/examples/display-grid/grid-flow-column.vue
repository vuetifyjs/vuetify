<template>
  <div class="d-grid grid-cols-3 grid-flow-col ga-4 bg-surface-variant pa-4">
    <v-sheet
      v-for="n in 6"
      :key="n"
      class="pa-4 text-center"
    >
      Item {{ n }}
    </v-sheet>
  </div>
</template>
