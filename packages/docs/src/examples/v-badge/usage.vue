<template>
  <usage-example
    v-model="model"
    v-model:tune-value="tuneModel"
    :options="options"
    :tune-options="tuneOptions"
    name="v-badge"
  >
    <div class="text-center">
      <v-badge
        :content="tuneModel.value"
        :color="tuneModel.color ? 'blue-lighten-3' : undefined"
        :dot="model.prop === 'dot'"
        :floating="tuneModel.floating"
      >
        <v-icon
          icon="mdi-vuetify"
          size="x-large"
          color="medium-emphasis"
        ></v-icon>
      </v-badge>
    </div>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { ref } from 'vue'

  const model = ref('default')
  const options = [
    { prop: 'dot', value: false },
  ]
  const tuneModel = ref({})
  const tuneOptions = [
    { type: 'checkbox', prop: 'color', value: 'blue-lighten-3' },
    { type: 'checkbox', prop: 'floating' },
    { type: 'slider', prop: 'value', min: 0, max: 100 },
  ]
</script>
