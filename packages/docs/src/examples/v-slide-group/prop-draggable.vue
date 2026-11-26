<template>
  <v-sheet
    class="mx-auto"
    elevation="3"
    max-width="800"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      gap="16"
      scroll-snap="start"
      draggable
    >
      <v-slide-group-item
        v-for="n in 15"
        :key="n"
        v-slot="{ isSelected, toggle }"
      >
        <v-card
          :color="isSelected ? 'primary' : undefined"
          :style="isSelected ? undefined : `background: oklch(0.72 ${(n - 1) * (0.2 / 14)} 40)`"
          height="100"
          width="100"
          @click="toggle"
        >
          <div class="d-flex fill-height align-center justify-center text-h5">{{ n }}</div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef()
</script>
