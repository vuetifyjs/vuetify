<template>
  <v-card
    class="hide-overflow mx-auto"
    height="200"
    max-width="500"
  >
    <v-card-text class="text-xs-center">
      <v-btn
        text
        color="primary"
        @click="showNav = !showNav"
      >
        Toggle Nav
      </v-btn>
    </v-card-text>

    <v-bottom-navigation
      :input-value="showNav"
      :value="activeBtn"
      absolute
      color="white"
      horizontal
    >
      <v-btn text color="teal">
        <span>Recents</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn text color="teal">
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn text color="teal">
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
