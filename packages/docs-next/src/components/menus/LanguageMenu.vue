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
        @click="switchLocale(item.locale)"
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
      translating: get('pages/translating'),
      current () {
        return this.locales.find(l => l.locale === this.locale) || {}
      },
      items () {
        return [
          { heading: 'Translations' },
          ...this.locales,
        ]
      },
    },

    methods: {
      async switchLocale (locale) {
        if (this.$i18n.locale === locale) return

        const to = this.$router.resolve({ params: { locale } })

        // If we're moving to or from crowdin language, we should
        // refresh so that jipt script can be loaded or unloaded
        if (
          this.translating ||
          locale === 'eo-UY'
        ) setTimeout(() => this.$router.go(), 250)

        await this.$router.replace(to.location)
      },
    },
  }
</script>
