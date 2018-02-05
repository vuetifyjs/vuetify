<template>
  <v-layout justify-space-between wrap>
    <v-flex xs12 sm6 class="my-3">
      <v-date-picker
        :first-day-of-week="0"
        locale="zh-cn"
        v-model="picker"
      ></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 class="my-3">
      <v-date-picker
        :first-day-of-week="1"
        locale="sv-se"
        v-model="picker"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        picker: null
      }
    }
  }
</script>
