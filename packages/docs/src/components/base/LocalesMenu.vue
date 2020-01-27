<template>
  <v-menu
    v-model="menu"
    max-height="calc(100% - 16px)"
    offset-y
    right
    top
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        :aria-label="$t('Vuetify.AppToolbar.translations')"
        class="text--secondary text-capitalize mr-3"
        rounded
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          mdi-{{ currentLanguage.locale === 'eo-UY' ? 'web' : 'translate' }}
        </v-icon>

        {{ currentLanguage.name }}

        <v-icon right>mdi-menu-{{ menu ? 'up' : 'down' }}</v-icon>
      </v-btn>
    </template>

    <v-list
      class="px-0 py-1"
      dense
      nav
    >
      <template v-for="(language, i) in languages">
        <v-list-item
          :key="language.locale"
          @click="translateI18n(language)"
        >
          <v-list-item-title v-text="language.name" />
        </v-list-item>

        <v-divider
          v-if="i === languages.length - 2"
          :key="`divider-${i}`"
          class="mb-1"
        />
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  // Utilities
  import languages from '@/data/i18n/languages.json'

  export default {
    name: 'BaseLocalesMenu',

    data: () => ({
      languages,
      menu: false,
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

        if (typeof document !== 'undefined') {
          document.cookie = `currentLanguage=${lang};path=/;max-age=${60 * 60 * 24 * 7}` // expires in 7 days
        }
      },
    },
  }
</script>
