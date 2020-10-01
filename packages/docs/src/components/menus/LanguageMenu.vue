<template>
  <app-menu
    key="language-menu"
    :items="items"
  >
    <template #activator="{ attrs, on }">
      <v-btn
        :icon="$vuetify.breakpoint.smAndDown"
        class="text--secondary px-0 px-md-2"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>$mdiTranslate</v-icon>

        <app-chevron-down />
      </v-btn>
    </template>

    <template #item="{ index, item }">
      <v-list-item
        :key="index"
        class="v-list-item--default"
        :to="{ params: { locale: item.alternate || item.locale } }"
        replace
      >
        <v-list-item-title v-text="item.title" />
      </v-list-item>
    </template>
  </app-menu>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  // Language
  import locales from '@/i18n/locales'

  export default {
    name: 'LanguageMenu',

    data: () => ({ locales }),

    computed: {
      locale: get('route/params@locale'),
      items () {
        return [
          { heading: this.$t('translations') },
          ...this.locales,
        ]
      },
    },

    watch: {
      locale (val, oldVal) {
        if ([val, oldVal].includes('eo-UY') && val !== oldVal) {
          location.reload()
        } else {
          window.localStorage.setItem('currentLanguage', val)
        }
      },
    },
  }
</script>
