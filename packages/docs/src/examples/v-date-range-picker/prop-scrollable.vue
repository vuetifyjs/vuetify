<template>
  <div class="mx-auto" style="max-width: 400px">
    <v-dialog
      v-model="dialog"
      :fullscreen="mobile"
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

      <v-card>
        <v-toolbar color="transparent">
          <v-btn
            aria-label="Close date picker"
            icon="mdi-close"
            @click="dialog = false"
          ></v-btn>

          <v-toolbar-title>Trip dates</v-toolbar-title>

          <v-btn
            :disabled="range.length !== 2"
            color="primary"
            text="Done"
            @click="dialog = false"
          ></v-btn>
        </v-toolbar>

        <v-date-range-picker
          v-model="range"
          :height="mobile ? '100%' : 480"
          :max="max"
          :min="min"
          color="primary"
          width="100%"
          scrollable
        ></v-date-range-picker>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { computed, shallowRef } from 'vue'
  import { useDate, useDisplay } from 'vuetify'

  const adapter = useDate()
  const { mobile } = useDisplay()
  const today = adapter.date()
  const min = adapter.startOfMonth(today)
  const max = adapter.endOfMonth(adapter.addMonths(today, 11))

  const dialog = shallowRef(false)
  const range = shallowRef([today, adapter.addDays(today, 6)])
  const formattedRange = computed(() => range.value
    .map(date => adapter.format(date, 'keyboardDate'))
    .join(' – '))
</script>
