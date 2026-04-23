<template>
  <v-container>
    <v-card class="pa-4 pb-2 mx-auto" rounded="lg" width="500">
      <div class="d-flex align-center ga-2 mb-1">
        <v-icon icon="mdi-chevron-down" size="18"></v-icon>
        <span class="text-uppercase text-body-small font-weight-bold">Weekly Downloads</span>

        <v-spacer></v-spacer>

        <div class="text-body-small text-medium-emphasis mb-2">
          {{ hoveredWeek ?? lastWeek }}
        </div>
      </div>

      <div class="d-flex align-end ga-4 pl-1">
        <span class="text-headline-large font-weight-bold mb-1" style="min-width: 140px">
          {{ hoveredValue ?? lastValue }}
        </span>

        <v-sparkline
          :gradient="['rgba(var(--v-theme-surface-variant), .2)', 'rgba(var(--v-theme-surface-variant), .1)']"
          :model-value="weeklyValues"
          class="mr-n2"
          color="medium-emphasis"
          height="60"
          line-width="1.5"
          marker-size="12"
          marker-stroke="rgb(var(--v-theme-surface))"
          min="0"
          padding="6"
          smooth="2"
          stroke-linecap="round"
          style="flex: 1"
          width="300"
          fill
          interactive
          @update:current-index="hoveredIdx = $event"
        ></v-sparkline>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useDate } from 'vuetify'

  const adapter = useDate()

  const weeks = ref([])
  const hoveredIdx = ref(null)

  const weeklyValues = computed(() => weeks.value.map(w => w.total))

  const lastWeek = computed(() => {
    const w = weeks.value[weeks.value.length - 1]
    return w ? `${w.start} to ${w.end}` : ''
  })

  const lastValue = computed(() => weeks.value.at(-1)?.total?.toLocaleString())

  const hoveredWeek = computed(() => {
    if (hoveredIdx.value == null) return null
    const w = weeks.value[hoveredIdx.value]
    return w ? `${w.start} to ${w.end}` : null
  })

  const hoveredValue = computed(() => {
    if (hoveredIdx.value == null) return null
    return weeks.value[hoveredIdx.value]?.total?.toLocaleString()
  })

  onMounted(async () => {
    const today = adapter.date()
    const range = [
      adapter.startOfWeek(adapter.addMonths(today, -12), 1),
      today,
    ].map(v => adapter.toISO(v)).join(':')

    const url = `https://api.npmjs.org/downloads/range/${range}/vuetify`

    const res = await fetch(url)
    const data = await res.json()

    const result = []
    const currentWeekday = adapter.toJsDate(today).getDay()
    let week = null

    for (const d of data.downloads.slice(0, (-currentWeekday))) {
      const parsed = adapter.parseISO(d.day)
      const isMonday = adapter.isSameDay(parsed, adapter.startOfWeek(parsed, 1))
      if (!week || isMonday) {
        if (week) result.push(week)
        week = { start: d.day, end: d.day, total: 0 }
      }
      week.end = d.day
      week.total += d.downloads
    }
    if (week) result.push(week)

    weeks.value = result
  })
</script>
