<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-select
      v-model="legendMode"
      :items="[
        { prependIcon: 'mdi-arrow-up', value: 'top', title :'top' },
        { prependIcon: 'mdi-arrow-right', value: 'right', title :'right' },
        { prependIcon: 'mdi-arrow-down', value: 'bottom', title :'bottom' },
        { prependIcon: 'mdi-arrow-left', value: 'left', title :'left' },
        { prependIcon: 'mdi-eye-off', value: 'hidden', title :'hidden' },
      ]"
      prefix="Legend mode: "
      rounded="xl"
      variant="solo"
      width="350"
      item-props
      single-line
    ></v-select>

    <v-sheet class="pa-6" elevation="2" rounded="xl">
      <v-pie
        :items="items"
        :legend="legendConfig"
        :tooltip="{ subtitleFormat: (s) => `${formatNumber(s.value)} respondents (${(100 * s.value / total).toFixed(1)}%)` }"
        inner-cut="85"
        size="300"
        animation
        hide-slice
      >
        <template v-slot:legend-text="{ item }">
          <div class="d-flex ga-6">
            <div>{{ item.title }}</div>

            <div class="ml-auto font-weight-bold">
              {{ formatNumber(item.value) }}
            </div>
          </div>
        </template>
      </v-pie>
    </v-sheet>
  </v-container>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  const numberFormatter = new Intl.NumberFormat('en', { useGrouping: true })
  function formatNumber (v) {
    return numberFormatter.format(v)
  }

  const legendMode = ref('right')
  const legendConfig = ref({ position: 'right' })
  const items = [
    { key: 2, title: 'Google', value: 75, color: '#0080bb' },
    { key: 1, title: 'Bing', value: 20, color: '#58508d' },
    { key: 3, title: 'DuckDuckGo', value: 17, color: '#bc5090' },
    { key: 4, title: 'Brave', value: 15, color: '#ff6361' },
    { key: 5, title: 'Kagi', value: 5, color: '#ffa600' },
  ]
  const total = computed(() => items.reduce((sum, n) => sum + n.value, 0))

  watch(legendMode, mode => {
    legendConfig.value = mode === 'hidden'
      ? { visible: false }
      : { position: mode }
  })
</script>

<script>
  const numberFormatter = new Intl.NumberFormat('en', { useGrouping: true })
  export default {
    data: () => ({
      legendMode: 'right',
      legendConfig: { position: 'right' },
      items: [
        { key: 2, title: 'Google', value: 75, color: '#0080bb' },
        { key: 1, title: 'Bing', value: 20, color: '#58508d' },
        { key: 3, title: 'DuckDuckGo', value: 17, color: '#bc5090' },
        { key: 4, title: 'Brave', value: 15, color: '#ff6361' },
        { key: 5, title: 'Kagi', value: 5, color: '#ffa600' },
      ],
    }),
    computed: {
      total () {
        return this.items.reduce((sum, n) => sum + n.value, 0)
      },
    },
    watch: {
      legendMode (mode) {
        this.legendConfig = mode === 'hidden'
          ? { visible: false }
          : { position: mode }
      },
    },
    methods: {
      formatNumber (v) {
        return numberFormatter.format(v)
      },
    },
  }
</script>
