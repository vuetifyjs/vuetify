<template>
  <v-container>
    <v-sheet class="mx-auto" height="280" width="200">
      <v-infinite-carousel direction="vertical" gap="12" auto-play>
        <v-chip v-for="item in items" :key="item" color="primary" block>
          {{ item }}
        </v-chip>
      </v-infinite-carousel>
    </v-sheet>
  </v-container>
</template>

<script setup>
  const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`)
</script>
