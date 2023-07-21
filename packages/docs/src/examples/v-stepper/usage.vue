<template>
  <v-stepper v-model="e1">
    <template v-slot:default="{ prev, next }">
      <v-stepper-header>
        <v-stepper-item
          :complete="e1 > 1"
          :value="1"
          title="Name of step 1"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          :complete="e1 > 2"
          :value="2"
          title="Name of step 2"
        ></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          :value="3"
          title="Name of step 3"
        ></v-stepper-item>
      </v-stepper-header>

      <v-stepper-window>
        <v-stepper-window-item :value="1">
          <v-sheet
            color="grey-lighten-1"
            height="200"
          ></v-sheet>

          <br>
          <br>

          <v-stepper-actions @click:continue="next" @click:back="prev"></v-stepper-actions>
        </v-stepper-window-item>

        <v-stepper-window-item :value="2">
          <v-sheet
            color="grey-lighten-1"
            height="250"
          ></v-sheet>

          <br>
          <br>

          <v-stepper-actions @click:continue="next" @click:back="prev"></v-stepper-actions>
        </v-stepper-window-item>

        <v-stepper-window-item :value="3">
          <v-sheet
            color="grey-lighten-1"
            height="150"
          ></v-sheet>

          <br>
          <br>

          <v-stepper-actions @click:continue="next" @click:back="prev"></v-stepper-actions>
        </v-stepper-window-item>
      </v-stepper-window>
    </template>
  </v-stepper>
</template>

<script setup>
  import { ref } from 'vue'

  const e1 = ref(1)
</script>
