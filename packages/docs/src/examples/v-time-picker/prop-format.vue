<template>
  <v-row justify="center">
    <v-col>
      <v-time-picker
        v-model="e7"
        format="24hr"
      ></v-time-picker>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        e7: null,
      }
    },
  }
</script>
