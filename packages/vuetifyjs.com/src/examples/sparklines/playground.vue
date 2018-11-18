<template>
  <v-container fluid>
    <v-sparkline
      :data="data"
      :type="type"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      auto-draw
    ></v-sparkline>
    <v-divider></v-divider>
    <v-layout wrap>
      <v-flex xs6>
        <v-layout fill-height align-center>
          <v-item-group v-model="gradient" mandatory>
            <v-layout>
              <v-item v-for="(gradient, i) in gradients" :key="i" :value="gradient">
                <v-card
                  slot-scope="{ active, toggle }"
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
        <v-slider
          v-model="width"
          label="Width"
          min="0.1"
          max="50"
          step="0.1"
          thumb-label
        ></v-slider>
      </v-flex>
      <v-flex xs6>
        <v-layout fill-height align-center>
          <v-btn-toggle v-model="lineCap">
            <v-btn flat value="butt">butt</v-btn>
            <v-btn flat value="round">round</v-btn>
            <v-btn flat value="square">square</v-btn>
          </v-btn-toggle>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-slider
          v-model="radius"
          label="Radius"
          min="0"
          max="25"
          thumb-label
        ></v-slider>
      </v-flex>
      <v-flex xs6>
        <v-radio-group v-model="type" label="Type" row>
          <v-radio value="trend" label="Trend"></v-radio>
          <v-radio value="bar" label="Bar"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs6>
        <v-slider
          v-model="padding"
          label="Padding"
          min="0"
          max="25"
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
    ['#f72047', '#ffd200', '#1feaea']
  ]

  export default {
    data: () => ({
      type: 'trend',
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      data: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradients
    })
  }
</script>
