<template>
  <v-card>
    <v-card-text>
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
              label="Tile"
              v-model="tile"
            ></v-switch>
          </v-flex>
          <v-flex
            xs12
            sm6
            md8
            text-xs-center
            layout
            align-center
            justify-center
          >
            <v-avatar
              :tile="tile"
              :size="avatarSize"
              class="grey lighten-4"
            >
              <img src="/static/apple-touch-icon-180x180.png" alt="avatar">
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
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