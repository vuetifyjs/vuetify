<template>
  <v-bottom-navigation
    :value="activeBtn"
    color="deep-purple"
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
</template>

<script>
  export default {
    data () {
      return {
        activeBtn: 1,
      }
    },
  }
</script>
