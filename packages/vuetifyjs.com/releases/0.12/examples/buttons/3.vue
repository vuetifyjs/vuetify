<template>
  <v-card class="elevation-0 py-5">
    <v-card-text>
      <v-container fluid class="pa-0">
        <v-layout row wrap>
          <v-flex xs12 sm4 class="py-2">
            <v-btn-dropdown label="State" v-bind:options="dropdown.slice(0, 4)" max-height="auto"></v-btn-dropdown>
          </v-flex>
          <v-flex xs12 sm4 class="py-2">
            <v-btn-dropdown label="State" v-bind:options="dropdown.slice(0, 7)"></v-btn-dropdown>
          </v-flex>
          <v-flex xs12 sm4 class="py-2">
            <v-btn-dropdown label="State" v-bind:options="dropdown"></v-btn-dropdown>
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
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' },
          { text: 'State 8' },
          { text: 'State 9' },
          { text: 'State 10' },
        ],
      }
    }
  }
</script>
