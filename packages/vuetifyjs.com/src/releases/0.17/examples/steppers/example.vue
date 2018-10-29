<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="e1 > 1">Name of step 1</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="e1 > 2">Name of step 2</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click.native="e1 = 1">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-stepper v-model="e1" dark class="mt-3">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="e1 > 1">Name of step 1</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="e1 > 2">Name of step 2</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="secondary" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
          <v-btn flat dark>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card color="secondary" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
          <v-btn flat dark>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-card color="secondary" class="mb-5" height="200px"></v-card>
          <v-btn color="primary" @click.native="e1 = 1">Continue</v-btn>
          <v-btn flat dark>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        e1: 0
      }
    }
  }
</script>
