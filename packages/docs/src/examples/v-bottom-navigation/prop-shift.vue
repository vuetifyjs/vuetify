<template>

  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="value"
      :bg-color="color"
      mode="shift"
    >
      <v-btn>
        <v-icon>mdi-television-play</v-icon>

        <span>Video</span>
      </v-btn>

      <v-btn>
        <v-icon>mdi-music-note</v-icon>

        <span>Music</span>
      </v-btn>

      <v-btn>
        <v-icon>mdi-book</v-icon>

        <span>Book</span>
      </v-btn>

      <v-btn>
        <v-icon>mdi-image</v-icon>

        <span>Image</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({ value: 1 }),

    computed: {
      color () {
        switch (this.value) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
          default: return 'blue-grey'
        }
      },
    },
  }
</script>
