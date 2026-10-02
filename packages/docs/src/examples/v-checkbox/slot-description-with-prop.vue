<template>
  <v-container>
    <v-checkbox
      v-model="checkbox"
      :description="checkboxDescription"
      label="Checkbox with description"
    >
      <template v-slot:description="{ description }">
        <span class="formatted_description">{{ description }}</span>
      </template>
    </v-checkbox>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const checkbox = ref(false)
  const checkboxDescription = ref('You can use both the description prop and slot')
</script>

<style scoped>
  .formatted_description {
    font-style: italic;
    color: #555;
  }
</style>
