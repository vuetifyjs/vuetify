<template>
  <v-btn
    :icon="display.smAndDown"
    class="px-0 px-md-2 font-weight-regular"
    color="medium-emphasis"
    variant="text"
  >
    <v-icon
      icon="mdi-translate"
      size="24"
    />

    <chevron-down />

    <app-menu
      key="language-menu"
      :items="items"
      activator="parent"
    >
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
  </v-btn>
</template>

<script lang="ts" setup>
  // Components
  import AppMenu from '@/components/app/menu/Menu.vue'
  import ChevronDown from '@/components/icons/ChevronDown.vue'

  // Composables
  import { useDisplay } from 'vuetify'
  import { useI18n } from 'vue-i18n'
  import { useLocaleStore } from '@/store/locale'
  import { useRoute, useRouter } from 'vue-router'

  // Utilities
  import { computed } from 'vue'

  // Language
  import locales from '@/i18n/locales.json'

  const { t } = useI18n()
  const display = useDisplay()
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
