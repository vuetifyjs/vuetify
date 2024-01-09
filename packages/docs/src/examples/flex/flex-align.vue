<template>
  <div>
    <v-sheet
      class="d-flex align-start mb-6 bg-surface-variant"
      height="100"
    >
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        align-start
      </v-sheet>
    </v-sheet>

    <v-sheet
      class="d-flex align-end mb-6 bg-surface-variant"
      height="100"
    >
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        align-end
      </v-sheet>
    </v-sheet>

    <v-sheet
      class="d-flex align-center mb-6 bg-surface-variant"
      height="100"
    >
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        align-center
      </v-sheet>
    </v-sheet>

    <v-sheet
      class="d-flex align-baseline mb-6 bg-surface-variant"
      height="100"
    >
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        align-baseline
      </v-sheet>
    </v-sheet>

    <v-sheet
      class="d-flex align-stretch mb-6 bg-surface-variant"
      height="100"
    >
      <v-sheet
        v-for="n in 3"
        :key="n"
        class="ma-2 pa-2"
      >
        align-stretch
      </v-sheet>
    </v-sheet>
  </div>
</template>
