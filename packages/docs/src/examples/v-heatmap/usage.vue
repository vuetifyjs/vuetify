<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <div class="d-flex justify-center">
      <v-heatmap v-bind="{ ...props, columns, items, thresholds }"></v-heatmap>
    </div>

    <template v-slot:configuration>
      <div class="d-flex flex-column ga-2">
        <v-checkbox v-model="hideColumnHeaders" label="Hide column headers" hide-details></v-checkbox>
        <v-checkbox v-model="hideRowHeaders" label="Hide row headers" hide-details></v-checkbox>
        <v-checkbox v-model="showLegend" label="Show legend" hide-details></v-checkbox>
        <v-checkbox v-model="hover" label="Hover effect" hide-details></v-checkbox>

        <v-slider
          v-model="cellSize"
          label="Cell size"
          max="48"
          min="24"
        ></v-slider>

        <v-slider
          v-model="roundedIndex"
          :ticks="Object.fromEntries(roundedOptions.map((v, i) => [i, v]))"
          label="Rounded"
          max="5"
          min="0"
          step="1"
        ></v-slider>
      </div>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-heatmap'
  const model = ref('default')
  const options = []

  const columns = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const thresholds = [
    { min: 1, color: '#cfe0ff' },
    { min: 3, color: '#89a7ff' },
    { min: 6, color: '#4a76e8' },
    { min: 9, color: '#1e47c2' },
  ]

  // 5 weeks of pseudo-random activity
  const values = [
    null, 0, 2, 5, 4, 1, 0,
    1, 3, 4, 7, 2, 1, 0,
    0, 2, 5, 9, 6, 3, 1,
    0, 1, 3, 4, 2, 0, 0,
    2, 4, 6, 4, 0,
  ]
  const items = values.flatMap((value, i) =>
    value !== null
      ? [{
        row: `W${Math.floor(i / 7) + 1}`,
        column: columns[i % 7],
        value,
      }]
      : []
  )

  const hideColumnHeaders = ref(false)
  const hideRowHeaders = ref(false)
  const showLegend = ref(false)
  const hover = ref(true)
  const cellSize = ref(32)
  const roundedOptions = ['0', 'sm', 'md', 'lg', 'xl', 'pill']
  const roundedIndex = ref(2)
  const rounded = computed(() => roundedOptions[roundedIndex.value])

  const props = computed(() => {
    return {
      'cell-size': cellSize.value !== 26 ? cellSize.value : undefined,
      'hide-column-headers': hideColumnHeaders.value || undefined,
      'hide-row-headers': hideRowHeaders.value || undefined,
      legend: showLegend.value || undefined,
      hover: hover.value || undefined,
      rounded: rounded.value,
    }
  })

  const script = computed(() => {
    return `<${''}script setup>
  const columns = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const thresholds = [
    { min: 1, color: '#cfe0ff' },
    { min: 3, color: '#89a7ff' },
    { min: 6, color: '#4a76e8' },
    { min: 9, color: '#1e47c2' },
  ]
  const items = [
    { row: 'W1', column: 'Mon', value: null },
    { row: 'W1', column: 'Tue', value: 0 },
    { row: 'W1', column: 'Wed', value: 0 },
    { row: 'W1', column: 'Thu', value: 2 },
    /* etc. */
  ]
<` + '/script>'
  })

  const code = computed(() => {
    return `<${name} ${propsToString(props.value)}
  :columns="columns"
  :items="items"
  :thresholds="thresholds"
/>`
  })
</script>
