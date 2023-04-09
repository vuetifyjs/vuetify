<template>
  <div>
    <div class="d-flex justify-start mb-6 bg-surface-variant">
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        justify-start
      </v-sheet>
    </div>

    <div class="d-flex justify-end mb-6 bg-surface-variant">
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        justify-end
      </v-sheet>
    </div>

    <div class="d-flex justify-center mb-6 bg-surface-variant">
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        justify-center
      </v-sheet>
    </div>

    <div class="d-flex justify-space-between mb-6 bg-surface-variant">
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        justify-space-between
      </v-sheet>
    </div>

    <div class="d-flex justify-space-around mb-6 bg-surface-variant">
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        justify-space-around
      </v-sheet>
    </div>

    <div class="d-flex justify-space-evenly mb-6 bg-surface-variant">
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        justify-space-evenly
      </v-sheet>
    </div>
  </div>
</template>
