<template>
  <figure>
    <v-img
      class="rounded bg-surface"
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
