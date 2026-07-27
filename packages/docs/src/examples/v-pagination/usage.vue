<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-pagination
        v-bind="props"
      ></v-pagination>
    </div>

    <template v-slot:configuration>
      <v-slider v-model="length" label="Length" max="20" min="1"></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-pagination'
  const model = ref('default')
  const length = ref(4)
  const options = []

  const props = computed(() => {
    return {
      length: length.value,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-pagination${propsToString(props.value)}>${slots.value}</v-pagination>`
  })
</script>
