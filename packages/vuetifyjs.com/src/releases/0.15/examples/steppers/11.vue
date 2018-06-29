<template>
  <v-stepper alt-labels>
    <v-stepper-header>
      <v-stepper-step step="3" complete>Ad type</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4" complete>Ad style</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="5" v-bind:rules="[() => false]">
        Custom channels
        <small>Alert message</small>
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="6">Get code</v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>
