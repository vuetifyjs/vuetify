<template>
  <div class="text-xs-center">
    <v-pagination :length="15" v-model="page" :total-visible="7"></v-pagination>
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
