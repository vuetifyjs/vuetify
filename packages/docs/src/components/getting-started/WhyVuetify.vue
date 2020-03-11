<template>
  <v-container
    id="why-vuetify"
    fluid
    class="mb-12 pa-0"
  >
    <v-row>
      <v-col
        v-for="(philosophy, i) in philosophies"
        :key="i"
        class="d-flex"
        cols="12"
        lg="6"
      >
        <v-card
          :id="philosophy.title"
          :color="philosophy.color"
          class="mx-auto why-vuetify__philosophies"
          dark
          outlined
          min-height="350"
          width="100%"
        >
          <v-row
            align="center"
            class="ma-0"
            justify="space-between"
          >
            <v-col cols="12">
              <h2 class="text-uppercase mb-4 text-center">
                <base-markdown class="headline font-weight-bold">{{ philosophy.title }}</base-markdown>

                <base-markdown class="font-weight-thin display-1">{{ philosophy.subtitle }}</base-markdown>
              </h2>

              <div class="pa-4">
                <base-markdown>{{ philosophy.caption }}</base-markdown>
              </div>
            </v-col>

            <v-col
              class="hidden-xs-only text-center"
              cols="12"
            >
              <v-card
                class="d-inline-block"
                elevation="12"
              >
                <v-img
                  :src="philosophy.src"
                  :aspect-ratio="16/9"
                  class="mx-auto"
                  width="275"
                />
              </v-card>
            </v-col>

            <v-col
              v-if="philosophy.more || philosophy.to"
              cols="12"
              class="mt-4 text-center"
            >
              <v-btn
                :href="philosophy.more"
                :rel="philosophy.more && 'noopener'"
                :target="philosophy.more && '_blank'"
                :to="philosophy.to"
                color="white"
                outlined
                small
              >
                Details
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'GettingStartedWhyVuetify',

    provide: {
      namespace: undefined,
    },

    data () {
      return {
        philosophies: [
          {
            color: 'indigo',
            title: 'vibrant',
            subtitle: 'community',
            caption: 'communityCaption',
            src: 'https://cdn.vuetifyjs.com/images/why-vuetify/community.png',
            more: 'https://community.vuetifyjs.com',
          },
          {
            color: 'purple',
            title: 'material',
            subtitle: 'toolkit',
            caption: 'toolkitCaption',
            src: 'https://cdn.vuetifyjs.com/images/why-vuetify/toolkit.png',
            more: 'https://material.io/design/',
          },
          {
            color: 'warning',
            title: 'continuous',
            subtitle: 'updates',
            caption: 'updatesCaption',
            src: 'https://cdn.vuetifyjs.com/images/why-vuetify/updates.png',
            more: 'https://github.com/vuetifyjs/vuetify/releases',
          },
          {
            color: 'teal darken-2',
            title: 'professional',
            subtitle: 'support',
            caption: 'supportCaption',
            src: 'https://cdn.vuetifyjs.com/images/why-vuetify/support.png',
            to: `/${this.$route.params.lang}/professional-support/consulting/`,
          },
        ],
      }
    },
  }
</script>

<style lang="sass">
#why-vuetify
  p
    margin-bottom: 0

  #vibrant a
    color: white !important
    text-decoration: underline
</style>
