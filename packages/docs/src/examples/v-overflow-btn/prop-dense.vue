<template>
  <v-container>
    <v-overflow-btn
      class="my-2"
      :items="items"
      label="Overflow Btn - Dense"
      dense
    ></v-overflow-btn>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ref(['Arial', 'Calibri', 'Courier', 'Verdana'])
</script>

<script>
  export default {
    data: () => ({
      items: ['Arial', 'Calibri', 'Courier', 'Verdana'],
    }),
  }
</script>
