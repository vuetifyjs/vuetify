<template>
  <v-sheet class="d-flex flex-wrap-reverse bg-surface-variant">
    <v-sheet
      v-for="n in 20"
      :key="n"
      class="ma-2 pa-2"
    >
      Flex item {{ n }}
    </v-sheet>
  </v-sheet>
</template>
