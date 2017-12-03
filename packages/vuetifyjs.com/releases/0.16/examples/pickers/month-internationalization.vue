<template>
  <v-layout justify-space-between wrap>
    <v-flex xs12 sm6 md4>
      <v-date-picker
        type="month"
        locale="zh-cn"
        v-model="picker"
      ></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 md4>
      <v-date-picker
        type="month"
        locale="sv-se"
        v-model="picker"
      ></v-date-picker>
    </v-flex>
    <v-flex xs12 sm6 md4>
      <v-date-picker
        type="month"
        locale="th"
        v-model="picker"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        picker: null
      }
    }
  }
</script>
