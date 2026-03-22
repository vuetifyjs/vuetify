<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-month-picker v-bind="props"></v-month-picker>
    </div>

    <template v-slot:configuration>
      <v-text-field v-model="title" label="Title" clearable></v-text-field>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = ref('v-month-picker')
  const model = ref('default')
  const options = []
  const title = ref('Select month')

  const props = computed(() => {
    return {
      title: title.value || undefined,
      color: model.value !== 'default' ? model.value : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<v-month-picker${propsToString(props.value)}>${slots.value}</v-month-picker>`
  })
</script>
