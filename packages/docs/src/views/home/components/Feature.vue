<template>
  <base-section
    id="home-feature"
    class="text-center"
  >
    <v-responsive
      :max-width="1280 + 24"
      class="pa-6 mx-auto"
    >
      <base-heading>Vuetify.Home.whyVuetify</base-heading>

      <base-text
        class="mx-auto"
        max-width="650"
      >Vuetify.Home.whyVuetifyText</base-text>

      <v-container class="pa-0 mb-6">
        <base-comparison />
      </v-container>

      <v-row
        class="mb-6"
        justify="center"
      >
        <v-col
          v-for="(feature, i) in computedFeatures"
          :key="i"
          class="d-flex"
          cols="auto"
        >
          <v-card
            :href="feature.href"
            :target="feature.href ? '_blank' : undefined"
            :to="feature.to"
            class="overflow-hidden text-center mx-auto"
            elevation="12"
            max-width="380px"
            rel="noopener noreferrer"
          >
            <v-img
              :alt="feature.title"
              :aspect-ratio="2.6"
              :src="`https://cdn.vuetifyjs.com/images/home/${feature.src}`"
              width="100%"
            />

            <v-card-text>
              <h2
                class="title font-weight-regular text--primary mb-2"
                v-text="feature.title"
              />

              <p
                class="mb-2"
                v-text="feature.text"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div class="pa-4 text-center">
        <v-btn
          color="primary"
          large
          outlined
          rounded
          :to="`/${$route.params.lang}/introduction/why-vuetify/`"
        >
          <span
            class="caption font-weight-bold"
            v-text="$t('Vuetify.Home.whyVuetifyText2')"
          />
        </v-btn>
      </div>
    </v-responsive>
  </base-section>
</template>

<script>
  export default {
    name: 'HomeFeature',

    provide: { id: 'home-feature' },

    computed: {
      features () {
        return [
          {
            href: 'https://community.vuetifyjs.com',
            key: 'community',
            src: 'feature3.png',
          },
          {
            key: 'components',
            src: 'feature2.png',
            to: `components/api-explorer`,
          },
          {
            href: 'https://github.com/vuetifyjs/vue-cli-plugin-vuetify-cli',
            key: 'scaffolding',
            src: 'feature1.png',
          },
        ]
      },
      computedFeatures () {
        return this.features.map(feature => ({
          ...feature,
          text: this.$t(`Vuetify.Home.features.${feature.key}.text`),
          title: this.$t(`Vuetify.Home.features.${feature.key}.title`),
          src: feature.src,
        }))
      },
    },
  }
</script>

<style lang="sass">
  #home-feature .v-card
    border-radius: 6px
</style>
