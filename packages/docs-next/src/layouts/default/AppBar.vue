<template>
  <v-app-bar
    id="default-app-bar"
    :color="dark ? undefined : 'white'"
    app
    class="v-bar--underline"
    flat
    v-bind="{ [`clipped-${rtl ? 'left' : 'right'}`]: true }"
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawer = !drawer"
    />

    <default-search />

    <v-btn
      href="https://discord.gg/HJXwxMy"
      icon
      rel="noopener"
      target="_blank"
    >
      <v-icon>$mdiDiscord</v-icon>
    </v-btn>

    <v-btn
      href="https://github.com/vuetifyjs/docs-next"
      icon
      rel="noopener"
      target="_blank"
    >
      <v-icon>$mdiGithub</v-icon>
    </v-btn>

    <v-menu
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="text--secondary"
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
  </v-app-bar>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'

  // Language
  import locales from '@/i18n/locales'

  export default {
    name: 'DefaultBar',

    components: {
      DefaultSearch: () => import('@/layouts/default/Search'),
    },

    data: () => ({ locales }),

    computed: {
      ...sync('user', [
        'theme@dark',
        'rtl',
      ]),
      drawer: sync('app/drawer'),
      locale: get('route/params@locale'),
      translating: get('pages/translating'),

      current () {
        return this.locales.find(l => l.locale === this.locale) || {}
      },
    },

    watch: {
      rtl (val) {
        this.$vuetify.rtl = val
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
