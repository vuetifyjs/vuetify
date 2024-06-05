<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-switch v-bind="props"></v-switch>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="indeterminate" label="Indeterminate"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-switch'
  const model = ref('default')
  const indeterminate = ref(false)
  const options = ['inset']
  const props = computed(() => {
    return {
      label: 'Switch',
      inset: model.value === 'inset' || undefined,
      indeterminate: indeterminate.value || undefined,
    }
  })

  watch(model, () => indeterminate.value = false)

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
