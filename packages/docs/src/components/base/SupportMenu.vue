<template>
  <v-menu
    bottom
    left
    max-height="calc(100% - 16px)"
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on: menu }">
      <v-btn
        :aria-label="$t('Vuetify.AppToolbar.support')"
        class="hidden-md-and-down"
        text
        style="min-width: 48px"
        v-on="menu"
      >
        <base-nav-text class="hidden-sm-and-down">Vuetify.AppToolbar.support</base-nav-text>

        <v-icon
          class="hidden-sm-and-down"
          right
        >
          mdi-menu-down
        </v-icon>

        <v-icon class="hidden-md-and-up">mdi-comment-question</v-icon>
      </v-btn>
    </template>

    <v-list
      dense
      nav
    >
      <v-subheader v-text="$t('Vuetify.AppToolbar.getHelp')" />

      <base-item
        v-for="support in supports"
        :key="support.text"
        v-bind="support"
        no-markdown
        @click="$ga.event('toolbar', 'click', 'support', support.text)"
      />
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'BaseSupportMenu',

    data: vm => ({
      supports: [
        {
          to: 'professional-support/consulting',
          icon: 'mdi-vuetify',
          text: vm.$t('Vuetify.AppDrawer.consulting'),
        },
        {
          href: 'https://community.vuetifyjs.com',
          icon: 'mdi-discord',
          text: vm.$t('Vuetify.AppToolbar.community'),
        },
        {
          href: 'https://issues.vuetifyjs.com',
          icon: 'mdi-bug',
          text: vm.$t('Vuetify.AppToolbar.bug'),
        },
        {
          href: 'https://github.com/vuetifyjs/vuetify/issues',
          icon: 'mdi-github',
          text: vm.$t('Vuetify.AppToolbar.issues'),
        },
        {
          href: 'https://stackoverflow.com/search?q=vuetify',
          icon: 'mdi-stack-overflow',
          text: vm.$t('Vuetify.AppToolbar.stack'),
        },
      ],
    }),
  }
</script>
