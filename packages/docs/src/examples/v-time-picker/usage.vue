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

    <template v-slot:configuration>
      <v-select v-model="color" :items="colors" label="Color" clearable></v-select>
      <v-checkbox v-model="fullDay" label="24hr format"></v-checkbox>
      <v-checkbox v-model="hideHeader" label="Hide header"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-time-picker'
  const model = ref('default')
  const options = ['input']
  const color = shallowRef()
  const fullDay = shallowRef(false)
  const hideHeader = shallowRef(false)
  const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']

  const props = computed(() => {
    return {
      variant: model.value === 'input' ? 'input' : undefined,
      color: color.value || undefined,
      format: fullDay.value ? '24hr' : undefined,
      'hide-header': hideHeader.value || undefined,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
