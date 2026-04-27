<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-container max-width="550">
      <v-text-field
        v-model="query"
        class="mb-5"
        density="compact"
        label="Search"
        variant="outlined"
        clearable
        hide-details
      ></v-text-field>

      <v-highlight
        v-bind="props"
        class="text-body-1"
      ></v-highlight>
    </v-container>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-highlight'
  const model = shallowRef('default')
  const options = []
  const query = shallowRef('framework')

  const text = 'Vue is a progressive JavaScript framework for building user interfaces. Unlike monolithic frameworks, Vue is designed to be incrementally adoptable. The core library focuses on the view layer only, making it easy to integrate with other libraries. Thousands of companies use Vue in production today.'

  const props = computed(() => ({
    text,
    query: query.value || undefined,
    tag: 'p',
  }))

  const code = computed(() => `<${name}${propsToString(props.value)} />`)
</script>
