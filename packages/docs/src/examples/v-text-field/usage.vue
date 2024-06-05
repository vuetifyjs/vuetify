<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-text-field v-bind="props" v-model="field"></v-text-field>
    </div>

    <template v-slot:configuration>
      <v-text-field v-model="label" label="Label"></v-text-field>

      <v-checkbox v-model="prepend" label="Prepend icon"></v-checkbox>

      <v-checkbox v-model="clearable" label="Clearable"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-text-field'
  const model = ref('default')
  const clearable = ref(false)
  const field = ref()
  const label = ref('Label')
  const prepend = ref(false)
  const options = ['outlined', 'underlined', 'solo', 'solo-filled', 'solo-inverted']
  const props = computed(() => {
    return {
      clearable: clearable.value || undefined,
      label: label.value,
      'prepend-icon': prepend.value ? '$vuetify' : undefined,
      variant: model.value === 'default' ? undefined : model.value,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })

  watch(clearable, () => {
    if (!field.value) field.value = 'Hover to Clear me'
  })
</script>
