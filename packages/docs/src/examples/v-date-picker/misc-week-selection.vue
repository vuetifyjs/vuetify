<template>
  <v-container>
    <v-row justify="space-around">
      <div>
        <v-date-picker
          v-model="dates"
          color="primary"
          multiple="week"
          title="Week selection"
          show-adjacent-months
          show-week
        ></v-date-picker>
        <div class="mt-3 d-flex justify-center">
          <v-btn :disabled="!dates.length" @click="dates = []">Clear</v-btn>
        </div>
      </div>
    </v-row>
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
