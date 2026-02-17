<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <h5>Default</h5>

        <v-number-input
          control-variant="default"
          inset
        ></v-number-input>
      </v-col>

      <v-col cols="12" sm="6">
        <h5>Stacked</h5>

        <v-number-input
          control-variant="stacked"
          inset
        ></v-number-input>
      </v-col>

      <v-col cols="12" sm="6">
        <h5>Split</h5>

        <v-number-input
          control-variant="split"
          inset
        ></v-number-input>
      </v-col>

      <v-col cols="12" sm="6">
        <h5>Hide-input</h5>

        <v-number-input
          hide-input
          inset
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</template>
