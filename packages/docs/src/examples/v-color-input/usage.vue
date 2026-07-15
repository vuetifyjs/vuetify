<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-color-input model-value="#14BCD3" v-bind="props"></v-color-input>
    </div>

    <template v-slot:configuration>
      <v-select v-model="pipVariant" :items="pipVariants" label="Pip variant" clearable></v-select>

      <v-checkbox v-model="colorPip" label="Color Pip"></v-checkbox>
      <v-checkbox v-model="clearable" label="Clearable"></v-checkbox>
      <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>
      <v-checkbox v-model="hideActions" label="Hide picker actions"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-color-input'

  const pipVariants = ['flat', 'tonal', 'outlined']

  const model = ref('default')
  const options = ['outlined', 'underlined', 'solo', 'solo-filled', 'solo-inverted']
  const clearable = ref(false)
  const hideActions = ref(false)
  const pipVariant = ref()
  const colorPip = ref(true)
  const disabled = ref(false)
  const props = computed(() => {
    return {
      clearable: clearable.value || undefined,
      'color-pip': colorPip.value || undefined,
      'pip-variant': pipVariant.value || undefined,
      'hide-actions': hideActions.value || undefined,
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
