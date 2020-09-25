
<template>
  <div class="text-center">
    <v-slider
      v-model="model"
      :max="rounded.length - 1"
      :tick-labels="rounded"
    ></v-slider>

    <div class="py-3"></div>

    <v-sheet
      :class="radius"
      :max-width="model === 6 ? 128 : 256"
      class="mx-auto transition-swing secondary"
      elevation="12"
      height="128"
      width="100%"
    ></v-sheet>

    <div class="py-3"></div>

    <code class="text-subtitle-1">.{{ radius }}</code>
  </div>
</template>

<script>
  export default {
    data: () => ({
      model: 3,
      rounded: [
        '0',
        'xs',
        'md',
        'lg',
        'xl',
        'pill',
        'circle',
      ],
    }),

    computed: {
      radius () {
        let rounded = 'rounded'
        const value = this.rounded[this.model]

        if (value !== 'md') {
          rounded += `-${value}`
        }

        return rounded
      },
    },
  }
</script>
