<template>
  <v-container fluid>
    <p>Selected Button: {{ radios }}</p>
    <v-radio-group v-model="radios">
      <v-radio label="Option One" value="one"></v-radio>
      <v-radio label="Option 2 (string)" value="2"></v-radio>
      <v-radio :value="3" label="Option 3 (integer)"></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const radios = ref('one')
</script>

<script>
  export default {
    data () {
      return {
        radios: 'one',
      }
    },
  }
</script>
