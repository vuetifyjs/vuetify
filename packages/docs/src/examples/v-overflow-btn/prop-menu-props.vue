<template>
  <v-container id="dropdown-example-1">
    <v-overflow-btn
      class="my-2"
      :items="dropdown_font"
      menu-props="top"
      label="Overflow Btn w/ menu-props"
      target="#dropdown-example-1"
    ></v-overflow-btn>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const dropdown_font = ref(['Arial', 'Calibri', 'Courier', 'Verdana'])
</script>

<script>
  export default {
    data: () => ({
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
    }),
  }
</script>
