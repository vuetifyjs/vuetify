<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-subheader>Light</v-subheader>
        <v-card class="elevation-0">
          <v-card-text>
            <p>{{ ex8 || 'null' }}</p>
            <v-radio-group v-model="ex8" :mandatory="false">
              <v-radio label="Radio 1" value="radio-1"></v-radio>
              <v-radio label="Radio 2" value="radio-2"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-subheader>Dark</v-subheader>
        <v-card class="secondary elevation-0">
          <v-card-text>
            <p class="white--text">{{ ex9 || 'null' }}</p>
            <v-radio-group v-model="ex9" :mandatory="false">
              <v-radio label="Radio 3" value="radio-3" dark></v-radio>
              <v-radio label="Radio 4" value="radio-4" dark></v-radio>
            </v-radio-group>
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
