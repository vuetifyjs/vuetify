<template>
  <v-stepper alt-labels>
    <v-stepper-header>
      <v-stepper-item
        value="1"
        complete
      >
        <template v-slot:title>
          Ad type
        </template>
      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        value="2"
        complete
      >
        <template v-slot:title>
          Ad style
        </template>
      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        :rules="[() => false]"
        value="3"
      >
        <template v-slot:title>
          Custom channels
        </template>

        <template v-slot:subtitle>
          Alert message
        </template>
      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item value="46">
        <template v-slot:title>
          Get code
        </template>
      </v-stepper-item>
    </v-stepper-header>
  </v-stepper>
</template>
