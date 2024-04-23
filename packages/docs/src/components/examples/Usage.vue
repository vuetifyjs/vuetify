<template>
  <AppSheet class="mb-4">
    <ExamplesVueFile :file="`${name}/usage`" />
  </AppSheet>
</template>

<script setup>
  defineProps({
    name: String,
  })
</script>
