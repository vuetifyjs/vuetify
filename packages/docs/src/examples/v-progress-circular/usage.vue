<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-progress-circular v-bind="props"></v-progress-circular>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="['primary', 'blue-lighten-3', 'error', 'dark-blue']"
        label="Color"
        clearable
      ></v-select>

      <v-slider
        v-model="size"
        label="Size"
        max="128"
        min="32"
        step="1"
      ></v-slider>

      <v-slider
        v-model="width"
        label="Width"
        max="12"
        min="4"
        step="1"
      ></v-slider>

      <v-checkbox v-model="indeterminate" label="Indeterminate"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-progress-circular'
  const model = ref('default')
  const color = ref()
  const indeterminate = ref(false)
  const size = ref()
  const width = ref()
  const options = []
  const props = computed(() => {
    return {
      color: color.value || undefined,
      indeterminate: indeterminate.value || undefined,
      'model-value': !indeterminate.value ? '20' : undefined,
      size: size.value !== 32 ? size.value : undefined,
      width: width.value !== 4 ? width.value : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
