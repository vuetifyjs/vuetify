<template>
  <div class="text-xs-center">
    <v-pagination v-bind:length.number="15" v-model="page"></v-pagination>
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