<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
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
      </v-col>

      <v-col
        class="align-center justify-center layout text-center"
        cols="12"
        sm="6"
        md="8"
      >
        <v-avatar
          :color="color"
          :tile="tile"
          :size="avatarSize"
        >
          <img
            v-if="img"
            src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
            alt="avatar"
          >
          <span v-else>VJ</span>
        </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      color: 'grey lighten-4',
      colors: ['primary', 'accent', 'warning lighten-2', 'teal', 'grey lighten-4'],
      img: true,
      slider: 56,
      tile: false,
    }),

    computed: {
      avatarSize () {
        return `${this.slider}px`
      },
    },
  }
</script>
