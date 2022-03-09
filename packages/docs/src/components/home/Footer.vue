<template>
  <v-footer
    id="footer"
    class="d-block py-6"
    color="grey darken-4"
    theme="dark"
  >
    <v-container class="text-center">
      <v-row>
        <v-col cols="12">
          <v-img
            class="mx-auto"
            contain
            height="64px"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-light.svg"
            width="64px"
          />
        </v-col>

        <v-col cols="12">
          <a
            v-for="(social, i) in socials"
            :key="i"
            :aria-label="social.title"
            :href="social.href"
            :title="t(social.title)"
            class="ma-3 d-inline-block"
            rel="noopener"
            target="_blank"
          >
            <v-icon color="white" :icon="social.icon" />
          </a>
        </v-col>

        <v-col cols="12">
          <v-responsive
            class="mx-auto"
            max-width="400"
          >
          <!--
            <v-form
              action="https://www.getrevue.co/profile/vuetify/add_subscriber"
              method="post"
              name="revue-form"
              target="_blank"
            >
              <v-text-field
                id="member_email"
                v-model="email"
                :label="t('email-address')"
                background-color="grey darken-3"
                flat
                name="member[email]"
                rounded
                solo
                type="email"
              >
                <template #append>
                  <v-btn
                    color="secondary"
                    name="member[subscribe]"
                    type="submit"
                    value="Subscribe"
                  >
                    {{ t('subscribe') }}
                  </v-btn>
                </template>
              </v-text-field>
            </v-form>
          -->
          </v-responsive>

          <div class="text-center text-caption">
            {{ t('subscribe-to-our') }}
            <strong>{{ t('newsletter') }}</strong>
          </div>
        </v-col>

        <v-col cols="12">
          <v-responsive
            class="mx-auto"
            max-width="70%"
            width="150px"
          >
            <v-divider />
          </v-responsive>
        </v-col>

        <v-col cols="12">
          <div>
            {{ t('released-under-the') }}
            &nbsp;
            <a
              class="text-grey-lighten-1"
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
              class="text-grey-lighten-1"
              :href="link.href"
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

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'Footer',

    setup () {
      const { t } = useI18n()

      // data
      const email = ''
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

      return {
        email,
        links,
        socials,
        t,
      }
    },

  })
</script>
