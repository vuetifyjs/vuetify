<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="d-flex justify-center">
      <v-date-range-picker v-model="value" v-bind="props"></v-date-range-picker>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="colorItems"
        label="Color"
        clearable
      ></v-select>

      <v-switch
        v-model="independentMonths"
        color="primary"
        label="Independent months"
        hide-details
      ></v-switch>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = ref('v-date-range-picker')
  const model = ref('default')
  const options = []

  const value = ref(['2026-04-17', '2026-05-12'])
  const color = ref(undefined)
  const independentMonths = ref(false)
  const colorItems = [
    { title: 'Primary', value: 'primary' },
    { title: 'Success', value: 'success' },
    { title: 'Purple', value: 'purple' },
    { title: 'Custom (#ffaa00)', value: '#fa0' },
  ]

  const props = computed(() => {
    return {
      color: color.value || undefined,
      'independent-months': independentMonths.value || undefined,
    }
  })

  const slots = computed(() => '')

  const code = computed(() => {
    return `<v-date-range-picker${propsToString(props.value)}>${slots.value}</v-date-range-picker>`
  })
</script>
