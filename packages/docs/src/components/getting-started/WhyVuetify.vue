<template>
  <v-container
    grid-list-md
    fluid
    pa-0
    mb-5
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
                mb-3
              >
                <v-layout
                  column
                  ma-0
                >
                  <h2 class="text-uppercase mb-3">
                    <strong
                      class="headline font-weight-bold"
                      v-text="philosophy.title"
                    />
                    <div
                      class="font-weight-thin display-1"
                      v-text="philosophy.subtitle"
                    />
                  </h2>

                  <div class="text-xs-justify">
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
                v-if="philosophy.more"
                xs12
                mt-3
                text-xs-center
              >
                <v-btn
                  :href="philosophy.more"
                  color="white"
                  outlined
                  rel="noopener"
                  small
                  target="_blank"
                >
                  More
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
      namespace: undefined
    },

    data: vm => ({
      philosophies: [
        {
          color: 'indigo',
          title: vm.$t('GettingStarted.WhyVuetify.vibrant'),
          subtitle: vm.$t('GettingStarted.WhyVuetify.community'),
          caption: vm.$t('GettingStarted.WhyVuetify.communityCaption'),
          src: 'https://cdn.vuetifyjs.com/images/why-vuetify/community.png',
          more: 'https://community.vuetifyjs.com'
        },
        {
          color: 'purple',
          title: vm.$t('GettingStarted.WhyVuetify.material'),
          subtitle: vm.$t('GettingStarted.WhyVuetify.toolkit'),
          caption: vm.$t('GettingStarted.WhyVuetify.toolkitCaption'),
          src: 'https://cdn.vuetifyjs.com/images/why-vuetify/toolkit.png',
          more: 'https://material.io/design/'
        },
        {
          color: 'warning',
          title: vm.$t('GettingStarted.WhyVuetify.continuous'),
          subtitle: vm.$t('GettingStarted.WhyVuetify.updates'),
          caption: vm.$t('GettingStarted.WhyVuetify.updatesCaption'),
          src: 'https://cdn.vuetifyjs.com/images/why-vuetify/updates.png',
          more: 'https://github.com/vuetifyjs/vuetify/releases'
        },
        {
          color: 'teal darken-2',
          title: vm.$t('GettingStarted.WhyVuetify.amazing'),
          subtitle: vm.$t('GettingStarted.WhyVuetify.support'),
          caption: vm.$t('GettingStarted.WhyVuetify.supportCaption'),
          src: 'https://cdn.vuetifyjs.com/images/why-vuetify/support.png',
          more: 'https://github.com/vuetifyjs/vuetify/pulse'
        }
      ]
    })
  }
</script>

<style>
.why-vuetify p {
  margin-bottom: 0;
}
</style>
