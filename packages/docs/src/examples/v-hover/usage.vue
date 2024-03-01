<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-hover v-bind="props">
        <template v-slot:default="{ isHovering, props: hoverProps }">
          <v-card
            v-bind="hoverProps"
            :color="isHovering ? 'primary' : undefined"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
            title="Hover over me"
          ></v-card>
        </template>
      </v-hover>
    </div>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-hover'
  const model = ref('default')
  const options = []
  const props = computed(() => {
    return {}
  })

  const slots = computed(() => {
    return `
  <template v-slot:default="{ isHovering, props }">
    <v-card
      v-bind="props"
      :color="isHovering ? 'primary' : undefined"
      title="Hover over me"
      text="..."
    ></v-card>
  </template>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
