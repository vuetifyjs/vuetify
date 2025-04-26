<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-otp-input v-bind="props"></v-otp-input>
    </div>

    <template v-slot:configuration>
      <v-text-field v-model="placeholder" label="Placeholder" maxlength="1" clearable></v-text-field>
      <v-checkbox v-model="focus" label="Focus all"></v-checkbox>
      <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>
      <v-checkbox v-model="loading" label="Loading"></v-checkbox>
      <v-slider v-model="length" label="Length" max="8" min="4" step="1"></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-stepper'
  const model = ref('default')
  const options = ['solo', 'solo-filled', 'underlined']
  const focus = ref(false)
  const length = ref(6)
  const placeholder = ref('')
  const disabled = ref(false)
  const loading = ref(false)

  const props = computed(() => {
    return {
      disabled: disabled.value || undefined,
      'focus-all': focus.value || undefined,
      length: length.value === 6 ? undefined : length.value,
      loading: loading.value || undefined,
      placeholder: placeholder.value || undefined,
      variant: model.value !== 'default' ? model.value : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<v-otp-input${propsToString(props.value)}>${slots.value}</v-otp-input>`
  })
</script>
