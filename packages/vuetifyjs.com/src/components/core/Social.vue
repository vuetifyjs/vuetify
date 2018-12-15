<template>
  <v-layout align-center>
    <a
      v-for="(social, i) in socials"
      :key="i"
      :href="social.href"
      class="mx-2"
      rel="noopener"
      target="_blank"
    >
      <v-hover>
        <v-icon
          slot-scope="{ hover }"
          :color="!hover ? 'rgba(255, 255, 255, 0.7)' : 'white'"
          size="20"
          v-text="social.icon"
        />
      </v-hover>
    </a>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      socials: [
        {
          href: 'https://github.com/vuetifyjs/vuetify',
          text: 'GitHub',
          icon: 'mdi-github-circle'
        },
        {
          href: 'https://twitter.com/vuetifyjs',
          text: 'Twitter',
          icon: 'mdi-twitter-circle'
        },
        {
          href: 'https://community.vuetifyjs.com',
          text: 'Discord',
          icon: 'mdi-discord'
        }
      ]
    })
  }
</script>
