<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <v-sheet class="pa-6 mx-auto" max-width="500">
      <v-sparkline-group v-bind="props">
        <v-sparkline
          :gradient="gradient"
          :model-value="data.previous"
          auto-draw="once"
          class="opacity-60"
          color="grey"
          line-width="2"
          animation
          fill
          smooth
        ></v-sparkline>
        <v-sparkline
          :gradient="gradient"
          :model-value="data.price"
          auto-draw="once"
          color="primary"
          line-width="2"
          animation
          fill
          smooth
        ></v-sparkline>
        <v-sparkline
          :model-value="data.volume"
          auto-draw="once"
          class="opacity-40"
          color="grey"
          height="48"
          line-width="5"
          min="0"
          type="bar"
          animation
        ></v-sparkline>
        <template v-slot:tooltip="{ index, items }">
          <div class="text-body-small text-center">{{ data.xAxis.format(index) }}</div>
          <v-divider class="my-2"></v-divider>
          <div
            v-for="i in [1, 0, 2]"
            :key="i"
            class="d-flex align-center ga-2 px-1"
          >
            <v-avatar :color="items[i].color" size="8"></v-avatar>
            <span class="me-6">{{ seriesLabels[i] }}</span>
            <span class="ms-auto" style="font-variant-numeric: tabular-nums">{{ formatValue(items[i].value, i) }}</span>
          </div>
        </template>
      </v-sparkline-group>
    </v-sheet>

    <template v-slot:configuration>
      <v-btn-toggle
        v-model="range"
        class="mb-4"
        color="primary"
        density="compact"
        variant="outlined"
        divided
        mandatory
      >
        <v-btn text="Day" value="day"></v-btn>
        <v-btn text="Week" value="week"></v-btn>
      </v-btn-toggle>

      <v-checkbox v-model="xAxis" label="X axis" hide-details></v-checkbox>
      <v-checkbox v-model="yAxis" label="Y axis" hide-details></v-checkbox>
      <v-checkbox v-model="grid" :disabled="!yAxis" label="Grid lines" hide-details></v-checkbox>
      <v-checkbox v-model="tooltip" :disabled="model !== 'interactive'" label="Tooltip" hide-details></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-sparkline-group'
  const model = ref('interactive')
  const options = ['interactive']

  const toNumbers = text => text.split('').map(Number)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']

  const ranges = {
    day: {
      price: toNumbers('3455432234544320134787678987877877865656777667887').map(v => (122000 + v * 307) / 100),
      previous: toNumbers('8887776577765653210124234443111113221201122112212').map(v => (122800 + v * 307) / 100),
      volume: toNumbers('1323242465326787523534897865645397576549785357232'),
      xAxis: {
        labels: ['10:00', '12:00', '14:00', '16:00', '18:00'],
        format: i => `${10 + Math.floor(i / 6)}:${i % 6}0`,
      },
    },
    week: {
      price: toNumbers('2333445665444443456778777665554556778889887').map(v => (121000 + v * 613) / 100),
      previous: toNumbers('6665554443334443332223444555444333222333445').map(v => (121500 + v * 511) / 100),
      volume: toNumbers('3546275836494857263748596837435462758364948'),
      xAxis: {
        labels: days,
        format: i => `${days[Math.floor(i / 6)]} ${String((i % 6) * 4).padStart(2, '0')}:00`,
      },
    },
  }

  const gradient = ['color-mix(in srgb, currentColor 25%, transparent)', 'transparent']

  const range = ref('day')
  const xAxis = ref(true)
  const yAxis = ref(true)
  const grid = ref(true)
  const tooltip = ref(true)

  const data = computed(() => ranges[range.value])

  const seriesLabels = computed(() => range.value === 'day' ? ['Yesterday', 'Today', 'Volume'] : ['Last week', 'This week', 'Volume'])
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  const shares = new Intl.NumberFormat('en-US', { notation: 'compact' })
  const moneyRounded = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  const formatValue = (value, index) => index === 2 ? shares.format(value * 120_000) : money.format(value)

  const props = computed(() => {
    const interactive = model.value === 'interactive'
    return {
      height: 200,
      min: 1200,
      max: 1280,
      interactive: interactive || undefined,
      tooltip: interactive && tooltip.value ? { class: 'pa-4' } : undefined,
      xAxis: xAxis.value ? data.value.xAxis : undefined,
      yAxis: yAxis.value ? { ticks: 4, grid: grid.value, format: value => moneyRounded.format(value) } : undefined,
    }
  })

  const script = computed(() => `<script setup>
  import { ref } from 'vue'

  // one value every 10 minutes, 10:00 - 18:00
  const price = ref([1229.21, 1232.28, 1235.35, 1235.35, 1232.28, /* … */])
  const previous = ref([1252.56, 1252.56, 1252.56, 1249.49, 1249.49, /* … */])
  const volume = ref([1, 3, 2, 3, 2, /* … */])

  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  const moneyRounded = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  const yAxis = {
    ticks: 4,
    grid: ${grid.value},
    format: value => moneyRounded.format(value),
  }

  const xAxis = {
    labels: ['10:00', '12:00', '14:00', '16:00', '18:00'],
    format: i => \`\${10 + Math.floor(i / 6)}:\${i % 6}0\`,
  }
<` + '/script>')

  const code = computed(() => {
    const { xAxis: x, yAxis: y, ...rest } = props.value
    const groupProps = propsToString({
      ...rest,
      'x-axis': x ? 'xAxis' : undefined,
      'y-axis': y ? 'yAxis' : undefined,
    }, ['height', 'min', 'max', 'x-axis', 'y-axis'])

    return `<${name}${groupProps}>
  <v-sparkline :model-value="previous" color="grey" fill smooth />
  <v-sparkline :model-value="price" color="primary" fill smooth />
  <v-sparkline :model-value="volume" color="grey" type="bar" height="48" min="0" />${props.value.tooltip ? `

  <template #tooltip="{ index, items }">
    <div class="text-body-small text-center">{{ xAxis.format(index) }}</div>
    <v-divider class="my-2" />
    <div v-for="i in [1, 0, 2]" :key="i" class="d-flex align-center ga-2 px-1">
      <v-avatar :color="items[i].color" size="8" />
      <span class="me-6">{{ ['Yesterday', 'Today', 'Volume'][i] }}</span>
      <span class="ms-auto">{{ i === 2 ? items[i].value : money.format(items[i].value) }}</span>
    </div>
  </template>` : ''}
</${name}>`
  })
</script>
