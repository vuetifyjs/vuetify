<template>
  <v-card>
    <v-tabs
      bg-color="teal-darken-3"
      show-arrows
      slider-color="teal-lighten-3"
    >
      <v-tab
        v-for="i in 30"
        :key="i"
        :value="'tab-' + i"
      >
        Item {{ i }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>
