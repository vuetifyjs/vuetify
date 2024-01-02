<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-number-input v-bind="props"></v-number-input>
    </div>

    <template v-slot:configuration>
      <v-text-field v-model="label" label="Label" clearable></v-text-field>
      <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>
      <v-checkbox v-model="loading" label="Loading"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = ref('v-number-input')
  const model = ref('outlined')
  const options = ['outlined', 'filled', 'solo', 'solo-inverted', 'solo-filled']
  const disabled = ref(false)
  const loading = ref(false)
  const label = ref('')

  const props = computed(() => {
    return {
      disabled: disabled.value || undefined,
      label: label.value,
      loading: loading.value || undefined,
      variant: model.value !== 'default' ? model.value : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<v-number-input${propsToString(props.value)}>${slots.value}</v-number-input>`
  })
</script>
