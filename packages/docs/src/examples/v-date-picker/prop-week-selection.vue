<template>
  <v-container class="d-flex align-start ga-12 justify-center flex-wrap">
    <v-date-picker
      v-model="dates"
      color="primary"
      multiple="week"
      show-adjacent-months
      show-week
    ></v-date-picker>
    <div>
      <v-date-input
        v-model="dates"
        color="primary"
        label="Week"
        multiple="week"
        width="300"
      ></v-date-input>
      <pre>{{ dates }}</pre>
    </div>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const dates = ref([])
</script>

<script>
  export default {
    data: () => ({
      dates: [],
    }),
  }
</script>
