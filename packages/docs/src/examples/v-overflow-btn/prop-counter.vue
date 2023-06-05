<template>
  <v-container id="dropdown-example-3">
    <v-overflow-btn
      class="my-2"
      :items="dropdownEdit"
      label="Overflow Btn w/ counter"
      counter
      item-value="text"
    ></v-overflow-btn>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const dropdownEdit = ref([
    { text: '100%' },
    { text: '75%' },
    { text: '50%' },
    { text: '25%' },
    { text: '0%' },
  ])
</script>

<script>
  export default {
    data: () => ({
      dropdownEdit: [
        { text: '100%' },
        { text: '75%' },
        { text: '50%' },
        { text: '25%' },
        { text: '0%' },
      ],
    }),
  }
</script>
