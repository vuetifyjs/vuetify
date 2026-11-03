<template>
  <div>
    <v-alert v-if="error" :text="error" type="error" variant="tonal"></v-alert>

    <v-card>
      <v-layout>
        <v-navigation-drawer location="end" width="240" permanent>
          <v-list
            v-model:selected="selected"
            density="compact"
            select-strategy="independent"
            selectable
          >
            <v-list-item
              v-for="region in regions"
              :key="region.id"
              :active="highlighted === region.id"
              :title="region.title"
              :value="region.id"
              @mouseenter="highlighted = region.id"
              @mouseleave="highlighted = null"
            >
              <template v-slot:prepend="{ isSelected }">
                <v-checkbox-btn :model-value="isSelected" class="mr-3 my-n2"></v-checkbox-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main>
          <v-map
            v-model="selected"
            v-model:highlighted="highlighted"
            :style="{
              '--v-map-hover-color': 'rgb(var(--v-theme-primary))',
              '--v-map-hover-opacity': .32,
            }"
            :svg="svg"
            label="German service coverage"
            multiple
            selectable
            @load="onLoad"
          >
            <v-chip
              class="position-absolute bottom-0 left-0"
              size="small"
              label
            >
              Map by&nbsp;<a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/germany" rel="noopener" target="_blank">SVG Maps</a>
              &nbsp;(<a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC BY 4.0</a>)
            </v-chip>
          </v-map>
        </v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef } from 'vue'

  const selected = shallowRef(['by', 'be'])
  const highlighted = shallowRef(null)
  const regions = shallowRef([])
  const svg = shallowRef()
  const error = shallowRef('')

  function onLoad (items) {
    regions.value = items.toSorted((a, b) => a.title.localeCompare(b.title))
  }

  onMounted(async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@svg-maps/germany@2.0.0/germany.svg')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      svg.value = await response.text()
    } catch {
      error.value = 'Could not load the map from jsDelivr.'
    }
  })
</script>
