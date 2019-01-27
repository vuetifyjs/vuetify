<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-slider
          v-model="slider"
          :min="16"
          :max="256"
          label="Size"
          thumb-label
        ></v-slider>

        <v-switch
          v-model="tile"
          label="Tile"
        ></v-switch>
      </v-flex>

      <v-flex
        xs12
        sm6
        md8
        align-center
        justify-center
        layout
        text-xs-center
      >
        <v-avatar
          :tile="tile"
          :size="avatarSize"
          color="grey lighten-4"
        >
          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      slider: 56,
      tile: false
    }),

    computed: {
      avatarSize () {
        return `${this.slider}px`
      }
    }
  }
</script>
