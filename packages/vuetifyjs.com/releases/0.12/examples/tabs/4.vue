<template>
  <v-tabs id="mobile-tabs-4" grow icons light>
    <v-tabs-bar slot="activators">
      <v-tabs-slider></v-tabs-slider>
      <v-tabs-item href="#mobile-tabs-4-1">
        Recents
        <v-icon>phone</v-icon>
      </v-tabs-item>
      <v-tabs-item href="#mobile-tabs-4-2">
        Favorites
        <v-icon>favorite</v-icon>
      </v-tabs-item>
      <v-tabs-item href="#mobile-tabs-4-3">
        Nearby
        <v-icon>account_box</v-icon>
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-content
      v-for="i in 3"
      :key="i"
      :id="'mobile-tabs-4-' + i"
    >
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tabs-content>
  </v-tabs>
</template>

<script>
  export default {
    data () {
      return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>
