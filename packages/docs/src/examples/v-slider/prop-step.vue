<template>
  <v-slider
    v-model="value"
    :min="0"
    :max="1"
    :step="0.2"
    thumb-label
  ></v-slider>
</template>

<script>
  export default {
    data () {
      return {
        value: 0,
      }
    },
  }
</script>
