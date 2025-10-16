<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-expansion-panels v-bind="props">
        <v-expansion-panel
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
          title="Title"
        >
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-expansion-panels'
  const model = ref('default')
  const options = []
  const props = computed(() => {
    return {}
  })

  const slots = computed(() => {
    return `
  <v-expansion-panel
    title="Title"
    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
  >
  </v-expansion-panel>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
