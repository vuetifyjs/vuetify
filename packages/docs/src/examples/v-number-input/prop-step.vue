<template>
  <v-container>
    <v-row>
      <v-col>
        <h5>step 2; min:10; max:20</h5>

        <v-number-input
          :max="20"
          :min="10"
          :model-value="15"
          :step="2"
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</template>
