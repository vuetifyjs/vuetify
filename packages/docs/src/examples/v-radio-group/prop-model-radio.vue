<template>
  <v-container fluid>
    <v-select
      v-model="radio"
      :items="['Option 1', 'Option 2']"
      label="Select Option"
    ></v-select>
    <v-radio
      v-model="radio"
      false-value="Option 2"
      label="Option 1"
      true-value="Option 1"
      readonly
    ></v-radio>
    <v-radio
      v-model="radio"
      false-value="Option 1"
      label="Option 2"
      true-value="Option 2"
      readonly
    ></v-radio>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const radio = ref('Option 1')
</script>

<script>
  export default {
    data () {
      return {
        radio: 'Option 1',
      }
    },
  }
</script>
