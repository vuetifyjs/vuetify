<template>
  <v-sheet
    class="d-flex align-content-space-between flex-wrap bg-surface-variant"
    min-height="200"
  >
    <v-sheet
      v-for="n in 20"
      :key="n"
      class="ma-2 pa-2"
    >
      Flex item
    </v-sheet>
  </v-sheet>
</template>
