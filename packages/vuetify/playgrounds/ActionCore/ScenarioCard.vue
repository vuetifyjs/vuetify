<template>
  <v-card class="my-3 pa-3 scenario-card" outlined elevation="2">
    <v-card-title class="text-subtitle-1 font-weight-medium pb-1">{{ title }}</v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.scenario-card {
  border-left: 4px solid var(--v-primary-base, #1976D2);
}
.v-card-title {
  color: var(--v-primary-darken-1, #1565C0);
}
</style>
