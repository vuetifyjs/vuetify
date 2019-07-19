<template>
  <v-container>
    <v-layout column>
      <main-header>Parallaxes</main-header>

      <core-title>
        Basic
      </core-title>
      <core-section>
        <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" />
      </core-section>

      <core-title>
        With content
      </core-title>
      <core-section>
        <v-parallax
          dark
          src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        >
          <v-layout
            align-center
            column
            justify-center
          >
            <h1 class="display-2 font-weight-thin mb-4">
              Vuetify.js
            </h1>
            <h4 class="subheading">
              Build your application today!
            </h4>
          </v-layout>
        </v-parallax>
      </core-section>

      <core-title>
        Custom height
      </core-title>
      <core-section>
        <v-parallax
          height="300"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        />
      </core-section>

      <core-section>
        <v-parallax
          height="700"
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
        />
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Parallaxes',

    data: () => ({}),
  }
</script>

<style scoped>
.flex {
  margin-top: 2rem;
}
</style>
