<template>
  <v-menu
    attach
    bottom
    left
    offset-y
  >
    <v-btn
      slot="activator"
      :aria-label="$t('Vuetify.AppToolbar.translations')"
      flat
      style="min-width: 48px"
    >
      <v-icon v-if="currentLanguage.locale === 'eo-UY'">language</v-icon>
      <v-img
        v-else
        :src="`https://cdn.vuetifyjs.com/images/flags/${currentLanguage.country}.png`"
        width="26px"
      />
    </v-btn>
    <v-list
      dense
      light
    >
      <v-list-tile
        v-for="language in languages"
        :key="language.locale"
        avatar
        @click="translateI18n(language)"
      >
        <v-list-tile-avatar
          tile
          size="24px"
        >
          <v-icon v-if="language.locale === 'eo-UY'">language</v-icon>
          <v-img
            v-else
            :src="`https://cdn.vuetifyjs.com/images/flags/${language.country}.png`"
            width="24px"
          />
        </v-list-tile-avatar>
        <v-list-tile-title v-text="language.name" />
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  // Utilities
  import languages from '@/data/i18n/languages.json'

  export default {
    data: () => ({
      languages
    }),

    computed: {
      currentLanguage () {
        const locale = this.$i18n.locale
        return this.languages.find(l => l.alternate === locale || l.locale === locale)
      }
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
      }
    }
  }
</script>
