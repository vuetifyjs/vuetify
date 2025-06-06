<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
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
            v-model="innerCut"
            label="Inner cut"
            max="99"
            min="0"
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

          <v-chip-group v-model="gap" mandatory>
            <v-chip :value="4" text="spaced" filter></v-chip>
            <v-chip :value="0" text="tight" filter></v-chip>
          </v-chip-group>

          <v-chip-group v-model="rounded" mandatory>
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
    { key: 1, title: 'Yes', value: 45 },
    { key: 2, title: 'No', value: 40 },
    { key: 3, title: 'Maybe', value: 15 },
  ]
  const showLegend = ref(true)
  const innerSliceVisible = ref(false)
  const size = ref(250)

  const innerCut = ref(85)
  const rotate = ref()
  const rounded = ref(0)
  const gap = ref(0)
  const gaugeCut = ref(120)
  const props = computed(() => {
    return {
      title: { default: 'Basic pie', donut: 'Do you like donuts?' }[model.value],
      gap: (model.value !== 'default' && gap.value) || undefined,
      'gauge-cut': (model.value === 'gauge' && gaugeCut.value) || undefined,
      'inner-cut': model.value !== 'default' ? innerCut.value : undefined,
      legend: { visible: showLegend.value },
      palette: ['#048BA8', '#99C24D', '#F18F01'],
      rotate: rotate.value || undefined,
      rounded: (model.value !== 'default' && rounded.value) || undefined,
      size: size.value !== 250 ? size.value : undefined,
      'hide-slice': model.value === 'gauge' || (model.value === 'donut' && !innerSliceVisible.value) || undefined,
    }
  })

  const script = computed(() => {
    function itemToString ({ key, title, value }) {
      return `    { key: ${key}, title: "${title}", value: ${value} },`
    }

    return `<script setup>
  const items = [
${items.map(itemToString).join('\n')}
  ]
<` + '/script>'
  })

  const code = computed(() => {
    return `<${name} ${propsToString(props.value)}  :items="items"
/>`
  })
</script>
