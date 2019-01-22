<template>
  <v-container>
    <v-layout column>
      <main-header>Sparklines</main-header>

      <h3 class="title grey--text mb-4 mt-5 center">
        Basic
      </h3>
      <v-flex>
        <v-sparkline
          :value="value"
          auto-draw
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Gradient
      </h3>
      <v-flex>
        <v-sparkline
          :value="value"
          :gradient="['#00c6ff', '#F0F', '#FF0']"
          smooth="10"
          line-width="5"
          padding="8"
          stroke-linecap="round"
          auto-draw
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        With labels
      </h3>
      <v-flex>
        <v-sparkline
          :labels="labels"
          :value="value"
          color="red"
          line-width="2"
          padding="16"
          smooth="5"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Sparklines',

    data: () => ({
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      labels: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15'
      ]
    })
  }
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
