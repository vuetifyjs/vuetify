<template>
  <div class="v-bg position-absolute top-0 right-0 left-0 bottom-0">
    <div
      :class="{
        [`bg-${props.color || defaultColor}`]: true,
        'opacity-20': !props.removeOpacity,
      }"
      aria-hidden="true"
      class="overflow-hidden w-100 h-100"
    />
  </div>
</template>

<script setup>
  const theme = useTheme()

  const props = defineProps({
    color: {
      type: String,
    },
    removeOpacity: {
      type: Boolean,
      default: false,
    },
  })

  const defaultColor = computed(() => {
    return theme.current.value.dark ? 'grey-darken-3' : 'blue-grey-lighten-3'
  })
</script>

<style scoped>
  .v-bg {
    filter: blur(100px);
    pointer-events: none;
  }

  .v-bg > div {
    background: rgb(var(--v-theme-primary));
    z-index: -10;
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 40%,
      0% 40%
    )
  }
</style>
