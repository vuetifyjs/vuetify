<template>
  <div>
    <div class="text-caption">Show ticks when using slider</div>

    <v-slider
      step="10"
      show-ticks
    ></v-slider>

    <div class="text-caption">Always show ticks</div>

    <v-slider
      show-ticks="always"
      step="10"
    ></v-slider>

    <div class="text-caption">Tick size</div>

    <v-slider
      show-ticks="always"
      step="10"
      tick-size="4"
    ></v-slider>

    <div class="text-caption">Tick labels</div>

    <v-slider
      :max="3"
      :ticks="tickLabels"
      show-ticks="always"
      step="1"
      tick-size="4"
    ></v-slider>
  </div>
</template>

<script setup>
  const tickLabels = {
    0: 'Figs',
    1: 'Lemon',
    2: 'Pear',
    3: 'Apple',
  }
</script>

<script>
  export default {
    data () {
      return {
        tickLabels: {
          0: 'Figs',
          1: 'Lemon',
          2: 'Pear',
          3: 'Apple',
        },
      }
    },
  }
</script>
