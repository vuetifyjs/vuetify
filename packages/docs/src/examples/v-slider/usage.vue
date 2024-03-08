<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-slider v-bind="props"></v-slider>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-slider'
  const model = ref('default')
  const options = ['vertical']
  const disabled = ref(false)
  const props = computed(() => {
    return {
      direction: model.value === 'vertical' ? 'vertical' : undefined,
      disabled: disabled.value || undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
