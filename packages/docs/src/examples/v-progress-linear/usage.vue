<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div>
      <v-progress-linear v-bind="props"></v-progress-linear>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="['primary', 'blue-lighten-3', 'error', 'dark-blue']"
        label="Color"
        clearable
      ></v-select>

      <v-slider
        v-model="height"
        label="Height"
        step="1"
        min="4"
        max="12"
      ></v-slider>

      <v-checkbox v-model="indeterminate" label="Indeterminate"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-progress-linear'
  const model = ref('default')
  const color = ref()
  const indeterminate = ref(false)
  const height = ref()
  const options = []
  const props = computed(() => {
    return {
      color: color.value || undefined,
      indeterminate: indeterminate.value || undefined,
      'model-value': !indeterminate.value ? 20 : undefined,
      height: height.value !== 4 ? height.value : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
