<template>
  <v-stepper alt-labels>
    <v-stepper-header>
      <v-stepper-item
        complete
        value="1"
      >
        <template v-slot:title>
          Ad type
        </template>
      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item
        complete
        value="2"
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
