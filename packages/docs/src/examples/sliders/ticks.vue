<template>
  <v-card flat color="transparent">
    <v-subheader>Show ticks when using slider</v-subheader>

    <v-card-text>
      <v-slider
        v-model="value"
        step="10"
        ticks
      ></v-slider>
    </v-card-text>

    <v-subheader>Always show ticks</v-subheader>

    <v-card-text>
      <v-slider
        v-model="value"
        step="10"
        ticks="always"
      ></v-slider>
    </v-card-text>

    <v-subheader>Tick size</v-subheader>

    <v-card-text>
      <v-slider
        v-model="value"
        step="10"
        ticks="always"
        tick-size="2"
      ></v-slider>
    </v-card-text>

    <v-subheader>Tick labels</v-subheader>

    <v-card-text>
      <v-slider
        v-model="fruits"
        :tick-labels="ticksLabels"
        :max="3"
        step="1"
        ticks="always"
        tick-size="2"
      ></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        value: 0,
        fruits: 0,
        ticksLabels: [
          'Figs',
          'Lemon',
          'Pear',
          'Apple'
        ]
      }
    }
  }
</script>
