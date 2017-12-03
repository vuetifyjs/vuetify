<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-subheader>Light</v-subheader>
        <v-card class="elevation-0">
          <v-card-text>
            <v-checkbox v-bind:label="`Checkbox 1: ${ex1.toString()}`" v-model="ex1" light></v-checkbox>
            <v-checkbox v-bind:label="`Checkbox 2: ${ex2.toString()}`" v-model="ex2" light></v-checkbox>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-subheader>Dark</v-subheader>
        <v-card class="secondary elevation-0">
          <v-card-text>
            <v-checkbox v-bind:label="`Checkbox 2: ${ex3.toString()}`" v-model="ex3" dark></v-checkbox>
            <v-checkbox v-bind:label="`Checkbox 2: ${ex4.toString()}`" v-model="ex4" dark></v-checkbox>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        ex1: true,
        ex2: false,
        ex3: true,
        ex4: false,
      }
    }
  }
</script>
