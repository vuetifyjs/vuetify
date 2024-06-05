<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-btn :key="text" text="Tooltip" v-tooltip="text"></v-btn>
    </div>

    <template v-slot:configuration>
      <v-text-field v-model="text" label="Text"></v-text-field>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-tooltip'
  const model = ref('default')
  const text = ref('Tooltip')
  const options = []

  const code = computed(() => {
    return `<v-btn v-tooltip="'${text.value}'"></v-btn>`
  })
</script>
