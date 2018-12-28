<template>
  <v-container
    grid-list-md
    fluid
    pa-0
    mb-5
  >
    <v-layout wrap>
      <v-flex
        v-for="(philosophy, i) in philosophies"
        :key="i"
        xs12
        md6
        d-flex
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
                xs12
                md6
                align-self-start
                fill-height
                pa-0
              >
                <v-layout
                  column
                  fill-height
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

                  <div
                    v-if="philosophy.more"
                    class="mt-auto"
                  >
                    <v-btn
                      :href="philosophy.more"
                      class="ma-0"
                      color="white"
                      outline
                      rel="noopener"
                      small
                      target="_blank"
                    >
                      More
                    </v-btn>
                  </div>
                </v-layout>
              </v-flex>

              <v-flex
                pa-3
                hidden-sm-and-down
              >
                <v-img
                  :src="philosophy.src"
                  class="ml-auto elevation-6"
                  width="225"
                />
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
          color: 'red lighten-2',
          title: vm.$t('GettingStarted.WhyVuetify.continuous'),
          subtitle: vm.$t('GettingStarted.WhyVuetify.updates'),
          caption: vm.$t('GettingStarted.WhyVuetify.updatesCaption'),
          src: 'https://cdn.vuetifyjs.com/images/why-vuetify/updates.png',
          more: 'https://github.com/vuetifyjs/vuetify/releases'
        },
        {
          color: 'teal',
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
