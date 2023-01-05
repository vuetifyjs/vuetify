<template>
  <figure
    :class="[
      caption ? 'mb-6' : 'mb-10'
    ]"
  >
    <v-img
      class="rounded"
      v-bind="$attrs"
    />

    <figcaption
      v-if="caption"
      class="text-caption font-weight-bold text-center text-capitalize text-medium-emphasis"
      v-text="caption"
    />

    <slot v-else />
  </figure>
</template>

<script setup>
  // Utilities
  import { computed, useAttrs } from 'vue'

  const attrs = useAttrs()

  defineProps({
    name: String,
  })

  const caption = computed(() => attrs.title === 'null' ? null : attrs.title)
</script>

<script>
  export default {
    inheritAttrs: false,
  }
</script>
