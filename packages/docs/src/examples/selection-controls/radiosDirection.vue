<template>
  <v-container fluid>
    <v-radio-group v-model="column" column>
      <v-radio label="Option 1" value="radio-1"></v-radio>
      <v-radio label="Option 2" value="radio-2"></v-radio>
    </v-radio-group>
    <hr>
    <v-radio-group v-model="row" row>
      <v-radio label="Option 1" value="radio-1"></v-radio>
      <v-radio label="Option 2" value="radio-2"></v-radio>
    </v-radio-group>
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
