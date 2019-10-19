<template>
  <base-section
    id="home-feature"
    class="text-center"
  >
    <base-subheading>Vuetify.Home.whyVuetify</base-subheading>

    <v-row justify="center">
      <v-col
        v-for="(feature, i) in computedFeatures"
        :key="i"
        cols="auto"
        class="d-flex"
      >
        <v-card
          class="elevation-12 overflow-hidden text-center mx-auto"
          light
          max-width="350px"
        >
          <v-img
            :alt="feature.title"
            :aspect-ratio="2.6"
            :src="`https://cdn.vuetifyjs.com/images/home/${feature.src}`"
            width="100%"
          />

          <v-card-text>
            <h2
              class="subtitle-1 font-weight-bold mb-2 text--primary"
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
  </base-section>
</template>

<script>
  export default {
    name: 'HomeFeature',

    data: () => ({
      // TODO: Move this to somewhere in data
      features: [
        {
          key: 'community',
          src: 'feature3.png',
        },
        {
          key: 'components',
          src: 'feature2.png',
        },
        {
          key: 'scaffolding',
          src: 'feature1.png',
        },
      ],
    }),

    computed: {
      computedFeatures () {
        return this.features.map(feature => ({
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
