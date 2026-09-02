<template>
  <v-container class="pb-12 position-relative">
    <v-infinite-carousel shift-distance="20%" auto-play show-arrows>
      <template v-slot:prev="{ props }">
        <v-icon-btn
          v-bind="props"
          class="position-absolute"
          color="primary"
          icon="$arrowleft"
          icon-size="16"
          rounded="sm"
          size="24"
          style="bottom: -40px; right: 40px"
          variant="elevated"
        ></v-icon-btn>
      </template>

      <template v-slot:next="{ props }">
        <v-icon-btn
          v-bind="props"
          class="position-absolute"
          color="primary"
          icon="$arrowright"
          icon-size="16"
          rounded="sm"
          size="24"
          style="bottom: -40px; right: 10px"
          variant="elevated"
        ></v-icon-btn>
      </template>

      <v-chip v-for="item in items" :key="item" color="primary">{{ item }}</v-chip>
    </v-infinite-carousel>
  </v-container>
</template>

<script setup>
  const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`)
</script>
