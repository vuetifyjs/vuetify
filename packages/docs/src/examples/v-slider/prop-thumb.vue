<template>
  <div class="d-flex flex-column">
    <div>
      <div class="text-caption">
        Show thumb when using slider
      </div>
      <v-slider
        v-model="slider1"
        thumb-label
      ></v-slider>
    </div>

    <div>
      <div class="text-caption">
        Always show thumb label
      </div>
      <v-slider
        v-model="slider2"
        thumb-label="always"
      ></v-slider>
    </div>

    <div>
      <div class="text-caption">
        Custom thumb size
      </div>
      <v-slider
        v-model="slider3"
        :thumb-size="36"
        thumb-label="always"
      ></v-slider>
    </div>

    <div>
      <div class="text-caption">
        Custom thumb label
      </div>
      <v-slider
        v-model="slider4"
        thumb-label="always"
      >
        <template v-slot:thumb-label="{ modelValue }">
          {{ satisfactionEmojis[Math.min(Math.floor(modelValue / 10), 9)] }}
        </template>
      </v-slider>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        slider1: 50,
        slider2: 50,
        slider3: 50,
        slider4: 50,
        satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😁', '😄', '😍'],
      }
    },
  }
</script>
