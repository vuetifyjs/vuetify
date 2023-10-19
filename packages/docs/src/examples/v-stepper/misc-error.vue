<template>
  <v-stepper model-value="3">
    <v-stepper-header>
      <v-stepper-item
        complete
        title="Job Search"
        value="1"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        :rules="[() => false]"
        title="Submit Application"
        subtitle="Missing Details"
        value="2"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Interview Process"
        value="3"
      ></v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        title="Hiring Decision"
        value="4"
      ></v-stepper-item>
    </v-stepper-header>
  </v-stepper>
</template>
