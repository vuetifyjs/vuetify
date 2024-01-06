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
      <v-select
        v-model="controlVariant"
        label="Control Variant"
        :items="controlVariantOptions"
      ></v-select>
      <v-checkbox v-model="controlReverse" label="ControlReverse"></v-checkbox>
      <v-checkbox v-model="inset" label="Inset"></v-checkbox>
      <v-checkbox v-model="hideInput" label="HideInput"></v-checkbox>
      <v-text-field v-model="label" label="Label" clearable></v-text-field>
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
  const controlVariantOptions = ['default', 'stacked', 'split']
  const controlReverse = ref(false)
  const controlVariant = ref('default')
  const disabled = ref(false)
  const loading = ref(false)
  const inset = ref(false)
  const hideInput = ref(false)
  const label = ref('')

  const props = computed(() => {
    return {
      controlReverse: controlReverse.value,
      controlVariant: controlVariant.value,
      disabled: disabled.value || undefined,
      label: label.value,
      loading: loading.value || undefined,
      hideInput: hideInput.value,
      inset: inset.value,
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
