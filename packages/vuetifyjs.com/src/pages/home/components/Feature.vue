<template>
  <v-card
    class="pa-5 text-xs-center"
    color="white"
    flat
  >
    <v-container grid-list-xl>
      <v-layout wrap>
        <v-flex
          v-for="(_, i) in 3"
          :key="i"
          d-flex
          xs12
          sm6
          md4
          lg4
        >
          <v-card
            class="elevation-12 hide-overflow text-xs-center"
            light
            max-width="375px"
          >
            <img
              :alt="$t(`Vuetify.Home.features[${i}].title`)"
              :src="$t(`Vuetify.Home.features[${i}].img`)"
            >
            <v-card-text>
              <h3
                class="subheading font-weight-bold"
                v-text="$t(`Vuetify.Home.features[${i}].title`)"
              />
              <p
                class="mb-2"
                v-text="$t(`Vuetify.Home.features[${i}].text`)"
              />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    computed: {
      features () {
        return this.$t('Vuetify.Home.features')
      }
    }
  }
</script>
