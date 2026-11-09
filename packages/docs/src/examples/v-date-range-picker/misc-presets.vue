<template>
  <v-container>
    <v-row justify="center">
      <v-card class="d-flex" elevation="2" rounded>
        <v-list
          v-model:selected="preset"
          :items="presets"
          density="compact"
          width="180"
          mandatory
          nav
        ></v-list>

        <v-divider vertical></v-divider>

        <v-date-range-picker v-model="model"></v-date-range-picker>
      </v-card>
    </v-row>

    <v-row class="mt-4" justify="center">
      <v-chip
        v-if="model?.length === 2"
        :text="`${formatDate(model[0])}  ~  ${formatDate(model[1])}`"
      ></v-chip>
    </v-row>
  </v-container>
</template>

<script setup>
  import { useDate } from 'vuetify'

  const adapter = useDate()
  const formatDate = v => adapter.format(adapter.date(v), 'keyboardDate')

  const today = adapter.date()

  function daysAgo (count) {
    return adapter.addDays(today, -count)
  }

  const presets = [
    { title: 'Last 7 days', value: 'last-7d' },
    { title: 'Last 30 days', value: 'last-30d' },
    { title: 'This month', value: 'this-month' },
    { title: 'Last month', value: 'last-month' },
  ]

  const preset = ref(['last-7d'])
  const model = ref([daysAgo(6), today])

  watch(preset, ([value]) => {
    if (value === 'last-7d') model.value = [daysAgo(6), today]
    else if (value === 'last-30d') model.value = [daysAgo(29), today]
    else if (value === 'this-month') model.value = [adapter.startOfMonth(today), today]
    else if (value === 'last-month') {
      const lastMonth = adapter.addMonths(today, -1)
      model.value = [adapter.startOfMonth(lastMonth), adapter.endOfMonth(lastMonth)]
    }
  })
</script>
