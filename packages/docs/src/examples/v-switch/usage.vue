<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div>
      <v-switch v-bind="props"></v-switch>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="indeterminate" label="Indeterminate"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref, watch } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-switch'
  const model = ref('default')
  const indeterminate = ref(false)
  const options = ['inset']
  const props = computed(() => {
    return {
      label: 'Switch',
      inset: model.value === 'inset' || undefined,
      indeterminate: indeterminate.value || undefined,
    }
  })

  watch(model, () => indeterminate.value = false)

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
