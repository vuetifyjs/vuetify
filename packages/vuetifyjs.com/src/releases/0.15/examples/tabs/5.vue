<template>
  <v-tabs dark fixed icons centered>
    <v-tabs-bar class="cyan">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item href="#tab-1">
        <v-icon>phone</v-icon>
        Recents
      </v-tabs-item>
      <v-tabs-item href="#tab-2">
        <v-icon>favorite</v-icon>
        Favorites
      </v-tabs-item>
      <v-tabs-item href="#tab-3">
        <v-icon>account_box</v-icon>
        Nearby
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for="i in 3"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
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
