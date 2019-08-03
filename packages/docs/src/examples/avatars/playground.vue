<template>
  <v-container grid-list-md>
    <v-layout wrap>
      <v-flex xs12 sm6 md4>
        <v-slider
          v-model="slider"
          :min="16"
          :max="256"
          label="Size"
          thumb-label
        ></v-slider>

        <v-select
          v-model="color"
          label="Color"
          :items="colors"
        ></v-select>

        <v-switch
          v-model="tile"
          label="Tile"
        ></v-switch>

        <v-switch
          v-model="img"
          label="Image"
        ></v-switch>
      </v-flex>

      <v-flex
        xs12
        sm6
        md8
        align-center
        justify-center
        layout
        text-center
      >
        <v-avatar
          :color="color"
          :tile="tile"
          :size="avatarSize"
        >
          <img v-if="img" src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
          <span v-else>VJ</span>
        </v-avatar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      slider: 56,
      tile: false,
      color: 'grey lighten-4',
      colors: ['primary', 'accent', 'warning lighten-2', 'teal', 'grey lighten-4'],
      img: true,
    }),

    computed: {
      avatarSize () {
        return `${this.slider}px`
      },
    },
  }
</script>
