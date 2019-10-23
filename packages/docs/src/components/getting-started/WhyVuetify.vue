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
          :color="philosophy.color"
          class="mx-auto"
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
            <v-col
              pa-0
              cols="12"
              mb-4
            >
              <v-row
                class="ma-0"
                no-gutters
              >
                <h2 class="text-uppercase mb-4 text-center">
                  <strong
                    class="headline font-weight-bold"
                    v-text="philosophy.title"
                  />

                  <div
                    class="font-weight-thin display-1"
                    v-text="philosophy.subtitle"
                  />
                </h2>

                <div class="text-center">
                  <base-markdown :code="philosophy.caption" />
                </div>
              </v-row>
            </v-col>

            <v-col
              hidden-xs-only
              cols="12"
            >
              <v-img
                :src="philosophy.src"
                :aspect-ratio="16/9"
                class="elevation-6 mx-auto"
                width="275"
              />
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
    provide: {
      namespace: undefined,
    },

    data () {
      return {
        philosophies: [
          {
            color: 'indigo',
            title: this.$t('GettingStarted.WhyVuetify.vibrant'),
            subtitle: this.$t('GettingStarted.WhyVuetify.community'),
            caption: this.$t('GettingStarted.WhyVuetify.communityCaption'),
            src: 'https://cdn.vuetifyjs.com/images/why-vuetify/community.png',
            more: 'https://community.vuetifyjs.com',
          },
          {
            color: 'purple',
            title: this.$t('GettingStarted.WhyVuetify.material'),
            subtitle: this.$t('GettingStarted.WhyVuetify.toolkit'),
            caption: this.$t('GettingStarted.WhyVuetify.toolkitCaption'),
            src: 'https://cdn.vuetifyjs.com/images/why-vuetify/toolkit.png',
            more: 'https://material.io/design/',
          },
          {
            color: 'warning',
            title: this.$t('GettingStarted.WhyVuetify.continuous'),
            subtitle: this.$t('GettingStarted.WhyVuetify.updates'),
            caption: this.$t('GettingStarted.WhyVuetify.updatesCaption'),
            src: 'https://cdn.vuetifyjs.com/images/why-vuetify/updates.png',
            more: 'https://github.com/vuetifyjs/vuetify/releases',
          },
          {
            color: 'teal darken-2',
            title: this.$t('GettingStarted.WhyVuetify.professional'),
            subtitle: this.$t('GettingStarted.WhyVuetify.support'),
            caption: this.$t('GettingStarted.WhyVuetify.supportCaption'),
            src: 'https://cdn.vuetifyjs.com/images/why-vuetify/support.png',
            to: `/${this.$route.params.lang}/getting-started/consulting-and-support`,
          },
        ],
      }
    },
  }
</script>

<style>
.why-vuetify p {
  margin-bottom: 0;
}
</style>
