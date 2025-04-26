<template>
  <v-responsive
    class="mx-auto"
    max-width="344"
  >
    <v-text-field
      v-model="model"
      hide-details="auto"
      label="Last name"
      clearable
    ></v-text-field>
  </v-responsive>
</template>

<script setup>
  import { ref } from 'vue'

  const model = ref('Leider')
</script>

<script>
  export default {
    data: () => ({
      model: 'Leider',
    }),
  }
</script>
