<template>
  <v-progress-linear v-model="valueDeterminate"></v-progress-linear>
</template>

<script>
  export default {
    data () {
      return {
        valueDeterminate: 50
      }
    }
  }
</script>
