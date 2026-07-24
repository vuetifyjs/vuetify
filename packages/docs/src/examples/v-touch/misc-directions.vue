<template>
  <v-sheet
    class="d-flex align-center justify-center bg-grey-lighten-2"
    height="300"
    style="touch-action: none"
    v-touch="{
      up: () => direction = 'Up',
      right: () => direction = 'Right',
    }"
  >
    <div class="text-center">
      <div class="text-caption">Only up and right are handled</div>
      <div class="text-h6">{{ direction }}</div>
    </div>
  </v-sheet>
</template>

<script setup>
  import { ref } from 'vue'

  const direction = ref('Swipe up or right')
</script>
