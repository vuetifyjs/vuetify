<template>
  <v-sheet elevation="6">
    <v-tabs
      bg-color="indigo"
      next-icon="i-mdi:arrow-right-bold-box-outline"
      prev-icon="i-mdi:arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tab
        v-for="i in 30"
        :key="i"
        :text="`Item ${i}`"
      ></v-tab>
    </v-tabs>
  </v-sheet>
</template>
