<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-toolbar v-bind="props">
        <template v-slot:append>
          <v-btn icon="mdi-menu"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-toolbar>
    </div>

    <template v-slot:configuration>
      <v-select v-model="density" :items="['default', 'comfortable', 'compact']" label="Density"></v-select>

      <v-text-field v-model="title" label="Title" clearable></v-text-field>

      <v-checkbox v-model="collapse" label="Collapsed"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-toolbar'
  const model = ref('default')
  const collapse = ref()
  const density = ref('default')
  const title = ref('Toolbar')
  const options = ['elevated', 'bordered']
  const props = computed(() => {
    return {
      border: model.value === 'bordered' ? true : undefined,
      collapse: collapse.value || undefined,
      density: density.value === 'default' ? undefined : density.value,
      elevation: model.value === 'elevated' ? 8 : undefined,
      title: title.value || undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
