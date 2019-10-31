<template>
  <base-section
    id="home-feature"
    class="text-center"
  >
    <base-heading>Vuetify.Home.whyVuetify</base-heading>

    <base-text
      class="mx-auto"
      max-width="650"
    >
      Vuetify.Home.whyVuetifyText
    </base-text>

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
        cols="auto"
        class="d-flex"
      >
        <v-card
          :href="feature.href"
          :to="feature.to"
          rel="noopener noreferrer"
          :target="feature.href ? '_blank' : undefined"
          class="overflow-hidden text-center mx-auto"
          elevation="12"
          max-width="380px"
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
        to="introduction/why-vuetify"
      >
        <span class="caption font-weight-bold">
          {{ $t("Vuetify.Home.whyVuetifyText2") }}
        </span>
      </v-btn>
    </div>
  </base-section>
</template>

<script>
  export default {
    name: 'HomeFeature',

    provide: {
      id: 'home-feature',
    },

    computed: {
      features () {
        return [
          {
            key: 'community',
            src: 'feature3.png',
            href: 'https://community.vuetiyfjs.com',
          },
          {
            key: 'components',
            src: 'feature2.png',
            to: `components/api-explorer`,
          },
          {
            key: 'scaffolding',
            src: 'feature1.png',
            href: 'https://github.com/vuetifyjs/vue-cli-plugin-vuetify-cli',
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
