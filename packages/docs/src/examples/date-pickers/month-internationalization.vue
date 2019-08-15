<template>
  <v-row justify="space-between">
    <v-col cols="12" sm="6" class="my-4">
      <v-date-picker
        v-model="picker"
        type="month"
        locale="th"
      ></v-date-picker>
    </v-col>
    <v-col cols="12" sm="6" class="my-4">
      <v-date-picker
        v-model="picker"
        type="month"
        locale="sv-se"
      ></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 7),
      }
    },
  }
</script>
