<template>
  <v-card
    class="mx-auto"
    height="200"
    flat
    max-width="500"
  >
    <div class="headline text-xs-center pa-5">
      Active: {{ bottomNav }}
    </div>
    <v-bottom-navigation
      v-model="bottomNav"
      absolute
      color="white"
      grow
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
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 'recent'
      }
    }
  }
</script>
