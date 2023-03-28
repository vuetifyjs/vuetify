
<template>
  <v-slider
    v-model="value"
    direction="vertical"
    label="Regular"
  ></v-slider>
</template>

<script>
  export default {
    data () {
      return {
        value: 10,
      }
    },
  }
</script>
