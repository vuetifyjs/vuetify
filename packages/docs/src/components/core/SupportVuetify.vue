<template>
  <v-card
    class="mb-5"
    href="https://www.patreon.com/vuetify"
    rel="noopener"
    target="_blank"
  >
    <v-card-text>
      <v-layout row wrap>
        <v-flex
          :style="{ order: $vuetify.breakpoint.xs ? '2' : '1' }"
          d-flex
          pl-1
          xs10
        >
          <v-layout align-center row wrap>
            <v-flex
              display-1
              mr-4
              patreon
              d-flex
              xs12
              sm6
            >
              PATREON
            </v-flex>
            <v-flex hidden-xs-only patreon-bar mr-4 />
            <v-flex hidden-sm-and-up patreon-bar-horizontal mr-4 />
            <v-flex xs12 sm6 display-1 patreon-caption pb-1>
              Support Vuetify
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          :style="{ order: $vuetify.breakpoint.xs ? '1' : '2' }"
          align-center
          text-xs-center
          xs2
          d-flex
        >
          <v-layout align-center>
            <v-flex xs12>
              <img class="logo" src="https://cdn.vuetifyjs.com/images/logos/logo.svg" width="50px" alt="">
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<style lang="sass" scoped>
.patreon
  color: #052D49
  flex: 0 0 auto
  font-weight: 900
  letter-spacing: 6px !important

.patreon-bar
  background-color: #052D49
  height: 80px
  flex: 0 1 6px

.patreon-bar-horizontal
  border-bottom: 6px solid #052D49
  width: 100%
  flex-shrink: 1

.patreon-caption
  color: #052D49
</style>
