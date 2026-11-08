<template>
  <div>
    <v-alert v-if="error" :text="error" type="error" variant="tonal"></v-alert>

    <v-map
      :svg="svg"
      label="Warehouse network"
    >
      <template v-slot:tooltip="{ region }">
        <div class="d-flex align-baseline ga-4">
          <strong>{{ region.title }}</strong>
          <span class="ms-auto text-caption opacity-60">Last 6 months</span>
        </div>
        <div
          v-for="metric in metrics(region.id)"
          :key="metric.label"
          class="d-flex align-end ga-4 mt-1"
        >
          <div>
            <div class="text-caption opacity-70">{{ metric.label }}</div>
            <div class="font-weight-medium">{{ metric.format(metric.values.at(-1)) }}</div>
          </div>
          <div aria-hidden="true" class="region-sparkline ms-auto">
            <span
              v-for="(height, index) in bars(metric.values)"
              :key="index"
              :style="{ height: `${height}%` }"
            ></span>
          </div>
        </div>
      </template>

      <template v-slot:map>
        <g
          v-for="warehouse in warehouses"
          :key="warehouse.id"
          :ref="el => markers[warehouse.id] = el"
          :aria-label="`${warehouse.city} warehouse: ${statuses[warehouse.status].label}`"
          :class="`warehouse-marker warehouse-marker--${warehouse.status}`"
          :fill="statuses[warehouse.status].color"
          role="img"
          tabindex="0"
          @click.stop
          @pointerdown.stop
        >
          <circle
            v-if="warehouse.status === 'down'"
            :cx="warehouse.x"
            :cy="warehouse.y"
            class="warehouse-marker__pulse"
            r="7"
          ></circle>
          <circle
            :cx="warehouse.x"
            :cy="warehouse.y"
            class="warehouse-marker__dot"
            r="7"
          ></circle>
        </g>
      </template>

      <template v-slot:default>
        <v-tooltip
          v-for="warehouse in warehouses"
          :key="warehouse.id"
          :activator="markers[warehouse.id]"
          location="top"
        >
          <div class="d-flex align-center ga-2">
            <v-badge :color="statuses[warehouse.status].badge" dot inline></v-badge>
            <strong>{{ warehouse.city }}</strong>
            <span class="ms-auto text-uppercase opacity-60">{{ warehouse.id }}</span>
          </div>
          <div class="d-flex justify-space-between ga-4 opacity-80">
            <span>{{ warehouse.status === 'down' ? 'Offline' : `${warehouse.orders} orders/h` }}</span>
            <span>{{ warehouse.capacity }}% full</span>
          </div>
        </v-tooltip>

        <v-card
          class="position-absolute top-0 right-0 ma-3"
          min-width="180"
          title="Warehouses"
          border
        >
          <template v-slot:subtitle>
            {{ online }}/{{ warehouses.length }} online
          </template>

          <v-card-text class="d-flex flex-column ga-1">
            <div
              v-for="(status, key) in statuses"
              :key="key"
              class="d-flex align-center ga-2"
            >
              <v-badge :color="status.badge" dot inline></v-badge>
              {{ status.label }}
              <span class="ms-auto">{{ warehouses.filter(warehouse => warehouse.status === key).length }}</span>
            </div>
          </v-card-text>
        </v-card>
      </template>
    </v-map>

    <p class="mt-3 text-label-small text-medium-emphasis">
      Map by <a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/italy" rel="noopener" target="_blank">SVG Maps</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC BY 4.0</a>).
    </p>
  </div>
</template>

<script setup>
  import { onMounted, shallowReactive, shallowRef } from 'vue'

  const svg = shallowRef()
  const error = shallowRef('')
  const markers = shallowReactive({})

  const statuses = {
    operational: { label: 'Operational', badge: 'success', color: 'rgb(var(--v-theme-success))' },
    degraded: { label: 'Degraded', badge: 'warning', color: 'rgb(var(--v-theme-warning))' },
    down: { label: 'Down', badge: 'error', color: 'rgb(var(--v-theme-error))' },
  }

  const warehouses = [
    { id: 'trn', city: 'Turin', region: 'piedmont', x: 54, y: 149, status: 'operational', orders: 142, capacity: 64 },
    { id: 'mil', city: 'Milan', region: 'lombardy', x: 131, y: 121, status: 'operational', orders: 318, capacity: 81 },
    { id: 'vce', city: 'Venice', region: 'veneto', x: 292, y: 122, status: 'degraded', orders: 57, capacity: 93 },
    { id: 'blq', city: 'Bologna', region: 'emilia-romagna', x: 242, y: 191, status: 'operational', orders: 204, capacity: 72 },
    { id: 'rom', city: 'Rome', region: 'lazio', x: 301, y: 374, status: 'operational', orders: 276, capacity: 68 },
    { id: 'nap', city: 'Naples', region: 'campania', x: 392, y: 445, status: 'down', orders: 0, capacity: 45 },
    { id: 'bri', city: 'Bari', region: 'apulia', x: 525, y: 427, status: 'operational', orders: 98, capacity: 59 },
    { id: 'pmo', city: 'Palermo', region: 'sicily', x: 345, y: 627, status: 'degraded', orders: 41, capacity: 88 },
  ]

  const unitFormat = new Intl.NumberFormat('en')
  const costFormat = new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR', notation: 'compact' })

  function seeded (id) {
    let seed = Math.abs([...id].reduce((hash, char) => hash * 31 + char.charCodeAt(0) | 0, 7)) % 2147483646 + 1
    return () => (seed = seed * 16807 % 2147483647) / 2147483647
  }

  function series (random, base) {
    let value = base
    return Array.from({ length: 6 }, () => Math.round(value *= 0.85 + random() * 0.3))
  }

  function bars (values) {
    const min = Math.min(...values)
    const max = Math.max(...values)
    return values.map(value => 20 + (value - min) / (max - min || 1) * 80)
  }

  function metrics (id) {
    const random = seeded(id)
    return [
      { label: 'Units sold', values: series(random, 2000 + random() * 8000), format: value => unitFormat.format(value) },
      { label: 'Operating costs', values: series(random, 20000 + random() * 60000), format: value => costFormat.format(value) },
    ]
  }

  const online = warehouses.filter(warehouse => warehouse.status !== 'down').length

  onMounted(async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@svg-maps/italy@2.0.0/italy.svg')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      svg.value = await response.text()
    } catch {
      error.value = 'Could not load the map from jsDelivr.'
    }
  })
</script>

<style scoped>
  .region-sparkline {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 24px;
  }

  .region-sparkline > span {
    width: 5px;
    background: currentColor;
    border-radius: 1px;
    opacity: .5;
  }

  .region-sparkline > span:last-child {
    opacity: 1;
  }

  .warehouse-marker {
    cursor: pointer;
    outline: none;
  }

  .warehouse-marker__dot {
    stroke: rgb(var(--v-theme-surface));
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
    transform-box: fill-box;
    transform-origin: center;
    transition: transform .15s;
  }

  .warehouse-marker:hover .warehouse-marker__dot,
  .warehouse-marker:focus-visible .warehouse-marker__dot {
    transform: scale(1.4);
  }

  .warehouse-marker:focus-visible .warehouse-marker__dot {
    stroke: currentColor;
    stroke-width: 3px;
  }

  .warehouse-marker__pulse {
    transform-box: fill-box;
    transform-origin: center;
    animation: warehouse-pulse 1.6s ease-out infinite;
    pointer-events: none;
  }

  @keyframes warehouse-pulse {
    from { opacity: .6; transform: scale(1); }
    to { opacity: 0; transform: scale(3); }
  }

  @media (prefers-reduced-motion: reduce) {
    .warehouse-marker__pulse {
      animation: none;
    }
  }
</style>
