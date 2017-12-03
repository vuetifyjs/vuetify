<template>
  <v-card height="200px" style="overflow: hidden;">
    <v-card-text class="text-xs-center">
      <v-btn flat primary @click.native="e31 = !e31">Toggle Nav</v-btn>
    </v-card-text>
    <v-bottom-nav absolute :value="e31" class="transparent">
      <v-btn flat light class="teal--text" @click.native="e3 = 1" :value="e3 === 1">
        <span>Recents</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn flat light class="teal--text" @click.native="e3 = 2" :value="e3 === 2">
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat light class="teal--text" @click.native="e3 = 3" :value="e3 === 3">
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
