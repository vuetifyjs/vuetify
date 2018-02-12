<template>
  <v-footer>
    <v-container
      fluid
      fill-height
      py-0
    >
      <v-layout align-center>
        <v-flex shrink>
          &copy; {{ (new Date()).getFullYear() }} — Vuetify, LLC
        </v-flex>
        <v-flex
          grey--text
          text--lighten-1
          title
          mx-3
          shrink
        >
          &nbsp;|&nbsp;
        </v-flex>
        <template v-for="(social, i) in socials">
          <a
            class="d-inline-flex align-center"
            rel="noopener"
            target="_blank"
            :href="social.href"
            :key="social.href"
          >
            <v-icon
              class="mr-1"
              size="22px"
              v-text="social.icon"
            />
            <span
              v-text="social.text"
              v-if="$vuetify.breakpoint.mdAndUp"
            />
          </a>
          <v-flex
            grey--text
            text--lighten-1
            title
            mx-2
            shrink
            :key="i"
            v-if="i !== socials.length - 1"
          >
            &nbsp;-&nbsp;
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      socials: [
        {
          href: 'https://github.com/vuetifyjs/vuetify',
          icon: 'mdi-github-circle',
          text: 'Github'
        },
        {
          href: 'https://twitter.com/vuetifyjs',
          icon: 'mdi-twitter-circle',
          text: 'Twitter'
        },
        {
          href: 'https://www.facebook.com/vuetifyjs',
          icon: 'mdi-facebook-box',
          text: 'Facebook'
        },
        {
          href: 'https://medium.com/vuetify',
          icon: 'mdi-medium',
          text: 'Medium'
        }
      ]
    })
  }
</script>

<style lang="stylus" scoped>
  a
    color: rgba(0,0,0,0.54)
    text-decoration: none

    &:hover i,
    &:hover
      color: #1867C0 !important
</style>
