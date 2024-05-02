<template>
  <div class="d-flex justify-center ga-4 py-10">
    <v-btn v-tooltip:start="'Tooltip at the start'">
      Start
    </v-btn>

    <v-btn v-tooltip:end="'Tooltip at the end'">
      End
    </v-btn>

    <v-btn v-tooltip:top="'Tooltip at the top'">
      Top
    </v-btn>

    <v-btn v-tooltip:bottom="'Tooltip at the bottom'">
      Bottom
    </v-btn>
  </div>
</template>
