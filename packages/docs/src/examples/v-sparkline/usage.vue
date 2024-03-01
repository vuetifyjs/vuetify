<template>
  <v-sparkline
    :auto-line-width="autoLineWidth"
    :fill="fill"
    :gradient="gradient"
    :gradient-direction="gradientDirection"
    :line-width="width"
    :model-value="value"
    :padding="padding"
    :smooth="radius || false"
    :stroke-linecap="lineCap"
    :type="type"
    auto-draw
  ></v-sparkline>
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
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
  }
</script>
