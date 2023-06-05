<template>
  <v-container id="dropdown-example-2">
    <v-overflow-btn
      class="my-2"
      :items="dropdown_icon"
      label="Overflow Btn w/ segmented"
      segmented
      target="#dropdown-example-2"
    ></v-overflow-btn>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const dropdown_icon = ref([
    { text: 'list', callback: () => console.log('list') },
    { text: 'favorite', callback: () => console.log('favorite') },
    { text: 'delete', callback: () => console.log('delete') },
  ])
</script>

<script>
  export default {
    data: () => ({
      dropdown_icon: [
        { text: 'list', callback: () => console.log('list') },
        { text: 'favorite', callback: () => console.log('favorite') },
        { text: 'delete', callback: () => console.log('delete') },
      ],
    }),
  }
</script>
