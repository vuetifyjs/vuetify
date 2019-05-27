<template>
  <div class="hide-overflow">
    <div class="text-xs-center mb-2">
      <v-btn
        text
        color="teal"
        @click="grow = !grow"
      >
        Grow
      </v-btn>
    </div>

    <v-bottom-navigation
      :value="activeBtn"
      :grow="grow"
      color="teal"
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeBtn: 1,
        grow: false
      }
    }
  }
</script>
