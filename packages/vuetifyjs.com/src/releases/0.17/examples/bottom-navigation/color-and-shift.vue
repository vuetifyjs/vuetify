<template>
  <v-card height="200px">
    <v-bottom-nav
      absolute
      shift
      :value="true"
      :active.sync="e2"
      :color="computedColor"
    >
      <v-btn dark>
        <span>Video</span>
        <v-icon>ondemand_video</v-icon>
      </v-btn>
      <v-btn dark>
        <span>Music</span>
        <v-icon>music_note</v-icon>
      </v-btn>
      <v-btn dark>
        <span>Book</span>
        <v-icon>book</v-icon>
      </v-btn>
      <v-btn dark>
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
    },

    computed: {
      computedColor () {
        switch (this.e2) {
          case 0:
            return 'blue-grey'
          break
          case 1:
            return 'teal'
          break
          case 2:
            return 'brown'
          break
          case 4:
            return 'brown lighten-1'
          break
        }
      }
    }
  }
</script>
