<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-row justify="center">
      <v-time-picker v-bind="props"></v-time-picker>
    </v-row>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-time-picker'
  const model = ref('default')
  const options = []

  const props = computed(() => {
    return {
      //
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
