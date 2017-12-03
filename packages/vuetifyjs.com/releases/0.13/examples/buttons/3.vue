<template>
  <v-card class="elevation-0 py-5">
    <v-card-text>
      <v-container fluid class="pa-0">
        <v-layout row wrap>
          <v-flex xs12 sm4 class="py-2">
            <v-select label="State" v-bind:items="dropdown.slice(0, 4)" overflow></v-select>
          </v-flex>
          <v-flex xs12 sm4 class="py-2">
            <v-select label="State" v-bind:items="dropdown.slice(0, 7)"></v-select>
          </v-flex>
          <v-flex xs12 sm4 class="py-2">
            <v-select label="State" v-bind:items="dropdown"></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        dropdown: [
          { text: 'State 1', value: 1 },
          { text: 'State 2', value: 2 },
          { text: 'State 3', value: 3 },
          { text: 'State 4', value: 4 },
          { text: 'State 5', value: 5 },
          { text: 'State 6', value: 6 },
          { text: 'State 7', value: 7 },
          { text: 'State 8', value: 8 },
          { text: 'State 9', value: 9 },
          { text: 'State 10', value: 10 },
        ],
      }
    }
  }
</script>
