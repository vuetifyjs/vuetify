<template>
  <app-sheet class="mb-4">
    <vue-file :file="`${name}/usage`" />
  </app-sheet>
</template>

<script setup>
  defineProps({
    name: String,
  })
</script>
