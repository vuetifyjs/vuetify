<template>
  <app-headline
    :path="path"
    color="grey"
    size="caption"
    weight="regular"
  />
</template>

<script setup>
  defineProps({
    path: {
      type: String,
      required: true,
    },
  })
</script>
