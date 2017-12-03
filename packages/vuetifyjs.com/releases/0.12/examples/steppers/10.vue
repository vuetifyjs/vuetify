<template>
  <v-stepper>
    <v-stepper-header>
      <v-stepper-step step="1">Ad unit details</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" v-bind:rules="[() => false]">
        Ad templates
        <small>Alert message</small>
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Ad sizes</v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>
