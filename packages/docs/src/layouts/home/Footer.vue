<template>
  <v-footer
    id="footer"
    class="d-block py-6"
    color="grey darken-4"
    dark
  >
    <v-container class="text-center">
      <v-row>
        <v-col cols="12">
          <v-img
            class="mx-auto"
            contain
            height="64px"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-dark.svg"
            width="64px"
          />
        </v-col>

        <v-col cols="12">
          <a
            v-for="(social, i) in socials"
            :key="i"
            :aria-label="social.title"
            :href="social.href"
            :title="$t(social.title)"
            class="ma-3 d-inline-block"
            rel="noopener"
            target="_blank"
          >
            <v-icon v-text="social.icon" />
          </a>
        </v-col>

        <v-col cols="12">
          <v-responsive
            class="mx-auto"
            max-width="400"
          >
            <v-form
              action="https://www.getrevue.co/profile/vuetify/add_subscriber"
              method="post"
              name="revue-form"
              target="_blank"
            >
              <v-text-field
                id="member_email"
                v-model="email"
                :label="$t('email-address')"
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
                    {{ $t('subscribe') }}
                  </v-btn>
                </template>
              </v-text-field>
            </v-form>
          </v-responsive>

          <div class="text-center caption">
            <i18n path="subscribe-to-our">
              <strong>{{ $t('newsletter') }}</strong>
            </i18n>
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
          <i18n path="released-under-the">
            &nbsp;
            <i18n
              class="grey--text text--lighten-1"
              href="https://opensource.org/licenses/MIT"
              path="mit-license"
              rel="noopener"
              tag="a"
              target="_blank"
            />
          </i18n>

          <br>

          <div class="mb-4">
            <i18n path="copyright">
              &copy; 2016-{{ (new Date()).getFullYear() }}

              {{ $t('vuetify') }}
            </i18n>
          </div>

          <template v-for="(link, i) in links">
            <i18n
              :key="i"
              v-bind="link"
              class="grey--text text--lighten-1"
              rel="noopener"
              tag="a"
              target="_blank"
            />
            <template v-if="i !== links.length - 1">&nbsp;•&nbsp;</template>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'HomeFooter',

    data: () => ({
      email: '',
      links: [
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
      ],
      socials: [
        {
          icon: '$mdiReddit',
          href: 'https://www.reddit.com/r/vuetifyjs',
          title: 'reddit',
        },
        {
          icon: '$mdiGithub',
          href: 'https://github.com/vuetifyjs/vuetify',
          title: 'github',
        },
        {
          icon: '$mdiTwitter',
          href: 'https://twitter.com/vuetifyjs',
          title: 'twitter',
        },
        {
          icon: '$mdiDiscord',
          href: 'https://community.vuetifyjs.com',
          title: 'discord',
        },
      ],
    }),
  }
</script>

<style lang="sass">
  #footer
    a
      opacity: .8
      text-decoration: none
      &:hover
        color: #FFF
        opacity: 1

    .v-text-field--rounded
      .v-input__slot
        padding-right: 0 !important

      .v-btn
        border-radius: 0 28px 28px 0
        box-shadow: none
        height: 48px
        padding-top: 2px
</style>
