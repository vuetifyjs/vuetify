<template>
  <v-empty-state
    icon="mdi-magnify"
    text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
    subtitle="We couldn't find a match."
  ></v-empty-state>
</template>

<script setup>
  import { ref } from 'vue'
</script>
