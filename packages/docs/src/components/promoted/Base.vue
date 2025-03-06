<template>
  <v-lazy
    :min-height="minHeight"
    class="d-flex"
  >
    <v-sheet
      v-bind="$attrs"
      :min-height="minHeight"
      class="v-app-ad d-inline-flex flex-child-1 grow-shrink-0"
      color="surface-bright"
      width="100%"
      rounded
    >
      <slot />
    </v-sheet>
  </v-lazy>
</template>

<script setup>
  const props = defineProps({
    density: {
      type: String,
      default: 'default',
    },
    minHeight: [Number, String],
  })

  const minHeight = computed(() => {
    if (props.minHeight) return props.minHeight
    if (props.density === 'compact') return 56
    if (props.density === 'comfortable') return 74

    return 118
  })
</script>

<script>
  export default {
    inheritAttrs: false,
  }
</script>

<style lang="sass">
  .v-app-ad
    a
      text-decoration: none

    .v-markdown p
      margin-bottom: 0
</style>
