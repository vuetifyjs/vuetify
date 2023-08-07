<template>
  <v-stepper mobile>
    <v-stepper-header>
      <template v-for="(item, i) in items" :key="i">
        <v-divider v-if="i"></v-divider>

        <v-stepper-item v-bind="item"></v-stepper-item>
      </template>
    </v-stepper-header>
  </v-stepper>
</template>

<script setup>
  const items = Array.from({ length: 10 }).map((_, i) => ({
    title: `Step ${i + 1}`,
    subtitle: `Step ${i + 1} subtitle`,
    value: i + 1,
  }))
</script>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 10 }).map((_, i) => ({
        title: `Step ${i + 1}`,
        subtitle: `Step ${i + 1} subtitle`,
        value: i + 1,
      })),
    }),
  }
</script>
