<template>
  <v-row justify="space-between">
    <v-col cols="12" sm="6" class="my-4">
      <v-date-picker
        v-model="picker"
        :first-day-of-week="0"
        locale="zh-cn"
      ></v-date-picker>
    </v-col>
    <v-col cols="12" sm="6" class="my-4">
      <v-date-picker
        v-model="picker"
        :first-day-of-week="1"
        locale="sv-se"
      ></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
      }
    },
  }
</script>
