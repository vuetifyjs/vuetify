<template>
  <usage-example
    v-model="model"
    v-model:tune-value="tuneModel"
    :options="options"
    :tune-options="tuneOptions"
    name="v-tooltip"
  >
    <div class="text-center">
      <v-tooltip
        v-model="tuneModel['model-value']"
        :text="tuneModel.text"
        :inline="model.prop === 'inline'"
        :location="tuneModel.location"
      >
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">Tooltip</v-btn>
        </template>

        {{ tuneModel.text }}
      </v-tooltip>
    </div>

    <template v-slot:example-slot>
      {{ `
  <template v-slot:activator="{ props }">
    <v-btn v-bind="props">Tooltip</v-btn>
  </template>` }}
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { ref } from 'vue'

  const model = ref('default')
  const options = [
  ]
  const tuneModel = ref({
    location: 'default',
    text: 'Tooltip',
  })
  const tuneOptions = [
    { type: 'select', prop: 'location', items: ['top', 'end', 'bottom', 'start'] },
    { type: 'text-field', prop: 'text' },
  ]
</script>
