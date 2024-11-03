<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <v-color-input
        label="Select a color"
        prepend-inner=""
        prepend-inner-icon="$pip"
        variant="solo"
      ></v-color-input>

    </v-col>

    <v-col cols="12" md="6">
      <v-color-input
        :prepend-inner-icon="null"
        label="Select a color"
        prepend-inner=""
        variant="solo"
      ></v-color-input>

    </v-col>
  </v-row>
</template>
