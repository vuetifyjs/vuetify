<template>
  <v-card
    class="mx-auto"
    height="200"
    max-width="344"
    tile
  >
    <v-bottom-navigation
      v-model="bottomNav"
      :background-color="color"
      absolute
      dark
      shift
    >
      <v-btn>
        <span>Video</span>
        <v-icon>ondemand_video</v-icon>
      </v-btn>

      <v-btn>
        <span>Music</span>
        <v-icon>music_note</v-icon>
      </v-btn>

      <v-btn>
        <span>Book</span>
        <v-icon>book</v-icon>
      </v-btn>

      <v-btn>
        <span>Image</span>
        <v-icon>image</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 3
      }
    },

    computed: {
      color () {
        switch (this.bottomNav) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
        }
      }
    }
  }
</script>
