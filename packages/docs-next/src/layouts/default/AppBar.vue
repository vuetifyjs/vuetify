<template>
  <v-app-bar
    app
    clipped-right
  >
    <v-toolbar-title>Application</v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
          >
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
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  // Language
  import locales from '@/i18n/locales'

  export default {
    name: 'DefaultBar',

    data: () => ({ locales }),

    computed: {
      translating: get('i18n/translating'),
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
