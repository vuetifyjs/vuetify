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

        <div class="d-flex flex-column">
          <v-date-range-picker v-model="draft" independent-months>
            <template v-slot:footer>
              <v-text-field
                :model-value="formatDate(draft?.[0])"
                density="compact"
                style="max-width: 140px"
                variant="outlined"
                hide-details
                readonly
              ></v-text-field>
              <span class="text-medium-emphasis">»</span>
              <v-text-field
                :model-value="formatDate(draft?.[1])"
                density="compact"
                style="max-width: 140px"
                variant="outlined"
                hide-details
                readonly
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn text="Cancel" variant="text" @click="cancel"></v-btn>
              <v-btn
                :disabled="!hasRange"
                color="primary"
                text="Apply"
                @click="apply"
              ></v-btn>
            </template>
          </v-date-range-picker>
        </div>
      </v-card>
    </v-row>

    <div v-if="applied" class="d-flex align-center justify-center mt-4">
      <v-chip :text="`${formatDate(applied[0])} ~ ${formatDate(applied[1])}`"></v-chip>
      ← click <v-code class="mx-2">Apply</v-code> to sync
    </div>
  </v-container>
</template>

<script setup>
  import { useDate } from 'vuetify'

  const adapter = useDate()
  const formatDate = v => (v ? adapter.format(adapter.date(v), 'keyboardDate') : '')

  const today = adapter.date()

  function daysAgo (count) {
    return adapter.addDays(today, -count)
  }

  function monthsAgo (count) {
    return adapter.addMonths(today, -count)
  }

  const presets = [
    { title: 'Today', value: 'today' },
    { title: 'Last 7 days', value: 'last-7d' },
    { title: 'Last 30 days', value: 'last-30d' },
    { title: 'Last 3 months', value: 'last-3m' },
    { title: 'Last 12 months', value: 'last-12m' },
    { title: 'Month to date', value: 'month-to-date' },
    { title: 'Year to date', value: 'year-to-date' },
  ]

  const preset = ref(['last-30d'])
  const draft = ref([daysAgo(6), today])
  const applied = ref([daysAgo(6), today])

  const hasRange = computed(() => draft.value?.length === 2)

  watch(preset, ([value]) => {
    if (value === 'today') draft.value = [today, today]
    else if (value === 'last-7d') draft.value = [daysAgo(6), today]
    else if (value === 'last-30d') draft.value = [daysAgo(29), today]
    else if (value === 'last-3m') draft.value = [monthsAgo(3), today]
    else if (value === 'last-12m') draft.value = [monthsAgo(12), today]
    else if (value === 'month-to-date') draft.value = [adapter.startOfMonth(today), today]
    else if (value === 'year-to-date') draft.value = [adapter.startOfYear(today), today]
  })

  function apply () {
    applied.value = [...draft.value]
  }

  function cancel () {
    draft.value = applied.value ? [...applied.value] : []
  }
</script>
