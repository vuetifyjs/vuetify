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
          class="overflow-hidden text-center mx-auto"
          elevation="12"
          light
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
              class="title font-weight-regular mb-2 text--primary"
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

    provide: {
      id: 'home-feature',
    },

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
