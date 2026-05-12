<template>
  <v-defaults-provider :defaults="{ VTab: { ripple: false } }">
    <v-card class="pa-3">
      <h5 class="my-0">slider-transition: fade, duration 900ms</h5>
      <v-tabs slider-transition="fade" slider-transition-duration="900" fixed-tabs>
        <v-tab>Tab 1</v-tab>
        <v-tab>Tab 2</v-tab>
        <v-tab>Tab 3</v-tab>
      </v-tabs>
    </v-card>
    <v-card class="pa-3 mt-3">
      <h5 class="my-0">slider-transition: grow</h5>
      <v-tabs slider-transition="grow" fixed-tabs>
        <v-tab>Tab 1</v-tab>
        <v-tab>Tab 2</v-tab>
        <v-tab>Tab 3</v-tab>
      </v-tabs>
    </v-card>
  </v-defaults-provider>
</template>
