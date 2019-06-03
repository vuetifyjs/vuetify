<template>
  <v-container>
    <v-layout column>
      <main-header>Sparklines</main-header>

      <core-title>
        Basic
      </core-title>
      <core-section>
        <v-sparkline
          :value="value"
          auto-draw
        />
      </core-section>

      <core-title>
        Gradient
      </core-title>
      <core-section>
        <v-sparkline
          :value="value"
          :gradient="['#00c6ff', '#F0F', '#FF0']"
          smooth="10"
          line-width="5"
          padding="8"
          stroke-linecap="round"
          auto-draw
        />
      </core-section>

      <core-title>
        With labels
      </core-title>
      <core-section>
        <v-sparkline
          :labels="labels"
          :value="value"
          color="red"
          line-width="2"
          padding="16"
          smooth="5"
        />
      </core-section>
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
        '15',
      ],
    }),
  }
</script>
