<template>
  <v-container id="dropdown-example-1">
    <v-overflow-btn
      class="my-2"
      :items="dropdownFont"
      label="Overflow Btn w/ readonly"
      readonly
      target="#dropdown-example-1"
    ></v-overflow-btn>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const dropdownFont = ref(['Arial', 'Calibri', 'Courier', 'Verdana'])
</script>

<script>
  export default {
    data: () => ({
      dropdownFont: ['Arial', 'Calibri', 'Courier', 'Verdana'],
    }),
  }
</script>
