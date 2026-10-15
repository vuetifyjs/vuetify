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
          v-if="model === 'wavy'"
          class="position-absolute top-0 mt-6"
          color="warning"
          prepend-icon="mdi-information-outline"
          text="Requires Vuetify v4.3.0+"
          variant="tonal"
        ></v-chip>
      </v-fade-transition>

      <v-progress-linear v-bind="props"></v-progress-linear>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="['primary', 'blue-lighten-3', 'error', 'blue-darken-3']"
        label="Color"
        clearable
      ></v-select>

      <v-slider
        v-model="height"
        label="Height"
        max="12"
        min="4"
        step="1"
      ></v-slider>

      <v-checkbox v-model="indeterminate" label="Indeterminate"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-progress-linear'
  const model = ref('default')
  const color = ref()
  const indeterminate = ref(false)
  const height = ref()
  const options = ['split', 'wavy']
  const props = computed(() => {
    return {
      color: color.value || undefined,
      indeterminate: indeterminate.value || undefined,
      shape: model.value === 'wavy' ? 'wavy' : undefined,
      'model-value': !indeterminate.value ? '20' : undefined,
      height: height.value !== 4 ? height.value : undefined,
      variant: model.value === 'split' ? 'split' : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
