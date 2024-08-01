<template>
  <v-row>
    <v-col class="pa-12">
      <v-range-slider
        :model-value="[0, 1]"
        :step="1"
        :ticks="seasons"
        max="3"
        min="0"
        show-ticks="always"
        thumb-label="always"
        tick-size="4"
      >
        <template v-slot:thumb-label="{ modelValue }">
          <v-icon :icon="season(modelValue)" theme="dark"></v-icon>
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const seasons = ref({
    0: 'Winter',
    1: 'Spring',
    2: 'Summer',
    3: 'Fall',
  })
  const icons = ref([
    'i-mdi:snowflake',
    'i-mdi:leaf',
    'i-mdi:fire',
    'i-mdi:water',
  ])
  function season (val) {
    return icons.value[val]
  }
</script>

<script>
  export default {
    data: () => ({
      seasons: {
        0: 'Winter',
        1: 'Spring',
        2: 'Summer',
        3: 'Fall',
      },
      icons: [
        'i-mdi:snowflake',
        'i-mdi:leaf',
        'i-mdi:fire',
        'i-mdi:water',
      ],
    }),

    methods: {
      season (val) {
        return this.icons[val]
      },
    },
  }
</script>
