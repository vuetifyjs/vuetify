<template>
  <div>
    <v-progress-linear
      v-model="value"
      color="primary"
      height="10"
      variant="split"
      clickable
      rounded
    ></v-progress-linear>

    <br>

    <v-progress-linear
      v-model="value"
      buffer-value="80"
      color="purple"
      height="10"
      variant="split"
      clickable
      rounded
    ></v-progress-linear>

    <br>

    <v-progress-linear
      color="teal"
      height="10"
      variant="split"
      indeterminate
      rounded
    ></v-progress-linear>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const value = shallowRef(40)
</script>

<script>
  export default {
    data () {
      return {
        value: 40,
      }
    },
  }
</script>
