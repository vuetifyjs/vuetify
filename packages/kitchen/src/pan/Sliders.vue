<template>
  <v-container>
    <v-layout column>
      <v-layout v-for="i in 2" :key="`basic_${i}`">
        <!-- Basic -->
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Basic
          </h3>
          <v-layout row align-center>
            <v-slider v-model="basic" :vertical="i === 2" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Disabled
          </h3>
          <v-layout row align-center>
            <v-slider v-model="disabled" disabled :vertical="i === 2" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Read only
          </h3>
          <v-layout row align-center>
            <v-slider v-model="disabled" readonly :vertical="i === 2" />
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Labels -->
      <v-layout v-for="i in 2" :key="`labels_${i}`">
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Label
          </h3>
          <v-layout row align-center>
            <v-slider v-model="label" label="Label" :vertical="i === 2" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Inverse label
          </h3>
          <v-layout row align-center>
            <v-slider v-model="label" label="Label" inverse-label :vertical="i === 2" />
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Icons -->
      <v-layout v-for="i in 2" :key="`icons_${i}`">
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Icons
          </h3>
          <v-layout row align-center>
            <v-slider v-model="volume" prepend-icon="mdi-volume-low" append-icon="mdi-volume-high" :vertical="i === 2" />
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Colors -->
      <v-layout v-for="i in 2" :key="`colors_${i}`">
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Colors
          </h3>
          <v-layout row align-center>
            <v-slider
              v-model="color"
              color="red"
              track-color="green"
              thumb-color="purple"
              background-color="white"
              :vertical="i === 2"
            />
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Min/max -->
      <v-layout v-for="i in 2" :key="`minmax_${i}`">
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Min/max ({{ minmax }})
          </h3>
          <v-layout row align-center>
            <v-slider v-model="minmax" :min="-50" :max="50" :vertical="i === 2" />
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Steps (and ticks) -->
      <v-layout v-for="i in 2" :key="`steps_${i}`">
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Steps
          </h3>
          <v-layout row align-center>
            <v-slider v-model="step" :step="10" :vertical="i === 2" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Steps and ticks on move
          </h3>
          <v-layout row align-center>
            <v-slider v-model="step" :step="10" ticks :vertical="i === 2" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Steps and always ticks
          </h3>
          <v-layout row align-center>
            <v-slider v-model="step" :step="10" ticks="always" :vertical="i === 2" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Tick size
          </h3>
          <v-layout row align-center>
            <v-slider v-model="step" :step="10" ticks="always" tick-size="4" :vertical="i === 2" />
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Thumb and tick label -->
      <v-layout v-for="i in 2" :key="`thumbs_${i}`">
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Thumb label on move
          </h3>
          <v-layout row align-center>
            <v-slider v-model="thumb" thumb-label :vertical="i === 2" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Thumb label always
          </h3>
          <v-layout row align-center>
            <v-slider v-model="thumb" thumb-label="always" :vertical="i === 2" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Thumb label size
          </h3>
          <v-layout row align-center>
            <v-slider v-model="thumb" thumb-label="always" :thumb-size="64" :vertical="i === 2" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Tick labels
          </h3>
          <v-layout row align-center>
            <v-slider v-model="tick" :max="3" :tick-labels="labels" :vertical="i === 2" />
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Validation -->
      <v-layout v-for="i in 2" :key="`validation_${i}`">
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Validation
          </h3>
          <v-layout row align-center>
            <v-slider v-model="valid" :rules="rules" :vertical="i === 2" />
          </v-layout>
        </v-flex>
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Validation with thumb-label
          </h3>
          <v-layout row align-center>
            <v-slider v-model="valid" :rules="rules" thumb-label="always" :vertical="i === 2" />
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Range -->
      <v-layout v-for="i in 2" :key="`range_${i}`">
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Basic range
          </h3>
          <v-layout row align-center>
            <v-range-slider v-model="basicRange" :vertical="i === 2" />
          </v-layout>
        </v-flex>
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Disabled range
          </h3>
          <v-layout row align-center>
            <v-range-slider v-model="basicRangeDisabled" disabled :vertical="i === 2" />
          </v-layout>
        </v-flex>
        <v-flex>
          <h3 v-if="i === 1" class="title grey--text mb-4 mt-5 center">
            Disabled range
          </h3>
          <v-layout row align-center>
            <v-range-slider v-model="basicRangeDisabled" readonly :vertical="i === 2" />
          </v-layout>
        </v-flex>
      </v-layout>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Sliders',

    data: () => ({
      basic: 0,
      disabled: 20,
      label: 0,
      volume: 0,
      color: 0,
      minmax: 0,
      step: 0,
      thumb: 0,
      tick: 0,
      labels: ['spring', 'summer', 'fall', 'winter'],
      valid: 0,
      rules: [
        v => v < 20 || 'Value too big!',
      ],
      basicRange: [0, 20],
      basicRangeDisabled: [10, 40],
    }),
  }
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
