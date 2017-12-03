<template>
  <v-card height="200px">
    <v-bottom-nav
      absolute
      shift
      value="true"
      :class="{
        'blue-grey': e2 === 1,
        'teal': e2 === 2,
        'brown': e2 === 3,
        'brown lighten-1': e2 === 4
      }"
    >
      <v-btn dark @click.native="e2 = 1" :value="e2 === 1">
        <span>Video</span>
        <v-icon>ondemand_video</v-icon>
      </v-btn>
      <v-btn dark @click.native="e2 = 2" :value="e2 === 2">
        <span>Music</span>
        <v-icon>music_note</v-icon>
      </v-btn>
      <v-btn dark @click.native="e2 = 3" :value="e2 === 3">
        <span>Book</span>
        <v-icon>book</v-icon>
      </v-btn>
      <v-btn dark @click.native="e2 = 4" :value="e2 === 4">
        <span>Image</span>
        <v-icon>image</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        e2: 3
      }
    }
  }
</script>
