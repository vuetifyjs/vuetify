<template>
  <v-menu
    bottom
    left
    offset-y
    max-height="calc(100% - 16px)"
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        :aria-label="$t('Vuetify.AppToolbar.translations')"
        class="text-capitalize"
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon :left="$vuetify.breakpoint.mdAndUp">
          mdi-{{ currentLanguage.locale === 'eo-UY' ? 'web' : 'translate' }}
        </v-icon>

        <span
          class="subtitle-1 text-capitalize font-weight-light hidden-sm-and-down"
          v-text="currentLanguage.name"
        />

        <v-icon
          class="hidden-sm-and-down"
          right
        >
          mdi-menu-down
        </v-icon>
      </v-btn>
    </template>

    <v-list
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
