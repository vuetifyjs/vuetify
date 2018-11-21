<template>
  <v-card class="secondary elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6>
            <v-subheader class="grey--text text--lighten-1" v-text="'Standard'"></v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              v-bind:items="items"
              v-model="e1"
              label="Select"
              dark
              item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader class="grey--text text--lighten-1" v-text="'Standard with focus'"></v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              v-bind:items="items"
              v-model="e2"
              label="Select"
              class="input-group--focused"
              dark
              item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader class="grey--text text--lighten-1" v-text="'Error'"></v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              label="Select"
              v-bind:items="items"
              v-model="e3"
              v-bind:error-messages="['Please select an option']"
              dark
              item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader class="grey--text text--lighten-1" v-text="'Disabled'"></v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              label="Select"
              v-bind:items="items"
              v-model="e4"
              disabled
              dark
            ></v-select>
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
        e1: null,
        e2: null,
        e3: null,
        e4: null,
        items: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' }
        ]
      }
    }
  }
</script>
