<template>
  <v-card
    class="mb-5"
    href="https://www.patreon.com/bePatron?u=6223325"
    rel="noopener"
    target="_blank"
  >
    <v-card-text>
      <v-layout align-center>
        <v-flex display-1 patreon mr-4>
          PATREON
        </v-flex>
        <v-flex patreon-bar mr-4 />
        <v-flex display-1 patreon-caption pb-1>
          Support Vuetify
        </v-flex>
        <img src="/static/doc-images/logo.svg" width="50px" alt="">
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<style lang="stylus" scoped>
  .patreon
    color: #052D49
    flex: 0 0 auto
    font-weight: 900
    letter-spacing: 6px !important

  .patreon-bar
    background-color: #052D49
    height: 80px
    flex: 0 1 6px

  .patreon-caption
    color: #052D49
</style>
