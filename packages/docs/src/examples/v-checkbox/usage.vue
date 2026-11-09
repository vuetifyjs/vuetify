<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="d-flex flex-column align-center ga-3">
      <v-fade-transition>
        <v-chip
          v-if="requiresLatest"
          class="position-absolute top-0 mt-6"
          color="warning"
          prepend-icon="mdi-information-outline"
          text="Requires Vuetify v4.3.0+"
          variant="tonal"
        ></v-chip>
      </v-fade-transition>

      <v-checkbox v-bind="props" hide-details></v-checkbox>
    </div>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-checkbox'
  const model = ref('default')
  const options = ['With description']

  const requiresLatest = computed(() => model.value === 'With description')

  const props = computed(() => {
    return {
      label: 'Checkbox',
      description: model.value === 'With description' ? 'Supporting text' : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
