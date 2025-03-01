<template>
  <v-stepper>
    <v-stepper-header>
      <v-stepper-item
        title="Select campaign settings"
        value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Create an ad group"
        value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Create an ad"
        value="3"
      ></v-stepper-item>
    </v-stepper-header>
  </v-stepper>

  <br>

  <v-stepper model-value="2">
    <v-stepper-header>
      <v-stepper-item
        title="Select campaign settings"
        value="1"
        complete
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Create an ad group"
        value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Create an ad"
        value="3"
      ></v-stepper-item>
    </v-stepper-header>
  </v-stepper>

  <br>

  <v-stepper model-value="3">
    <v-stepper-header>
      <v-stepper-item
        title="Select campaign settings"
        value="1"
        complete
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Create an ad group"
        value="2"
        complete
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Create an ad"
        value="3"
      ></v-stepper-item>
    </v-stepper-header>
  </v-stepper>
</template>
