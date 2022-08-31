<template>
  <usage-example
    v-model="model"
    v-model:tune-value="tuneModel"
    :options="options"
    :tune-options="tuneOptions"
    name="v-alert"
  >
    <v-alert
      :variant="model.prop === 'variant' ? model.value : undefined"
      :type="tuneModel.type"
      :title="tuneModel.title ? 'Alert title' : undefined"
      :icon="tuneModel.icon ? 'mdi-vuetify' : undefined"
    >
      <v-alert-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
      </v-alert-text>
    </v-alert>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { ref } from 'vue'

  const model = ref('default')
  const options = [
    { label: 'Outlined', prop: 'variant', value: 'outlined' },
  ]
  const tuneModel = ref({
    type: 'default',
  })
  const tuneOptions = [
    { type: 'checkbox', prop: 'title', value: 'Alert title' },
    { label: 'Custom icon', type: 'checkbox', prop: 'icon', value: 'mdi-vuetify' },
    { type: 'select', prop: 'type', items: ['default', 'success', 'info', 'warning', 'error'] },
  ]
</script>
