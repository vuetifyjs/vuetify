<template>
  <v-row>
    <v-col class="pa-12">
      <v-range-slider
        :ticks="seasons"
        :model-value="[0, 1]"
        min="0"
        max="3"
        :step="1"
        show-ticks="always"
        thumb-label="always"
        tick-size="4"
      >
        <template v-slot:thumb-label="{ modelValue }">
          <v-icon theme="dark" :icon="season(modelValue)"></v-icon>
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

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
