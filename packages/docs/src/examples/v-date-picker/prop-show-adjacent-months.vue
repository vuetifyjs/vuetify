<template>
  <v-date-picker
    v-model="picker"
    show-adjacent-months
  ></v-date-picker>
</template>

<script setup>
  import { ref } from 'vue'

  const picker = ref(null)
</script>

<script>
  export default {
    data () {
      return {
        picker: null,
      }
    },
  }
</script>
