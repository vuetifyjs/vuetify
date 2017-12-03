<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-subheader>Column</v-subheader>
        <v-card class="elevation-0">
          <v-card-text>
            <v-radio-group v-model="column" column>
              <v-radio label="Option 1" value="radio-1" ></v-radio>
              <v-radio label="Option 2" value="radio-2"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-subheader>Row</v-subheader>
        <v-card class="elevation-0">
          <v-card-text>
            <v-radio-group v-model="row" row>
              <v-radio label="Option 1" value="radio-1" ></v-radio>
              <v-radio label="Option 2" value="radio-2"></v-radio>
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
        column: null,
        row: null
      }
    }
  }
</script>
