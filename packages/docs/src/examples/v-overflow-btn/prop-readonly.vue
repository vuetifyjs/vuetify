<template>
  <v-container id="dropdown-example-1">
    <v-overflow-btn
      :items="dropdownFont"
      class="my-2"
      label="Overflow Btn w/ readonly"
      target="#dropdown-example-1"
      readonly
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
