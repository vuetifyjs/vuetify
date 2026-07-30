<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-month-picker
      v-bind="props"
      class="mx-auto"
    ></v-month-picker>

    <template v-slot:configuration>
      <v-slider
        v-model="columns"
        :max="4"
        :min="1"
        :step="1"
        label="Columns"
        thumb-label
      ></v-slider>

      <v-select
        v-model="color"
        :items="colorItems"
        class="mt-3"
        label="Color"
        clearable
      ></v-select>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = ref('v-month-picker')
  const model = ref('default')
  const options = []
  const columns = ref(4)
  const color = ref(undefined)
  const colorItems = [
    { title: 'Primary', value: 'primary' },
    { title: 'Success', value: 'success' },
    { title: 'Purple', value: 'purple' },
    { title: 'Custom (#ffaa00)', value: '#fa0' },
  ]

  const props = computed(() => {
    return {
      color: color.value || undefined,
      'months-columns': columns.value !== 4 ? columns.value : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<v-month-picker${propsToString(props.value)}>${slots.value}</v-month-picker>`
  })
</script>
