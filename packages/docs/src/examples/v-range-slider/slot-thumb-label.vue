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
    'mdi-snowflake',
    'mdi-leaf',
    'mdi-fire',
    'mdi-water',
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
        'mdi-snowflake',
        'mdi-leaf',
        'mdi-fire',
        'mdi-water',
      ],
    }),

    methods: {
      season (val) {
        return this.icons[val]
      },
    },
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2073-37216&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
