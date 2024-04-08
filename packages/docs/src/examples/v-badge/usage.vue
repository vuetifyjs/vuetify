<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-badge v-bind="props">
        <v-icon
          icon="$vuetify"
          size="x-large"
        ></v-icon>
      </v-badge>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="dot" label="Dot"></v-checkbox>

      <v-slider
        v-model="content"
        label="Value"
        max="100"
        min="0"
        step="1"
      ></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-badge'
  const model = ref('default')
  const content = ref(0)
  const dot = ref(false)
  const options = ['floating', 'inline']
  const props = computed(() => {
    return {
      content: content.value || undefined,
      dot: dot.value || undefined,
      floating: model.value === 'floating' || undefined,
      inline: model.value === 'inline' || undefined,
    }
  })

  const slots = computed(() => {
    return `
  <v-icon icon="$vuetify" size="x-large"></v-icon>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
