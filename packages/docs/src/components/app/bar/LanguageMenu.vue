<template>
  <AppMenuMenu
    key="language-menu"
    :items="items"
    :open-on-hover="false"
  >
    <template #activator="{ props }">
      <AppBtn
        color="medium-emphasis"
        icon="mdi-translate"
        v-bind="props"
      />
    </template>
  </AppMenuMenu>
</template>

<script setup lang="ts">
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
