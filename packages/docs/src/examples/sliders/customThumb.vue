<template>
  <v-layout>
    <v-flex pa-5>
      <v-range-slider
        :tick-labels="seasons"
        :value="[0, 1]"
        always-dirty
        min="0"
        max="3"
        thumb-label
        thumb-size="64"
        ticks="always"
      >
        <template v-slot:thumb-label="props">
          <span>
            {{ season(props.value) }}
          </span>
        </template>
      </v-range-slider>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      seasons: [
        'Winter',
        'Spring',
        'Summer',
        'Fall'
      ]
    }),

    methods: {
      season (val) {
        return this.seasons[val]
      }
    }
  }
</script>
