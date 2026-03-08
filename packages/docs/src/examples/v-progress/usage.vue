<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-progress v-bind="props"></v-progress>
    </div>

    <template v-slot:configuration>
      <v-slider
        v-model="value"
        :max="100"
        :min="0"
        label="Value"
      ></v-slider>

      <v-select
        v-model="color"
        :items="['primary', 'secondary', 'accent', 'error', 'warning', 'info', 'success']"
        label="Color"
        clearable
      ></v-select>

      <v-select
        v-model="labelPosition"
        :items="['top', 'bottom']"
        label="Label position"
      ></v-select>

      <v-checkbox-btn v-model="indeterminate" label="Indeterminate"></v-checkbox-btn>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-progress'
  const model = shallowRef('default')
  const options = ['linear', 'circular']
  const value = shallowRef(50)
  const color = shallowRef('primary')
  const indeterminate = shallowRef(false)
  const labelPosition = shallowRef('top')

  const props = computed(() => {
    return {
      color: color.value || undefined,
      indeterminate: indeterminate.value || undefined,
      label: 'Loading...',
      'label-position': labelPosition.value !== 'top' ? labelPosition.value : undefined,
      'model-value': indeterminate.value ? undefined : value.value,
      type: model.value !== 'default' ? model.value : undefined,
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}></${name}>`
  })
</script>
