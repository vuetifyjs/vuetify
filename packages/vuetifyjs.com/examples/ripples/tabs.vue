<template>
  <v-tabs
    color="purple"
    dark
    slider-color="purple lighten-3"
  >
    <v-tab
      v-for="i in 3"
      :key="i"
      ripple
    >
        Item {{ i }}
    </v-tab>
  </v-tabs>
</template>
