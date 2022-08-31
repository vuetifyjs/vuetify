<template>
  <usage-example
    v-model="model"
    v-model:tune-value="tuneModel"
    :options="options"
    :tune-options="tuneOptions"
    name="v-avatar"
  >
    <div class="text-center">
      <v-avatar
        :color="tuneModel.color"
        :elevation="tuneModel.elevation ? 4 : undefined"
        :size="model.prop === 'size' ? 'large' : undefined"
      >

      </v-avatar>
    </div>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { ref } from 'vue'

  const model = ref('default')
  const options = [
    { label: 'Large', prop: 'size', value: 'large' },
  ]
  const tuneModel = ref({
    color: 'blue-lighten-3',
  })
  const tuneOptions = [
    { label: 'Elevated', type: 'checkbox', prop: 'elevation', value: 2 },
    { type: 'select', prop: 'color', items: ['primary', 'success', 'error'] },
  ]
</script>
