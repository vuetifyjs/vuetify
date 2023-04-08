<template>
  <v-col
    cols="12"
    md="6"
    lg="4"
  >
    <v-card
      :image="image"
      :to="rpath(`/components/${src}/`)"
      class="mb-3"
      elevation="0"
      height="164"
    />

    <h2 class="text-h6">
      <span class="text-capitalize">{{ name?.replace(/-/g, ' ') }}</span>
    </h2>

    <slot />
  </v-col>
</template>

<script setup lang="ts">
  // Utilities
  import { computed } from 'vue'
  import { rpath } from '@/util/routes'

  const props = defineProps({
    name: String,
    src: String,
    placeholder: Boolean,
  })

  const image = computed(() => {
    if (props.placeholder) return 'https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png'

    return `https://cdn.vuetifyjs.com/docs/images/preview/${props.src}.png`
  })
</script>
