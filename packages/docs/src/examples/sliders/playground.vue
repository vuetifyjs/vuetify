<template>
  <v-row

    justify="space-around"
  >
    <v-col cols="12">
      <v-slider
        v-model="min"
        min="-100"
        max="100"
        label="Min"
      ></v-slider>
    </v-col>
    <v-col cols="12">
      <v-slider
        v-model="max"
        min="-100"
        max="100"
        label="Max"
      ></v-slider>
    </v-col>
    <v-switch v-model="disabled" class="ma-2" label="Disabled"></v-switch>
    <v-switch v-model="readonly" class="ma-2" label="Readonly"></v-switch>
    <v-switch v-model="vertical" class="ma-2" label="Vertical"></v-switch>
    <v-switch v-model="range" class="ma-2" label="Range"></v-switch>
    <v-col cols="12">
      <v-slider
        v-if="!range"
        v-model="volume"
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
    </v-col>
  </v-row>
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
