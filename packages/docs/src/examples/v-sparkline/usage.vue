<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <v-sheet
      class="border-md border-dashed border-opacity-50 rounded-lg mx-auto"
      height="200"
      width="500"
    >
      <v-sparkline
        v-bind="props"
        :model-value="values"
      ></v-sparkline>
    </v-sheet>

    <template v-slot:configuration>
      <div class="d-flex flex-column ga-2">
        <v-checkbox v-model="fill" label="Fill with gradient" hide-details></v-checkbox>
        <v-checkbox v-model="showMarkers" label="Show markers" hide-details></v-checkbox>

        <v-checkbox
          v-if="model === 'interactive'"
          v-model="tooltip"
          label="Show tooltip"
          hide-details
        ></v-checkbox>

        <v-select
          v-model="color"
          :items="colorItems"
          label="Color"
          hide-details
        ></v-select>

        <v-slider
          v-model="smooth"
          label="Smooth"
          max="20"
          min="0"
          step="1"
          hide-details
        ></v-slider>

        <v-slider
          v-model="padding"
          label="Padding"
          max="32"
          min="0"
          step="1"
          hide-details
        ></v-slider>

      </div>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-sparkline'
  const model = ref('default')
  const options = ['interactive']

  const values = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]

  const fill = ref(false)

  const showMarkers = ref(false)
  const tooltip = ref(false)
  const color = ref('primary')
  const smooth = ref(8)
  const padding = ref(12)

  const colorItems = [
    { title: 'Primary', value: 'primary' },
    { title: 'Success', value: 'success' },
    { title: 'Purple', value: 'purple' },
    { title: 'Custom (#ffaa00)', value: '#fa0' },
  ]

  const props = computed(() => {
    const isInteractive = model.value === 'interactive'
    return {
      color: color.value,
      fill: fill.value,
      gradient: fill.value ? [`color-mix(in srgb, currentColor 70%, transparent)`, `color-mix(in srgb, currentColor 15%, transparent)`, 'transparent'] : undefined,
      interactive: isInteractive || undefined,
      'line-width': 2,
      'show-markers': showMarkers.value || undefined,
      'marker-stroke': (isInteractive || showMarkers.value) ? 'rgb(var(--v-theme-surface))' : undefined,
      smooth: smooth.value || undefined,
      tooltip: (isInteractive && tooltip.value) || undefined,
      padding: padding.value,

      height: 200,
      width: 500,
    }
  })

  const script = `<script setup>
  import { ref } from 'vue'

  const values = ref([0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0])
<` + '/script>'

  const code = computed(() => {
    return `<v-sparkline${propsToString(props.value)}  :model-value="values" />`
  })
</script>
