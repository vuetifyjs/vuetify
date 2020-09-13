<template>
  <v-card
    flat
    color="transparent"
  >
    <v-subheader>Media volume</v-subheader>
    <v-card-text>
      <v-slider
        v-model="media"
        prepend-icon="mdi-volume-high"
      ></v-slider>
    </v-card-text>

    <v-subheader>Alarm volume</v-subheader>

    <v-card-text>
      <v-slider
        v-model="alarm"
        append-icon="mdi-alarm"
      ></v-slider>
    </v-card-text>

    <v-subheader>Icon click callback</v-subheader>

    <v-card-text>
      <v-slider
        v-model="zoom"
        append-icon="mdi-magnify-plus-outline"
        prepend-icon="mdi-magnify-minus-outline"
        @click:append="zoomIn"
        @click:prepend="zoomOut"
      ></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        media: 0,
        alarm: 0,
        zoom: 0,
      }
    },

    methods: {
      zoomOut () {
        this.zoom = (this.zoom - 10) || 0
      },
      zoomIn () {
        this.zoom = (this.zoom + 10) || 100
      },
    },
  }
</script>
