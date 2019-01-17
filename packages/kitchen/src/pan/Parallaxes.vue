<template>
  <v-container>
    <v-layout column>
      <h3 class="title grey--text mb-4 mt-5 center">
        Basic
      </h3>
      <v-flex>
        <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        With content
      </h3>
      <v-flex>
        <v-parallax
          dark
          src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        >
          <v-layout
            align-center
            column
            justify-center
          >
            <h1 class="display-2 font-weight-thin mb-3">
              Vuetify.js
            </h1>
            <h4 class="subheading">
              Build your application today!
            </h4>
          </v-layout>
        </v-parallax>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Custom height
      </h3>
      <v-flex>
        <v-parallax
          height="300"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        />
      </v-flex>

      <v-flex>
        <v-parallax
          height="700"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Parallaxes',

  data: () => ({})
}
</script>

<style scoped>
.flex {
  margin-top: 2rem;
}

.center {
  align-self: center;
}
</style>
