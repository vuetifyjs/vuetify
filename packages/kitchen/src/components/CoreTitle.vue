<template>
  <v-flex align-self-center>
    <h3 class="title grey--text mb-4 mt-5 center"><slot>Title</slot></h3>
  </v-flex>
</template>

<script>
  export default {
    name: 'CoreTitle'
  }
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
