<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-radio-group v-bind="props" hide-details>
        <v-radio label="Radio One" value="one"></v-radio>
        <v-radio label="Radio Two" value="two"></v-radio>
        <v-radio label="Radio Three" value="three"></v-radio>
      </v-radio-group>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="label" label="Radio group label"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-radio-group'
  const model = ref('default')
  const options = ['inline']
  const label = ref(false)
  const props = computed(() => {
    return {
      inline: model.value === 'inline' || undefined,
      label: label.value ? 'Radio group label' : undefined,
    }
  })

  const slots = computed(() => {
    return `
  <v-radio label="Radio One" value="one"></v-radio>
  <v-radio label="Radio Two" value="two"></v-radio>
  <v-radio label="Radio Three" value="three"></v-radio>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
