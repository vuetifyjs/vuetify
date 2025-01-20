<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-color-input v-bind="props"></v-color-input>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="colorPip" label="Color Pip"></v-checkbox>

      <v-checkbox v-model="clear" label="Clearable"></v-checkbox>

      <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-color-input'
  const model = ref('default')
  const options = ['outlined', 'underlined', 'solo', 'solo-filled', 'solo-inverted']
  const clear = ref(false)
  const colorPip = ref(true)
  const counter = ref(false)
  const disabled = ref(false)
  const props = computed(() => {
    return {
      clearable: clear.value || undefined,
      colorPip: colorPip.value || false,
      counter: counter.value || undefined,
      disabled: disabled.value || undefined,
      label: 'Color input',
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
