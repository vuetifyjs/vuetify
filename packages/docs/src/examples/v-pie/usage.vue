<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="d-flex justify-center">
      <v-pie v-bind="{ ...props, items }"></v-pie>
    </div>

    <template v-slot:configuration>
      <div class="d-flex flex-column ga-2">
        <v-checkbox v-model="showLegend" label="Show legend"></v-checkbox>

        <v-slider
          v-if="model !== 'gauge'"
          v-model="rotate"
          label="Rotation"
          max="180"
          min="0"
        ></v-slider>

        <v-slider
          v-model="size"
          label="Size"
          max="400"
          min="150"
        ></v-slider>

        <template v-if="model !== 'default'">
          <v-slider
            v-model="width"
            label="Width"
            max="70"
            min="5"
          ></v-slider>

          <v-slider
            v-if="model === 'gauge'"
            v-model="gaugeCut"
            label="Gauge cut"
            max="220"
            min="100"
          ></v-slider>

          <v-checkbox
            v-if="model !== 'gauge'"
            v-model="innerSliceVisible"
            label="Show inner slice"
          ></v-checkbox>

          <v-chip-group v-model="padAngle">
            <v-chip :value="4" text="spaced" filter></v-chip>
            <v-chip :value="0" text="tight" filter></v-chip>
          </v-chip-group>

          <v-chip-group v-model="rounded">
            <v-chip :value="4" text="rounded" filter></v-chip>
            <v-chip :value="0" text="straight" filter></v-chip>
          </v-chip-group>
        </template>
      </div>

    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-pie'
  const model = ref('default')
  const options = ['donut', 'gauge']
  const items = [
    { key: 1, title: 'Yes', value: 45, color: '#048BA8' },
    { key: 2, title: 'No', value: 40, color: '#99C24D' },
    { key: 3, title: 'Maybe', value: 15, color: '#F18F01' },
  ]
  const showLegend = ref(true)
  const innerSliceVisible = ref(false)
  const size = ref(250)

  const width = ref(30)
  const rotate = ref()
  const rounded = ref(0)
  const padAngle = ref(0)
  const gaugeCut = ref(120)
  const props = computed(() => {
    return {
      title: { default: 'Basic pie', donut: 'Do you like donuts?' }[model.value],
      legend: showLegend.value || undefined,
      hideSlice: model.value === 'gauge' || (model.value === 'donut' ? !innerSliceVisible.value : undefined),
      rotate: rotate.value || undefined,
      rounded: rounded.value || undefined,
      padAngle: padAngle.value || undefined,
      gaugeCut: model.value === 'gauge' ? gaugeCut.value : undefined,
      size: size.value !== 250 ? size.value : undefined,
      width: model.value !== 'default' ? width.value : undefined,
    }
  })

  const itemsCode = computed(() => {
    return items
      .map(x => `  <v-pie-item key="${x.key}" title="${x.title}" :value="${x.value}" color="${x.color}" />`)
      .join('\n')
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>\n  <!-- future syntax -->\n${itemsCode.value}\n</v-pie>`
  })
</script>
