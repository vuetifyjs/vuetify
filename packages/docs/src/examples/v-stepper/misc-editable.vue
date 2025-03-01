<template>
  <v-stepper>
    <v-stepper-header>
      <v-stepper-item
        title="Select campaign settings"
        value="1"
        complete
        editable
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
        editable
      ></v-stepper-item>
    </v-stepper-header>
  </v-stepper>
</template>
