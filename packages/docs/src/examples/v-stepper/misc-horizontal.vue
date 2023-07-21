<template>
  <v-stepper model-value="1" show-actions>
    <v-stepper-header>
      <v-stepper-item value="1">
        Select campaign settings
      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item value="2">
        Create an ad group
      </v-stepper-item>

      <v-divider></v-divider>

      <v-stepper-item value="3">
        Create an ad
      </v-stepper-item>
    </v-stepper-header>

    <v-stepper-window>
      <v-stepper-window-item value="1">
        <v-card
          color="grey-lighten-1"
          height="250"
          rounded="0"
        ></v-card>
      </v-stepper-window-item>

      <v-stepper-window-item value="2">
        <v-card
          color="grey-lighten-1"
          height="300"
          rounded="0"
        ></v-card>
      </v-stepper-window-item>

      <v-stepper-window-item value="3">
        <v-card
          color="grey-lighten-1"
          height="150"
          rounded="0"
        ></v-card>
      </v-stepper-window-item>
    </v-stepper-window>
  </v-stepper>
</template>
