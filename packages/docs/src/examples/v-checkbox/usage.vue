<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-checkbox v-bind="props" hide-details></v-checkbox>
    </div>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-checkbox'
  const model = ref('default')
  const options = []
  const props = computed(() => {
    return {
      label: 'Checkbox',
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
