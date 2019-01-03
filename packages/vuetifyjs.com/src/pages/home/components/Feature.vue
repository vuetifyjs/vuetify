<template>
  <v-responsive class="text-xs-center pb-4">
    <v-container grid-list-xl>
      <v-layout
        justify-center
        wrap
      >
        <v-flex
          v-for="(feature, i) in features"
          :key="i"
          d-flex
          shrink
        >
          <v-card
            class="elevation-12 hide-overflow text-xs-center mx-auto"
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
              <h3
                class="subheading font-weight-bold mb-2"
                v-text="feature.title"
              />
              <p
                class="mb-2"
                v-text="feature.text"
              />
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
      images: [
        'feature3.png',
        'feature2.png',
        'feature1.png'
      ]
    }),

    computed: {
      features () {
        return this.$t('Vuetify.Home.features').map((feature, i) => {
          return {
            ...feature,
            src: this.images[i]
          }
        })
      }
    }
  }
</script>
