<template>
  <v-menu
    origin="top right"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        class="text--secondary mr-n2"
        text
        v-on="on"
      >
        <span
          class="mr-2 hidden-sm-and-down"
          v-text="current.name"
        />

        <v-icon>$mdiTranslate</v-icon>
      </v-btn>
    </template>

    <v-list>
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
    name: 'DefaultLanguageMenu',

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
