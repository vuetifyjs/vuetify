<template>
  <div>
    <div class="text-caption">Show ticks when using slider</div>

    <v-slider
      step="10"
      show-ticks
    ></v-slider>

    <div class="text-caption">Always show ticks</div>

    <v-slider
      step="10"
      show-ticks="always"
    ></v-slider>

    <div class="text-caption">Tick size</div>

    <v-slider
      step="10"
      show-ticks="always"
      tick-size="4"
    ></v-slider>

    <div class="text-caption">Tick labels</div>

    <v-slider
      :ticks="tickLabels"
      :max="3"
      step="1"
      show-ticks="always"
      tick-size="4"
    ></v-slider>
  </div>
</template>

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
