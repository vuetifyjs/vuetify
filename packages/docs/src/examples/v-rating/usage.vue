<template>
  <ExamplesUsageExample
    v-model="selectedOption"
    :code="code"
    :name="name"
    :options="['Hearts']"
  >
    <div class="text-center">
      <v-rating v-bind="props"></v-rating>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="options['half-increments']" label="Half increments"></v-checkbox>
      <v-checkbox v-model="options.hover" label="Hover"></v-checkbox>
      <v-checkbox v-model="options.readonly" label="Readonly"></v-checkbox>

      <br>

      <v-slider v-model="options.length" :max="8" :min="1" label="Length"></v-slider>
      <v-slider v-model="options.size" :max="128" :min="16" label="Size"></v-slider>
      <v-slider v-model="options['model-value']" :max="options.length" :min="0" :step="options['half-increments'] ? 0.5 : 1" label="Value"></v-slider>

      <br>

      <v-select v-model="options.color" :items="colorOptions" label="Color"></v-select>
      <v-select v-model="options['active-color']" :items="colorOptions" label="Active color"></v-select>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const selectedOption = ref()

  const options = reactive({
    'half-increments': false,
    hover: true,
    readonly: false,

    length: 5,
    size: 32,
    'model-value': 3,

    color: null,
    'active-color': 'primary',
  })

  const name = 'v-rating'
  const props = computed(() => {
    return Object.fromEntries(
      Object.entries({
        ...options,
        ...(selectedOption.value === 'Hearts' ? {
          'empty-icon': 'mdi-heart-outline',
          'half-icon': 'mdi-heart-half-full',
          'full-icon': 'mdi-heart',
        } : undefined),
      }).filter(([key, value]) => value)
    )
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)} />`
  })

  const colorOptions = [
    'primary',
    'warning',
    'green',
    'red',
    'blue',
    'error',
    'teal',
    'red-lighten-3',
  ]
</script>
