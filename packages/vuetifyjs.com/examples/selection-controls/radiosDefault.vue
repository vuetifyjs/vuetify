<template>
  <v-container fluid>
    <p>{{ ex8 || 'null' }}</p>
    <v-radio-group v-model="ex8" :mandatory="false">
      <v-radio label="Radio 1" value="radio-1"></v-radio>
      <v-radio label="Radio 2" value="radio-2"></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        ex8: 'radio-1'
      }
    }
  }
</script>
