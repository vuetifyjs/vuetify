<template>
  <v-sheet
    :color="isDark ? '#1F1F1F' : 'grey-lighten-4'"
    :min-height="minHeight"
    :theme="isDark ? 'dark' : 'light'"
    class="v-app-ad d-inline-flex flex-child-1 grow-shrink-0"
    rounded
    width="100%"
  >
    <slot />
  </v-sheet>
</template>

<script setup>
  // Composables
  import { useTheme } from 'vuetify'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed } from 'vue'

  const props = defineProps({
    compact: Boolean,
    comfortable: Boolean,
    minHeight: [Number, String],
  })

  const user = useUserStore()
  const theme = useTheme()

  const minHeight = computed(() => {
    if (props.minHeight) return props.minHeight
    if (props.compact) return 52
    if (props.comfortable) return 74

    return 118
  })

  const isDark = computed(() => {
    return user.mixedTheme || theme.current.value.dark
  })
</script>

<style lang="sass">
  .v-app-ad
    a
      text-decoration: none

    .v-markdown p
      margin-bottom: 0
</style>
