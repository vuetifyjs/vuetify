<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-chip-group v-bind="props">
        <v-chip>Chip 1</v-chip>

        <v-chip>Chip 2</v-chip>

        <v-chip>Chip 3</v-chip>
      </v-chip-group>
    </div>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-chip-group'
  const model = ref('default')
  const options = ['filter']
  const props = computed(() => {
    return {
      filter: model.value === 'filter' || undefined,
    }
  })

  const slots = computed(() => {
    return `
  <v-chip>Chip 1</v-chip>

  <v-chip>Chip 2</v-chip>

  <v-chip>Chip 3</v-chip>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
