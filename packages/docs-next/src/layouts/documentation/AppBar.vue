<template>
  <v-app-bar
    id="default-app-bar"
    app
    clipped-left
    clipped-right
    color="white"
    flat
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawer = !drawer"
    />

    <v-btn
      icon
      @click="advanced = !advanced"
    >
      <v-icon v-text="aicon" />
    </v-btn>

    <vuetify-logo />

    <v-spacer />

    <v-btn
      :to="{
        name: 'Home',
        params: { locale }
      }"
      class="mx-4"
      color="primary"
      outlined
      min-width="212"
      min-height="48"
      x-large
      exact
    >
      Contribute

      <v-icon
        size="24"
        right
      >
        $mdiHomeCircleOutline
      </v-icon>
    </v-btn>

    <v-spacer />

    <div>
      <v-btn
        class="mx-3"
        color="#7289DA"
        href="https://discord.gg/HJXwxMy"
        icon
        rel="noopener"
        small
        target="_blank"
      >
        <v-icon>$mdiDiscord</v-icon>
      </v-btn>

      <v-btn
        class="mx-3"
        color="#24292E"
        href="https://github.com/vuetifyjs/vuetify"
        icon
        rel="noopener"
        small
        target="_blank"
      >
        <v-icon>$mdiGithub</v-icon>
      </v-btn>
    </div>

    <v-divider
      class="mx-4"
      vertical
    />

    <v-toolbar-items class="hidden-sm-and-down">
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
  import { get, sync } from 'vuex-pathify'

  // Language
  import locales from '@/i18n/locales'

  export default {
    name: 'DocumentationBar',

    data: () => ({ locales }),

    computed: {
      advanced: sync('user/drawer@advanced'),
      drawer: sync('app/drawer'),
      locale: get('route/params@locale'),
      translating: get('pages/translating'),
      aicon () {
        const icon = this.advanced ? 'Bool' : 'Alphabetical'

        return `$mdiOrder${icon}Ascending`
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

<style lang="sass">
  .theme--light,
  .theme--dark
    #default-app-bar
      border-width: 0 0 thin 0
      border-style: solid

      &.theme--light
        border-bottom-color: #0000001F !important

      &.theme--dark
        border-bottom-color: #FFFFFF1F !important
</style>
