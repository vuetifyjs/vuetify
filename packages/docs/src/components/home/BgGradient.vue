<template>
  <div class="v-bg position-absolute top-0 right-0 left-0 bottom-0">
    <div
      :class="{
        [`bg-${props.color}`]: true
      }"
      aria-hidden="true"
      class="overflow-hidden opacity-20 w-100 h-100"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    color: {
      type: String,
      default: 'primary',
    },
  })
</script>

<style scoped>
  .v-bg {
    filter: blur(100px);
    opacity: 80%;
    pointer-events: none;
  }

  .v-bg > div {
    background: rgb(var(--v-theme-primary));
    z-index: -10;
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 40%,
      0% 70%
    )
  }
</style>
