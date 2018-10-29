<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-subheader>Light</v-subheader>
        <v-card class="elevation-0">
          <v-card-text>
            <p>{{ ex15 }}</p>
            <v-switch label="John" v-model="ex15" value="John"></v-switch>
            <v-switch label="Jacob" v-model="ex15" value="Jacob"></v-switch>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-subheader>Dark</v-subheader>
        <v-card class="secondary elevation-0">
          <v-card-text>
            <p class="white--text">{{ ex16 }}</p>
            <v-switch label="John" v-model="ex16" value="John" dark></v-switch>
            <v-switch label="Jacob" v-model="ex16" value="Jacob" dark></v-switch>
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
        ex15: ['John'],
        ex16: ['John'],
      }
    }
  }
</script>
