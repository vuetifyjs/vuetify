<template>
  <v-stepper>
    <v-stepper-header>
      <v-stepper-item
        complete
        editable
        title="Select campaign settings"
        value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        complete
        title="Create an ad group"
        value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        editable
        title="Create an ad"
        value="3"
      ></v-stepper-item>
    </v-stepper-header>
  </v-stepper>
</template>
