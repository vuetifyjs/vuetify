<template>
  <v-app theme="dark">
    <v-container fluid>
      <v-row class="align-center">
        <v-col cols="12" md="auto">
          <v-btn-toggle v-model="variant" density="compact" divided mandatory>
            <v-btn v-for="v in variants" :key="v" :text="v" :value="v" size="small" />
          </v-btn-toggle>
        </v-col>

        <v-col cols="12" md="auto">
          <v-btn-toggle v-model="density" density="compact" divided mandatory>
            <v-btn v-for="d in densities" :key="d" :text="d" :value="d" size="small" />
          </v-btn-toggle>
        </v-col>

        <v-col cols="12" md="auto">
          <v-chip-group v-model="color" filter mandatory>
            <v-chip
              v-for="c in colors"
              :key="c"
              :base-color="c"
              :text="c"
              :value="c"
              label
            />
          </v-chip-group>
        </v-col>

        <v-col cols="12" md="auto">
          <v-chip-group v-model="updateOn" filter multiple>
            <v-chip text="update on blur" value="blur" label />
            <v-chip text="update on enter" value="enter" label />
          </v-chip-group>
        </v-col>
      </v-row>

      <v-row class="align-center">
        <v-col cols="6" md="2">
          <v-select v-model="inputFormat" :items="inputFormats" density="compact" label="input-format" hide-details />
        </v-col>

        <v-col cols="6" md="2">
          <v-select v-model="format" :items="['24hr', 'ampm']" density="compact" label="format" hide-details />
        </v-col>

        <v-col cols="6" md="2">
          <v-select v-model="timeInterval" :items="[15, 30, 60, 120]" density="compact" label="time-interval" hide-details />
        </v-col>

        <v-col cols="12" md="auto">
          <div class="d-flex ga-4 flex-wrap">
            <v-switch v-model="useSeconds" color="primary" density="compact" label="use-seconds" hide-details />
            <v-switch v-model="openOnFocus" color="primary" density="compact" label="open-on-focus" hide-details />
            <v-switch v-model="hideActions" color="primary" density="compact" label="hide-actions" hide-details />
            <v-switch v-model="clearable" color="primary" density="compact" label="clearable" hide-details />
            <v-switch v-model="disabled" color="primary" density="compact" label="disabled" hide-details />
            <v-switch v-model="readonly" color="primary" density="compact" label="readonly" hide-details />
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4" />

      <v-row>
        <v-col cols="12" md="4">
          <h4 class="mb-4">VDateInput</h4>

          <v-date-input v-bind="{ ...common, ...dateProps }" v-model="date1" label="Single" />
          <v-chip :text="fmt(date1)" class="mb-6" size="small" />

          <v-date-input v-bind="{ ...common, ...dateProps }" v-model="date2" label="Multiple" multiple />
          <v-chip :text="fmt(date2)" class="mb-6" size="small" />

          <v-date-input v-bind="{ ...common, ...dateProps }" v-model="date3" label="Range" multiple="range" />
          <v-chip :text="fmt(date3)" class="mb-6" size="small" />

          <v-date-input
            v-bind="{ ...common, ...dateProps }"
            v-model="date4"
            label="Min / max"
            max="2026-09-15"
            min="2026-08-01"
          />
          <v-chip :text="fmt(date4)" size="small" />
        </v-col>

        <v-col cols="12" md="4">
          <h4 class="mb-4">VTimeInput</h4>

          <v-time-input v-bind="{ ...common, ...timeProps }" v-model="time1" label="Basic" />
          <v-chip :text="fmt(time1)" class="mb-6" size="small" />

          <v-time-input v-bind="{ ...common, ...timeProps }" v-model="time2" label="Office hours" max="17:30" min="09:00" />
          <v-chip :text="fmt(time2)" class="mb-6" size="small" />

          <v-time-input
            v-bind="{ ...common, ...timeProps }"
            v-model="time3"
            :allowed-minutes="m => m % 15 === 0"
            label="Quarters only"
            scrollable
          />
          <v-chip :text="fmt(time3)" class="mb-6" size="small" />

          <v-time-input v-bind="{ ...common, ...timeProps }" v-model="time4" label="Scrollable dial" scrollable />
          <v-chip :text="fmt(time4)" size="small" />
        </v-col>

        <v-col cols="12" md="4">
          <h4 class="mb-4">VDateTimeInput</h4>

          <v-date-time-input v-bind="{ ...common, ...dateTimeProps }" v-model="dt1" label="Basic" />
          <v-chip :text="fmt(dt1)" class="mb-6" size="small" />

          <v-date-time-input
            v-bind="{ ...common, ...dateTimeProps }"
            v-model="dt2"
            label="Min / max"
            max="2026-09-15"
            min="2026-08-01"
          />
          <v-chip :text="fmt(dt2)" class="mb-6" size="small" />

          <v-date-time-input
            v-bind="{ ...common, ...dateTimeProps }"
            v-model="dt3"
            :display-format="v => v.toString()"
            label="Custom display-format"
          />
          <v-chip :text="fmt(dt3)" class="mb-6" size="small" />

          <v-date-time-input
            v-bind="{ ...common, ...dateTimeProps }"
            v-model="dt4"
            :date-picker-props="{ showWeek: true }"
            label="Date picker passthrough"
            location="bottom end"
          />
          <v-chip :text="fmt(dt4)" size="small" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
  import { computed, shallowRef } from 'vue'

  const variants = ['outlined', 'filled', 'solo', 'underlined']
  const densities = ['default', 'comfortable', 'compact']
  const colors = ['primary', 'success', 'purple', '#fa0']
  const inputFormats = ['dd/mm/yyyy', 'mm/dd/yyyy', 'yyyy-mm-dd', 'dd.mm.yyyy']

  const variant = shallowRef('outlined')
  const density = shallowRef('default')
  const color = shallowRef('primary')
  const inputFormat = shallowRef('dd/mm/yyyy')
  const format = shallowRef('24hr')
  const timeInterval = shallowRef(30)
  const updateOn = shallowRef(['blur', 'enter'])
  const useSeconds = shallowRef(false)
  const openOnFocus = shallowRef(false)
  const hideActions = shallowRef(true)
  const clearable = shallowRef(true)
  const disabled = shallowRef(false)
  const readonly = shallowRef(false)

  const common = computed(() => ({
    variant: variant.value,
    density: density.value,
    color: color.value,
    updateOn: updateOn.value,
    openOnFocus: openOnFocus.value,
    hideActions: hideActions.value,
    clearable: clearable.value,
    disabled: disabled.value,
    readonly: readonly.value,
  }))
  const dateProps = computed(() => ({ inputFormat: inputFormat.value }))
  const timeProps = computed(() => ({ format: format.value, useSeconds: useSeconds.value }))
  const dateTimeProps = computed(() => ({ ...dateProps.value, ...timeProps.value, timeInterval: timeInterval.value }))

  const date1 = shallowRef(new Date(2026, 7, 19))
  const date2 = shallowRef([new Date(2026, 7, 19), new Date(2026, 7, 24)])
  const date3 = shallowRef([new Date(2026, 7, 19), new Date(2026, 7, 24)])
  const date4 = shallowRef(null)
  const time1 = shallowRef('14:30')
  const time2 = shallowRef(null)
  const time3 = shallowRef(null)
  const time4 = shallowRef(null)
  const dt1 = shallowRef(new Date(2026, 7, 19, 14, 30))
  const dt2 = shallowRef(null)
  const dt3 = shallowRef(null)
  const dt4 = shallowRef(null)

  function fmt (value) {
    if (value == null) return 'null'
    if (Array.isArray(value)) return value.length ? value.map(fmt).join(' | ') : '[]'
    return value instanceof Date ? value.toLocaleString() : String(value)
  }
</script>
