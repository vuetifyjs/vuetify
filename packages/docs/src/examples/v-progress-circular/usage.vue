<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
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
        step="1"
        min="32"
        max="128"
      ></v-slider>

      <v-slider
        v-model="width"
        label="Width"
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
      'model-value': !indeterminate.value ? 20 : undefined,
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
