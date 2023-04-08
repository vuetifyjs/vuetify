<template>
  <app-menu
    key="language-menu"
    :close-on-content-click="false"
    :open-on-hover="false"
    :items="items"
  >
    <template #activator="{ props }">
      <app-tooltip-btn
        color="medium-emphasis"
        icon="mdi-translate"
        path="languages"
        v-bind="props"
      />
    </template>
  </app-menu>
</template>

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  // Utilities
  import { computed } from 'vue'

  // Language
  import locales from '@/i18n/locales.json'

  const { t } = useI18n()
  const route = useRoute()

  const items = computed(() => ([
    { subheader: t('translations') },
    ...locales.filter(locale => locale.enabled).map(locale => {
      return {
        title: locale.title,
        to: route.fullPath.replace(/^\/[a-zA-Z-]+/, `/${locale.alternate || locale.locale}`),
      }
    }),
    { title: t('more-coming-soon'), disabled: true },
  ]))
</script>
