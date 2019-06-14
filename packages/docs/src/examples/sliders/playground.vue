<template>
  <v-layout
    row
    wrap
    justify-space-around
  >
    <v-flex xs12>
      <v-slider
        v-model="min"
        min="-100"
        max="100"
        label="Min"
      ></v-slider>
    </v-flex>
    <v-flex xs12>
      <v-slider
        v-model="max"
        min="-100"
        max="100"
        label="Max"
      ></v-slider>
    </v-flex>
    <v-switch v-model="disabled" class="ma-2" label="Disabled"></v-switch>
    <v-switch v-model="readonly" class="ma-2" label="Readonly"></v-switch>
    <v-switch v-model="vertical" class="ma-2" label="Vertical"></v-switch>
    <v-switch v-model="range" class="ma-2" label="Range"></v-switch>
    <v-flex xs12>
      <v-slider
        v-model="volume"
        v-if="!range"
        append-icon="volume_up"
        prepend-icon="volume_down"
        :min="min"
        :max="max"
        :disabled="disabled"
        :readonly="readonly"
        :vertical="vertical"
        label="Volume"
      ></v-slider>
      <v-range-slider
        v-else
        append-icon="volume_up"
        prepend-icon="volume_down"
        :min="min"
        :max="max"
        :disabled="disabled"
        :readonly="readonly"
        :vertical="vertical"
        label="Volume"
      ></v-range-slider>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        volume: 10,
        min: 0,
        max: 100,
        disabled: false,
        readonly: false,
        vertical: false,
        range: false,
      }
    },
  }
</script>
