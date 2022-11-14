<template>
  <v-col cols="4">
    <v-card
      :image="`https://cdn.vuetifyjs.com/docs/images/components-temp/${name}.png`"
      :to="rpath(`/components/${name}`)"
      class="mb-3"
      elevation="0"
      height="164"
    />

    <h2 class="text-h6">
      <span class="text-capitalize">{{ name }}</span>
    </h2>

    <slot />
  </v-col>
</template>

<script setup lang="ts">
  // Utilities
  import { rpath } from '@/util/routes'

  defineProps({
    name: String,
  })
</script>
