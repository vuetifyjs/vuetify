<template>
  <div class="overflow-hidden">
    <div class="text-center mb-2">
      <v-btn
        text
        color="deep-purple"
        @click="showNav = !showNav"
      >
        Toggle Nav
      </v-btn>
    </div>

    <v-bottom-navigation
      :input-value="showNav"
      :value="activeBtn"
      color="indigo"
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeBtn: 1,
        showNav: true,
      }
    },
  }
</script>
