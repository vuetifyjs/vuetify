<template>
  <v-sheet
    class="d-flex flex-nowrap py-3 bg-surface-variant"
    width="125"
  >
    <v-sheet
      v-for="n in 5"
      :key="n"
      class="ma-2 pa-2"
    >
      Flex item
    </v-sheet>
  </v-sheet>
</template>
