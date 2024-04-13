<template>
  <v-img
    :height="size"
    :src="`https://cdn.vuetifyjs.com/docs/images/logos/${logo}`"
    :width="size"
    alt="Vuetify Logo"
    class="mx-auto"
    max-width="100%"
  />
</template>

<script setup>
  defineProps({
    size: String,
  })

  const theme = useTheme()

  const logo = computed(() => {
    return `vuetify-logo-${theme.current.value.dark ? 'dark' : 'light'}-atom.svg`
  })
</script>
