<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-select v-bind="props"></v-select>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="clear" label="Clearable"></v-checkbox>

      <v-checkbox v-model="chips" label="Chips"></v-checkbox>

      <v-checkbox v-model="multiple" label="Multiple"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-select'
  const model = shallowRef('default')
  const clear = shallowRef(false)
  const chips = shallowRef(false)
  const multiple = shallowRef(false)
  const options = ['outlined', 'underlined', 'solo', 'solo-filled', 'solo-inverted']
  const props = computed(() => {
    return {
      clearable: clear.value || undefined,
      chips: chips.value || undefined,
      label: 'Select',
      items: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
      multiple: multiple.value || undefined,
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
