<template>
  <v-card
    class="hide-overflow mx-auto"
    height="200"
    max-width="500"
  >
    <v-card-text class="text-xs-center">
      <v-btn
        text
        color="deep-purple accent-4"
        @click="showNav = !showNav"
      >
        Toggle Nav
      </v-btn>
    </v-card-text>

    <v-bottom-navigation
      :input-value="showNav"
      :value="activeBtn"
      absolute
      color="deep-purple accent-4"
      dark
      horizontal
    >
      <v-btn>
        <span>Recents</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn>
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
        activeBtn: 1,
        showNav: true
      }
    }
  }
</script>
