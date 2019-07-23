<template>
  <v-card
    aria-label="Support the Development of Vuetify"
    class="mb-12"
    href="https://www.patreon.com/vuetify"
    rel="noopener"
    target="_blank"
  >
    <v-card-text>
      <v-layout wrap>
        <v-flex
          :style="{ order: $vuetify.breakpoint.xs ? '2' : '1' }"
          d-flex
          pl-1
          xs10
        >
          <v-layout align-center wrap>
            <v-flex
              display-1
              mr-6
              patreon
              d-flex
              xs12
              sm6
            >
              PATREON
            </v-flex>
            <v-flex hidden-xs-only patreon-bar mr-6 />
            <v-flex hidden-sm-and-up patreon-bar-horizontal mr-6 />
            <v-flex xs12 sm6 display-1 patreon-caption pb-1>
              Support Vuetify
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          :style="{ order: $vuetify.breakpoint.xs ? '1' : '2' }"
          align-center
          text-center
          xs2
          d-flex
        >
          <v-layout align-center>
            <v-flex xs12>
              <v-img
                class="logo"
                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                width="50px"
                alt="Vuetify Logo"
              />
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
