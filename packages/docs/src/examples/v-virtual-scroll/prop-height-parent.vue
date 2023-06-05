<template>
  <div style="display: flex; height: 200px;">
    <v-virtual-scroll :items="items">
      <template v-slot:default="{ item }">
        Virtual Item {{ item }}
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ref(Array.from({ length: 1000 }, (k, v) => v + 1))
</script>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 1000 }, (k, v) => v + 1),
    }),
  }
</script>
