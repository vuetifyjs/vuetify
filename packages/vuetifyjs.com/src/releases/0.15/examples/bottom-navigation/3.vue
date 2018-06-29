<template>
  <v-card height="200px" style="overflow: hidden;">
    <v-card-text class="text-xs-center">
      <v-btn flat primary @click.native="e31 = !e31">Toggle Nav</v-btn>
    </v-card-text>
    <v-bottom-nav absolute :value="e31" :active.sync="e3" class="transparent">
      <v-btn flat class="teal--text">
        <span>Recents</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn flat class="teal--text">
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat class="teal--text">
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        e3: 1,
        e31: true
      }
    }
  }
</script>
