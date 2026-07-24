<template>
  <v-sheet
    class="d-flex align-center justify-center bg-grey-lighten-2"
    height="300"
    style="touch-action: none"
    v-touch="{
      options: { once: true },
      left: () => capture('Left'),
      right: () => capture('Right'),
      up: () => capture('Up'),
      down: () => capture('Down'),
    }"
  >
    <div class="text-center">
      <div class="text-caption">The listener detaches after the first swipe</div>
      <div class="text-h6">{{ result }}</div>
    </div>
  </v-sheet>
</template>

<script setup>
  import { ref } from 'vue'

  const result = ref('Swipe once')

  function capture (direction) {
    result.value = `${direction} — no more swipes will register`
  }
</script>
