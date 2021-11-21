<template>
  <v-btn
    :icon="smAndDown"
    class="text--secondary px-0 px-md-2"
    variant="text"
  >
    <v-icon icon="mdi-translate" />
    <chevron-down />

    <app-menu
      key="language-menu"
      activator="parent"
      :items="items"
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

<script lang="ts">
  // Utilities
  import { computed, defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify'
  import { useRoute, useRouter } from 'vue-router'

  // Language
  import locales from '@/i18n/locales.json'
  import { useLocaleStore } from '@/store-v3/locale'

  import AppMenu from '@/components-v3/app/menu/index.vue'
  import ChevronDown from '@/components-v3/icons/ChevronDown.vue'

  export default defineComponent({
    name: 'LanguageMenu',

    components: { ChevronDown, AppMenu },

    setup () {
      const { t } = useI18n()
      const display = useDisplay()
      const localeStore = useLocaleStore()
      const router = useRouter()
      const route = useRoute()

      return {
        smAndDown: display.smAndDown,
        items: computed(() => ([
          { heading: t('translations') },
          ...locales.filter((locale: { enabled: boolean }) => locale.enabled),
        ])),
        changeLocale: (locale: string) => {
          console.log('click', locale)
          localeStore.locale = locale
          console.log(route.path)
          router.push({ path: route.path.replace(/^\/[a-zA-Z-]+/, `/${locale}`) })
        },
      }
    },
  })
</script>
