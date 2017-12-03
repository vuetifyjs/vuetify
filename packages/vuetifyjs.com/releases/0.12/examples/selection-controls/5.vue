<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-subheader>Light</v-subheader>
        <v-card class="elevation-0">
          <v-card-text>
            <p>{{ ex8 || 'null' }}</p>
            <v-radio label="Radio 1" v-model="ex8" value="radio-1" dark></v-radio>
            <v-radio label="Radio 2" v-model="ex8" value="radio-2" dark></v-radio>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-subheader>Dark</v-subheader>
        <v-card class="secondary elevation-0">
          <v-card-text>
            <p class="white--text">{{ ex9 || 'null' }}</p>
            <v-radio label="Radio 3" v-model="ex9" value="radio-3" light></v-radio>
            <v-radio label="Radio 4" v-model="ex9" value="radio-4" light></v-radio>
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
        ex8: 'radio-1',
        ex9: 'radio-3',
      }
    }
  }
</script>
