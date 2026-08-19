<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-container max-width="400">
      <v-progress v-bind="props"></v-progress>
    </v-container>

    <template v-slot:configuration>
      <v-slider
        v-model="value"
        :max="100"
        :min="0"
        label="Value"
      ></v-slider>

      <v-select
        v-model="color"
        :items="['primary', 'warning', 'success', 'teal-accent-3']"
        label="Color"
        clearable
      ></v-select>

      <v-select
        v-model="detailsPosition"
        :items="['top', 'bottom']"
        label="Details position"
      ></v-select>

      <v-checkbox-btn v-model="hideLabel" label="Hide label"></v-checkbox-btn>

      <v-checkbox-btn v-model="hideValue" label="Hide value"></v-checkbox-btn>

      <v-checkbox-btn v-model="indeterminate" label="Indeterminate"></v-checkbox-btn>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-progress'
  const model = shallowRef('default')
  const options = ['circular']
  const value = shallowRef(50)
  const color = shallowRef('primary')
  const hideLabel = shallowRef(false)
  const hideValue = shallowRef(false)
  const indeterminate = shallowRef(false)
  const detailsPosition = shallowRef('top')

  const props = computed(() => {
    return {
      color: color.value || undefined,
      'hide-label': hideLabel.value || undefined,
      'hide-value': hideValue.value || undefined,
      indeterminate: indeterminate.value || undefined,
      label: 'Loading...',
      'details-position': detailsPosition.value !== 'top' ? detailsPosition.value : undefined,
      'model-value': value.value,
      type: model.value !== 'default' ? model.value : undefined,
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}></${name}>`
  })
</script>
