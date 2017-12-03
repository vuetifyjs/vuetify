<template>
  <v-card height="200px">
    <v-bottom-nav absolute value="true" class="transparent">
      <v-btn flat dark class="teal--text" @click.native="e1 = 1" :value="e1 === 1">
        <span>Recents</span>
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn flat dark class="teal--text" @click.native="e1 = 2" :value="e1 === 2">
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn flat dark class="teal--text" @click.native="e1 = 3" :value="e1 === 3">
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
        e1: 2
      }
    }
  }
</script>
