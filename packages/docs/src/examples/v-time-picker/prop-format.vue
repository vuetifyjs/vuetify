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

<script setup>
  import { ref } from 'vue'

  const e7 = ref(null)
</script>

<script>
  export default {
    data () {
      return {
        e7: null,
      }
    },
  }
</script>
