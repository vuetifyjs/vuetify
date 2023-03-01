<template>
  <v-footer
    id="footer"
    class="d-block py-6"
    theme="dark"
  >
    <v-container class="text-center">
      <v-row>
        <v-col cols="12">
          <v-img
            class="mx-auto"
            contain
            height="64"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-light.svg"
            width="64"
          />
        </v-col>

        <v-col cols="12" class="pb-0">
          <a
            v-for="(social, i) in socials"
            :key="i"
            :aria-label="social.title"
            :href="social.href"
            :title="t(social.title)"
            class="ma-3 d-inline-block text-decoration-none"
            rel="noopener"
            target="_blank"
          >
            <v-icon :icon="social.icon" color="white" />
          </a>
        </v-col>

        <v-col cols="12">
          <v-responsive
            class="mx-auto"
            max-width="70%"
            width="150"
          >
            <v-divider />
          </v-responsive>
        </v-col>

        <v-col cols="12">
          <div>
            {{ t('released-under-the') }}
            <a
              class="text-medium-emphasis text-decoration-underline"
              href="https://opensource.org/licenses/MIT"
              path="mit-license"
              rel="noopener"
              target="_blank"
            >{{ t('mit-license') }}</a>
          </div>

          <div class="mb-4">
            {{ t('copyright') }} &copy; 2016-{{ (new Date()).getFullYear() }} {{ t('vuetify') }}
          </div>

          <template v-for="(link, i) in links" :key="i">
            <a
              :href="link.href"
              class="text-medium-emphasis"
              rel="noopener"
              target="_blank"
            >{{ t(link.path) }}</a>

            <template v-if="i !== links.length - 1">&nbsp;•&nbsp;</template>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const links = [
    {
      href: 'https://www.iubenda.com/privacy-policy/76325752',
      path: 'privacy-policy',
    },
    {
      href: 'https://www.iubenda.com/privacy-policy/76325752/cookie-policy',
      path: 'cookie-policy',
    },
    {
      href: 'mailto:support@vuetifyjs.com',
      path: 'contact-us',
    },
  ]
  const socials = [
    {
      icon: 'mdi-reddit',
      href: 'https://www.reddit.com/r/vuetifyjs',
      title: 'reddit',
    },
    {
      icon: 'mdi-github',
      href: 'https://github.com/vuetifyjs/vuetify',
      title: 'github',
    },
    {
      icon: 'mdi-twitter',
      href: 'https://twitter.com/vuetifyjs',
      title: 'twitter',
    },
    {
      icon: 'mdi-discord',
      href: 'https://community.vuetifyjs.com',
      title: 'discord',
    },
  ]
</script>
