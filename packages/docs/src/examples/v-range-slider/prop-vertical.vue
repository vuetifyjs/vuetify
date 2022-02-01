<template>
  <v-range-slider
    v-model="value"
    direction="vertical"
  ></v-range-slider>
</template>

<script>
  export default {
    data () {
      return {
        value: [20, 40],
      }
    },
  }
</script>
