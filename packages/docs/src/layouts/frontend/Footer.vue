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
            src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
            width="64px"
          />
        </v-col>

        <v-col cols="12">
          <a
            v-for="(social, i) in socials"
            :key="i"
            :href="social.href"
            :title="social.title"
            :aria-label="social.title"
            class="ma-4 d-inline-block"
            target="_blank"
            rel="noopener"
          >
            <v-icon
              dark
              v-text="social.icon"
            />
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
                color="secondary"
                flat
                label="Email Address"
                name="member[email]"
                rounded
                solo
                type="email"
              >
                <template v-slot:append>
                  <v-btn
                    color="secondary"
                    name="member[subscribe]"
                    type="submit"
                    value="Subscribe"
                  >
                    Subscribe
                  </v-btn>
                </template>
              </v-text-field>
            </v-form>
          </v-responsive>

          <div class="text-center caption">
            Subscribe to our <strong>monthly</strong> Newsletter
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
          Released under the&nbsp;
          <a
            href="https://opensource.org/licenses/MIT"
            class="grey--text text--lighten-1"
            rel="noopener"
            target="_blank"
          >
            MIT License
          </a>

          <br>

          <div class="mb-4">
            Copyright &copy; 2016-{{ (new Date()).getFullYear() }} Vuetify, LLC
          </div>

          <a
            class="grey--text text--lighten-1"
            href="https://www.iubenda.com/privacy-policy/76325752"
            rel="noopener"
            target="_blank"
          >
            Privacy Policy
          </a>

          &nbsp;•&nbsp;

          <a
            class="grey--text text--lighten-1"
            href="https://www.iubenda.com/privacy-policy/76325752/cookie-policy"
            rel="noopener"
            target="_blank"
          >
            Cookie Policy
          </a>

          &nbsp;•&nbsp;

          <a
            class="grey--text text--lighten-1"
            href="mailto:john@vuetifyjs.com"
            rel="noopener"
            target="_blank"
          >
            Contact Us
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'FrontendFooter',

    data: () => ({
      email: '',
      socials: [
        {
          icon: 'mdi-reddit',
          href: 'https://www.reddit.com/r/vuetifyjs',
          title: 'Reddit',
        },
        {
          icon: 'mdi-medium',
          href: 'https://medium.com/vuetify',
          title: 'Medium',
        },
        {
          icon: 'mdi-github',
          href: 'https://github.com/vuetifyjs/vuetify',
          title: 'Github',
        },
        {
          icon: 'mdi-twitter',
          href: 'https://twitter.com/vuetifyjs',
          title: 'Twitter',
        },
        {
          icon: 'mdi-discord',
          href: 'https://community.vuetifyjs.com',
          title: 'Discord Community',
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
