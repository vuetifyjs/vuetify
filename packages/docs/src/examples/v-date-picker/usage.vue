<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-date-picker
      v-bind="props"
      v-model="date"
      class="mx-auto"
    ></v-date-picker>

    <template v-slot:configuration>
      <!-- <v-checkbox v-model="hideActions" label="Hide actions"></v-checkbox> -->
      <v-checkbox v-model="adjacent" label="Show adjacent months"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-date-picker'
  const model = ref('default')
  const date = ref()
  const options = []
  // const hideActions = ref(false)
  const adjacent = ref(false)

  const props = computed(() => {
    return {
      // 'hide-actions': hideActions.value || undefined,
      'show-adjacent-months': adjacent.value || undefined,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-date-picker${propsToString(props.value)}>${slots.value}</v-date-picker>`
  })
</script>
