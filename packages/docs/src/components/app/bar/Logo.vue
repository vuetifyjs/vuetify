<template>
  <router-link
    :to="rpath(locale.value)"
    class="d-inline-block ms-4 me-2"
  >
    <v-img
      :key="logo"
      :alt="t('logo')"
      :src="`https://cdn.vuetifyjs.com/docs/images/logos/${logo}`"
      :width="lgAndUp ? 148 : 34"
      class="shrink"
      :transition="false"
    />
  </router-link>
</template>

<script setup>
  // Composables
  import { useDisplay, useTheme } from 'vuetify'
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed } from 'vue'
  import { rpath } from '@/util/routes'

  defineProps({
    alt: Boolean,
  })

  const { lgAndUp } = useDisplay()
  const { locale, t } = useI18n()
  const theme = useTheme()

  const logo = computed(() => {
    const file = `${theme.name.value}.svg`
    const logo = 'vuetify-logo-v3-slim'

    return `${logo}-${lgAndUp.value ? 'text-' : ''}${file}`
  })
</script>
