<template>
  <v-container
    grid-list-md
    fluid
    pa-0
    mb-12
    why-vuetify
  >
    <v-layout wrap>
      <v-flex
        v-for="(philosophy, i) in philosophies"
        :key="i"
        d-flex
        xs12
        lg6
      >
        <v-card
          :color="philosophy.color"
          class="mx-auto"
          dark
          elevation="6"
          style="border-radius: 6px; min-height: 350px;"
        >
          <v-container
            grid-list-xl
            fill-height
          >
            <v-layout
              justify-space-between
              align-center
              wrap
              ma-0
            >
              <v-flex
                pa-0
                xs12
                mb-4
              >
                <v-layout
                  column
                  ma-0
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
                    <doc-markdown :code="philosophy.caption" />
                  </div>
                </v-layout>
              </v-flex>

              <v-flex
                hidden-xs-only
                xs12
              >
                <v-img
                  :src="philosophy.src"
                  :aspect-ratio="16/9"
                  class="elevation-6 mx-auto"
                  width="275"
                />
              </v-flex>

              <v-flex
                v-if="philosophy.more || philosophy.to"
                xs12
                mt-4
                text-center
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
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
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
