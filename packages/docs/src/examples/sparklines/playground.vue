<template>
  <v-container fluid>
    <v-sparkline
      :value="value"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="lineWidth"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      :fill="fill"
      :type="type"
      :auto-line-width="autoLineWidth"
      auto-draw
      :show-labels="showLabels"
      :label-size="labelSize"
    ></v-sparkline>

    <v-divider></v-divider>

    <v-layout wrap>
      <v-flex xs12>
        <v-layout fill-height align-center>
          <v-subheader class="pl-0">Type</v-subheader>
          <v-btn-toggle v-model="type" mandatory>
            <v-btn small text value="bar">bar</v-btn>
            <v-btn small text value="trend">trend</v-btn>
          </v-btn-toggle>
        </v-layout>
      </v-flex>

      <v-flex xs6>
        <v-layout fill-height align-center>
          <v-subheader class="pl-0">Gradient</v-subheader>
          <v-item-group v-model="gradient" mandatory>
            <v-layout>
              <v-item
                v-for="(gradient, i) in gradients"
                :key="i"
                v-slot:default="{ active, toggle }"
                :value="gradient"
              >
                <v-card
                  :style="{
                    background: gradient.length > 1
                      ? `linear-gradient(0deg, ${gradient})`
                      : gradient[0],
                    border: '2px solid',
                    borderColor: active ? '#222' : 'white'
                  }"
                  width="30"
                  height="30"
                  class="mr-2"
                  @click.native="toggle"
                ></v-card>
              </v-item>
            </v-layout>
          </v-item-group>
        </v-layout>
      </v-flex>

      <v-flex xs6>
        <v-layout fill-height align-center>
          <v-subheader class="pl-0">Gradient direction</v-subheader>
          <v-btn-toggle v-model="gradientDirection" mandatory>
            <v-btn small text value="top">top</v-btn>
            <v-btn small text value="right">right</v-btn>
            <v-btn small text value="left">left</v-btn>
            <v-btn small text value="bottom">bottom</v-btn>
          </v-btn-toggle>
        </v-layout>
      </v-flex>

      <v-flex xs12>
        <v-slider
          v-model="lineWidth"
          label="Line width"
          min="0.1"
          max="10"
          step="0.1"
          thumb-label
          :disabled="autoLineWidth"
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-slider
          v-model="radius"
          label="Radius"
          min="0"
          max="16"
          thumb-label
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-slider
          v-model="padding"
          label="Padding"
          min="0"
          max="16"
          thumb-label
        ></v-slider>
      </v-flex>

      <v-flex xs6>
        <v-layout fill-height align-center>
          <v-subheader class="pl-0">Linecap</v-subheader>
          <v-btn-toggle v-model="lineCap" mandatory :disabled="type !== 'trend'">
            <v-btn small text value="butt">butt</v-btn>
            <v-btn small text value="round">round</v-btn>
            <v-btn small text value="square">square</v-btn>
          </v-btn-toggle>
        </v-layout>
      </v-flex>

      <v-flex xs6>
        <v-layout row wrap justify-space-around>
          <v-switch v-model="showLabels" label="Show labels"></v-switch>
          <v-switch v-model="fill" label="Fill" :disabled="type !== 'trend'"></v-switch>
          <v-switch v-model="autoLineWidth" label="Auto-line-width" :disabled="type !== 'bar'"></v-switch>
        </v-layout>
      </v-flex>

      <v-flex xs12 v-if="showLabels">
        <v-slider
          v-model="labelSize"
          label="Label size"
          min="1"
          max="20"
          thumb-label
        ></v-slider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

  export default {
    data: () => ({
      showLabels: false,
      lineWidth: 2,
      labelSize: 7,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, -4, -10, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
  }
</script>
