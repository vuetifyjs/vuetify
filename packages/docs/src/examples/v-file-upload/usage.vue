<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-file-upload v-bind="props"></v-file-upload>
    </div>

    <template v-slot:configuration>
      <v-text-field v-model="title" label="Title"></v-text-field>

      <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>

      <v-checkbox v-model="clear" label="Clearable"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-file-upload'
  const model = ref('default')
  const options = ['comfortable', 'compact']
  const clear = ref(false)
  const counter = ref(false)
  const disabled = ref(false)
  const title = ref()
  const props = computed(() => {
    return {
      clearable: clear.value || undefined,
      counter: counter.value || undefined,
      disabled: disabled.value || undefined,
      density: model.value,
      title: title.value || undefined,
      variant: model.value === 'default' ? undefined : model.value,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
