<template>
  <v-responsive class="text-center pb-6">
    <v-container grid-list-xl>
      <v-layout justify-center wrap>
        <v-flex v-for="(feature, i) in computedFeatures" :key="i" d-flex shrink>
          <v-card class="elevation-12 overflow-hidden text-center mx-auto" light max-width="350px">
            <v-img
              :alt="feature.title"
              :aspect-ratio="2.6"
              :src="`https://cdn.vuetifyjs.com/images/home/${feature.src}`"
              width="100%"
            />
            <v-card-text>
              <h2 class="subtitle-1 font-weight-bold mb-2 text--primary" v-text="feature.title" />
              <p class="mb-2" v-text="feature.text" />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script>
  export default {
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
