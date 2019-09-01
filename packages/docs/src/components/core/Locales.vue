<template>
  <v-menu
    bottom
    left
    offset-y
    max-height="calc(100% - 16px)"
  >
    <template #activator="{ on: menu }">
      <v-btn
        :aria-label="$t('Vuetify.AppToolbar.translations')"
        text
        style="min-width: 48px"
        v-on="menu"
      >
        <v-icon v-if="currentLanguage.locale === 'eo-UY'">mdi-web</v-icon>
        <v-img
          v-else
          :src="`https://cdn.vuetifyjs.com/images/flags/${currentLanguage.country}.png`"
          width="26px"
        />
      </v-btn>
    </template>
    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="language in languages"
        :key="language.locale"
        @click="translateI18n(language)"
      >
        <v-list-item-avatar
          tile
          size="24px"
        >
          <v-icon v-if="language.locale === 'eo-UY'">mdi-web</v-icon>
          <v-img
            v-else
            :src="`https://cdn.vuetifyjs.com/images/flags/${language.country}.png`"
            width="24px"
          />
        </v-list-item-avatar>
        <v-list-item-title v-text="language.name" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  // Utilities
  import languages from '@/data/i18n/languages.json'

  export default {
    data: () => ({
      languages,
    }),

    computed: {
      currentLanguage () {
        const locale = this.$i18n.locale
        return this.languages.find(l => l.alternate === locale || l.locale === locale)
      },
    },

    methods: {
      translateI18n (lang) {
        lang = lang.alternate || lang.locale
        // If we're switching in or out of translating
        // then we need to force a reload to make sure
        // that crowdin script is loaded (or unloaded)
        if (lang === 'eo-UY' || this.$i18n.locale === 'eo-UY') {
          setTimeout(() => {
            this.$router.go()
          }, 1000)
        }

        this.$router.replace({ params: { lang } })
        document.cookie = `currentLanguage=${lang};path=/;max-age=${60 * 60 * 24 * 7}` // expires in 7 days
      },
    },
  }
</script>
