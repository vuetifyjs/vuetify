<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-date-time-input v-bind="props"></v-date-time-input>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="actions" label="Confirm with actions"></v-checkbox>

      <v-checkbox v-model="hour24" label="24-hour"></v-checkbox>

      <v-checkbox v-model="focus" label="Open on focus"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-date-time-input'
  const model = ref('default')
  const options = ['outlined', 'underlined', 'solo', 'solo-filled', 'solo-inverted']
  const actions = ref(false)
  const hour24 = ref(false)
  const focus = ref(false)
  const props = computed(() => {
    return {
      format: hour24.value ? '24hr' : undefined,
      'hide-actions': actions.value ? false : undefined,
      label: 'Date and time',
      'open-on-focus': focus.value || undefined,
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
