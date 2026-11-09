<template>
  <v-container class="d-flex flex-column ga-3">
    <v-progress-linear
      color="red-darken-2"
      height="20"
      model-value="40"
      rounded
    ></v-progress-linear>

    <v-progress-linear
      color="orange-darken-2"
      height="20"
      model-value="40"
      rounded-bar
    ></v-progress-linear>

    <v-progress-linear
      color="lime-darken-1"
      height="20"
      model-value="40"
      rounded="lg"
      rounded-bar
    ></v-progress-linear>
  </v-container>
</template>
