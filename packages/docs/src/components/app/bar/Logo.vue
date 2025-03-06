<template>
  <router-link
    :to="rpath(locale.value)"
    class="d-inline-block ms-4 me-2"
  >
    <v-img
      :key="logo"
      :alt="`Vuetify ${t('logo')}`"
      :src="`https://cdn.vuetifyjs.com/docs/images/logos/${logo}`"
      :transition="false"
      :width="lgAndUp ? 148 : 34"
      class="shrink"
    />
  </router-link>
</template>

<script setup>
  defineProps({
    alt: Boolean,
  })

  const { lgAndUp } = useDisplay()
  const { locale, t } = useI18n()
  const theme = useTheme()

  const logo = computed(() => {
    const file = `${theme.current.value.dark ? 'dark' : 'light'}.svg`
    const logo = 'vuetify-logo-v3-slim'

    return `${logo}-${lgAndUp.value ? 'text-' : ''}${file}`
  })
</script>
