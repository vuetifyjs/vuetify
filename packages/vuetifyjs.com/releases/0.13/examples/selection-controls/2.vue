<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-subheader>Light</v-subheader>
        <v-card class="elevation-0">
          <v-card-text>
            <p>{{ ex5 }}</p>
            <v-checkbox label="John" v-model="ex5" value="John"></v-checkbox>
            <v-checkbox label="Jacob" v-model="ex5" value="Jacob"></v-checkbox>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-subheader>Dark</v-subheader>
        <v-card class="secondary elevation-0">
          <v-card-text>
            <p class="white--text">{{ ex6 }}</p>
            <v-checkbox label="John" v-model="ex6" value="John" dark></v-checkbox>
            <v-checkbox label="Jacob" v-model="ex6" value="Jacob" dark></v-checkbox>
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
        ex5: ['John'],
        ex6: ['John'],
      }
    }
  }
</script>
