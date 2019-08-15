<template>
  <v-bottom-navigation
    v-model="bottomNav"
  >
    <v-btn value="recent">
      <span>Recent</span>
      <v-icon>history</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Favorites</span>
      <v-icon>favorite</v-icon>
    </v-btn>

    <v-btn value="nearby">
      <span>Nearby</span>
      <v-icon>place</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 'recent',
      }
    },
  }
</script>
