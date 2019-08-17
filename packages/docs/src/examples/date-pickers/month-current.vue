<template>
  <v-row>
    <v-col cols="12" sm="6" class="my-4">
      <v-date-picker v-model="month1" :show-current="false" type="month"></v-date-picker>
    </v-col>
    <v-col cols="12" sm="6" class="my-4">
      <v-date-picker v-model="month2" type="month" show-current="2013-07"></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        month1: new Date().toISOString().substr(0, 7),
        month2: '2013-09',
      }
    },
  }
</script>
