<template>
  <v-container fluid class="text-xs-center">
    <v-btn
      id="attachbtn"
      @click="show = !show"
    >Toggle attached</v-btn>
    <v-tooltip
      v-model="show"
      attach="#attachbtn"
      content-class="btnTooltip"
    >
      <span>Hello?</span>
    </v-tooltip>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show: false
      }
    }
  }
</script>

<style>
  .btnTooltip{
    top: 40px !important;
    left: 0 !important;
  }
</style>
