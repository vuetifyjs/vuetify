<template>
  <div class="mx-auto" style="max-width: 400px">
    <v-dialog
      v-model="dialog"
      :fullscreen="fullscreen"
      max-width="400"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-text-field
          :model-value="formattedRange"
          label="Trip dates"
          prepend-inner-icon="mdi-calendar-range"
          variant="outlined"
          v-bind="activatorProps"
          hide-details
          readonly
        ></v-text-field>
      </template>

      <v-card :height="fullscreen ? '100%' : undefined" class="overflow-hidden">
        <v-toolbar color="transparent" density="compact">
          <v-btn
            aria-label="Close date picker"
            icon="mdi-close"
            @click="dialog = false"
          ></v-btn>

          <v-toolbar-title>
            <span v-if="compact" class="d-block text-wrap text-body-1">{{ selection }}</span>
            <span v-else>Trip dates</span>
          </v-toolbar-title>

          <v-btn
            :disabled="range.length !== 2"
            color="primary"
            text="Done"
            @click="dialog = false"
          ></v-btn>
        </v-toolbar>

        <v-date-range-picker
          v-model="range"
          :height="fullscreen ? '100%' : 480"
          :hide-header="compact"
          :max="max"
          :min="min"
          class="flex-grow-1"
          color="primary"
          style="min-height: 0"
          width="100%"
          hide-title
          scrollable
        ></v-date-range-picker>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { computed, shallowRef, toRef } from 'vue'
  import { useDate, useDisplay } from 'vuetify'

  const adapter = useDate()
  const { mobile, width, height } = useDisplay()
  const compact = toRef(() => width.value > height.value && height.value < 500)
  const fullscreen = toRef(() => mobile.value || compact.value)
  const today = adapter.date()
  const min = adapter.startOfMonth(today)
  const max = adapter.endOfMonth(adapter.addMonths(today, 11))

  const dialog = shallowRef(false)
  const range = shallowRef([today, adapter.addDays(today, 6)])
  const selection = toRef(() => range.value
    .map(value => adapter.format(adapter.date(value), 'fullDate'))
    .join(' – ') || 'Trip dates')
  const formattedRange = computed(() => range.value
    .map(date => adapter.format(date, 'keyboardDate'))
    .join(' – '))
</script>
