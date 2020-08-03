<template>
  <v-menu
    key="language-menu"
    content-class="elevation-0 rounded"
    max-height="500"
    offset-y
    open-on-hover
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

    <v-list
      class="rounded"
      dense
      outlined
    >
      <v-list-item
        v-for="(item, index) in locales"
        :key="index"
        @click="switchLocale(item.locale)"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
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
