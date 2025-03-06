<template>
  <v-container fluid>
    <p>{{ selected }}</p>
    <v-checkbox
      v-model="selected"
      label="John"
      value="John"
    ></v-checkbox>
    <v-checkbox
      v-model="selected"
      label="Jacob"
      value="Jacob"
    ></v-checkbox>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const selected = ref(['John'])
</script>

<script>
  export default {
    data () {
      return {
        selected: ['John'],
      }
    },
  }
</script>
