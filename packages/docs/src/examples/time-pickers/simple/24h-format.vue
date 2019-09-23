<template>
  <v-row justify="space-around">
    <v-col class="lg-offset8" md="12" lg="4">
      <v-time-picker v-model="e7" format="24hr"></v-time-picker>
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
