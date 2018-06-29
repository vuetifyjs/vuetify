<template>
  <div class="text-xs-center">
    <v-pagination :length="4" v-model="page" circle></v-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1
      }
    }
  }
</script>
