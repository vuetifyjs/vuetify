<template>
  <div class="text-xs-center">
    <v-pagination :length="4" v-model="page" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
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
