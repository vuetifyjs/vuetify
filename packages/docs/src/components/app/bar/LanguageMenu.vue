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

    <template #item="{ item }">
      <v-list-item
        :key="item.locale"
        link
        @click="changeLocale(item.locale)"
      >
        <v-list-item-title v-text="item.title" />
      </v-list-item>
    </template>
  </app-menu>
</template>

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useLocaleStore } from '@/store/locale'
  import { useRoute, useRouter } from 'vue-router'

  // Utilities
  import { computed } from 'vue'

  // Language
  import locales from '@/i18n/locales.json'

  const { t } = useI18n()
  const localeStore = useLocaleStore()
  const router = useRouter()
  const route = useRoute()

  const items = computed(() => ([
    { subheader: t('translations') },
    ...locales.filter((locale: { enabled: boolean }) => locale.enabled),
  ]))

  function changeLocale (locale: string) {
    localeStore.locale = locale
    router.push({ path: route.path.replace(/^\/[a-zA-Z-]+/, `/${locale}`) })
  }
</script>
