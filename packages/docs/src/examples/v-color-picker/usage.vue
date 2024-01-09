<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div class="d-flex justify-center">
      <v-color-picker v-bind="props"></v-color-picker>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="hideCanvas" label="Hide canvas"></v-checkbox>

      <v-checkbox v-model="hideInputs" label="Hide inputs"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-color-picker'
  const model = ref('default')
  const options = ['Disabled', 'Show swatches']
  const hideCanvas = ref()
  const hideInputs = ref()
  const props = computed(() => {
    return {
      disabled: model.value === 'Disabled' ? true : undefined,
      'hide-canvas': hideCanvas.value || undefined,
      'hide-inputs': hideInputs.value || undefined,
      'show-swatches': model.value === 'Show swatches' ? true : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
