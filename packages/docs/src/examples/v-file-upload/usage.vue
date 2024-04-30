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
      <v-checkbox v-model="clear" label="Clearable"></v-checkbox>

      <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-file-upload'
  const model = ref('default')
  const options = []
  const clear = ref(false)
  const counter = ref(false)
  const disabled = ref(false)
  const props = computed(() => {
    return {
      clearable: clear.value || undefined,
      counter: counter.value || undefined,
      disabled: disabled.value || undefined,
      label: 'File upload',
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
