<template>
  <v-jumbotron
    dark
    gradient="to bottom, #1867c0, #5CBBF6"
    height="auto"
  >
    <a
      class="v-chip v-chip--tidelift white--text"
      href="https://tidelift.com/subscription/npm/vuetify?utm_source=vuetify&utm_medium=referral&utm_campaign=homepage"
      rel="noopener"
      target="_blank"
    >
      <span class="v-chip__content">
        <img
          alt="Tidelift"
          class="mr-3"
          src="https://cdn.vuetifyjs.com/images/affiliates/tidelift-small.png"
          width="24px"
        >
        <span class="body-2 text-uppercase font-weight-regular hidden-sm-and-down">
          Get Professionally-Supported Vuetify
        </span>
        <span class="body-2 text-uppercase font-weight-regular hidden-md-and-up">
          Get Professional Support
        </span>
      </span>
    </a>
    <v-container
      fill-height
      my-3
    >
      <v-layout
        align-center
        justify-center
        wrap
      >
        <img
          alt="Logo"
          class="mx-3"
          height="256px"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-300.png"
          width="256px"
        >
        <v-flex shrink>
          <div
            class="display-3 font-weight-light"
            v-text="$t('Vuetify.Home.materialDesign')"
          />
          <div
            class="display-3 font-weight-light mb-3"
            v-text="$t('Vuetify.Home.componentFramework')"
          />
          <div>
            <v-btn
              v-for="(btn, i) in buttons"
              :class="btn.class"
              :key="i"
              v-bind="btn.attrs"
              color="white"
              large
            >
              <translation-translatable v-if="btn.lang" :i18n="btn.lang" />
              <v-icon
                v-if="btn.icon"
                left
                v-text="btn.icon"
              />
              {{ btn.lang ? $t(btn.lang) : btn.text }}
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container
      grid-list-xl
      my-3
    >
      <v-layout wrap>
        <v-flex
          v-for="(_, i) in 3"
          :key="i"
          d-flex
          xs12
          sm6
          md4
          lg4
        >
          <v-card
            class="elevation-24 hide-overflow text-xs-center"
            light
            max-width="375px"
          >
            <img
              :alt="$t(`Vuetify.Home.features[${i}].title`)"
              :src="$t(`Vuetify.Home.features[${i}].img`)"
            >
            <v-card-text>
              <translation-translatable :i18n="`Vuetify.Home.features[${i}].title`">
                <h3
                  class="subheading font-weight-bold"
                  v-text="$t(`Vuetify.Home.features[${i}].title`)"
                />
              </translation-translatable>
              <translation-translatable :i18n="`Vuetify.Home.features[${i}].text`">
                <p
                  class="mb-2"
                  v-text="$t(`Vuetify.Home.features[${i}].text`)"
                />
              </translation-translatable>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
  export default {
    data: () => ({
      buttons: [
        {
          attrs: {
            to: {
              name: 'getting-started/QuickStart'
            }
          },
          class: 'primary--text',
          lang: 'Vuetify.Home.getStarted'
        },
        {
          attrs: {
            href: 'https://github.com/vuetifyjs/vuetify',
            outline: true,
            target: '_blank'
          },
          icon: 'mdi-github-circle',
          text: 'Github'
        },
        {
          attrs: {
            href: 'https://community.vuetifyjs.com',
            outline: true,
            target: '_blank'
          },
          icon: 'mdi-discord',
          lang: 'Vuetify.Home.getHelp'
        }
      ]
    }),

    computed: {
      features () {
        return this.$t('Vuetify.Home.features')
      }
    }
  }
</script>

<style lang="stylus">
  .v-chip--tidelift
    background: #f6914d !important
    padding-right: 64px
    position: absolute !important
    right: -24px
    text-decoration: none
    top: -20px

    .v-chip__content
      cursor: pointer !important

      > span
        line-height: 1
</style>
