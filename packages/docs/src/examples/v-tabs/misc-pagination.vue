<template>
  <v-card>
    <v-tabs
      bg-color="teal-darken-3"
      slider-color="teal-lighten-3"
      show-arrows
    >
      <v-tab
        v-for="i in 30"
        :key="i"
        :text="'Item ' + i"
        :value="'tab-' + i"
      ></v-tab>
    </v-tabs>
  </v-card>
</template>
