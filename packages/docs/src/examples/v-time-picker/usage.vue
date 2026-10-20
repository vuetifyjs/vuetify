<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-row class="justify-center">
      <v-time-picker v-bind="props"></v-time-picker>
    </v-row>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-time-picker'
  const model = ref('default')
  const options = ['input']

  const props = computed(() => {
    return {
      variant: model.value === 'input' ? 'input' : undefined,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
