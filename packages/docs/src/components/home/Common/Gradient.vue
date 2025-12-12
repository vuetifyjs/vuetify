<template>
  <div class="v-bg position-absolute top-0 right-0 left-0 bottom-0">
    <div
      :class="{
        [`bg-${props.color || defaultColor}`]: true,
        [props.opacityClass]: true,
      }"
      :style="{ clipPath }"
      aria-hidden="true"
      class="overflow-hidden w-100 h-100"
    />
  </div>
</template>

<script setup lang="ts">
  type Position = 'top' | 'bottom' | 'center'

  const theme = useTheme()

  const props = defineProps({
    color: String,
    opacityClass: {
      type: String,
      default: 'opacity-20',
    },
    position: {
      type: String as PropType<Position>,
      default: 'top',
    },
  })

  const defaultColor = computed(() => {
    return theme.current.value.dark ? 'grey-darken-3' : 'blue-grey-lighten-3'
  })

  const clipPath = computed(() => {
    const paths: Record<Position, string> = {
      top: 'polygon(0% 0%, 100% 0%, 100% 40%, 0% 40%)',
      bottom: 'polygon(0% 60%, 100% 60%, 100% 100%, 0% 100%)',
      center: 'polygon(0% 35%, 100% 35%, 100% 65%, 0% 65%)',
    }
    return paths[props.position]
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
  }
</style>
