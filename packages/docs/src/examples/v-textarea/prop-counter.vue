<template>
  <v-container fluid>
    <v-textarea
      :model-value="value"
      :rules="rules"
      label="Text"
      counter
    ></v-textarea>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const rules = [v => v.length <= 25 || 'Max 25 characters']

  const value = ref('Hello!')
</script>

<script>
  export default {
    data: () => ({
      rules: [v => v.length <= 25 || 'Max 25 characters'],
      value: 'Hello!',
    }),
  }
</script>
