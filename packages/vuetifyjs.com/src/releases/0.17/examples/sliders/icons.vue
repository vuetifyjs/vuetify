<template>
  <v-card>
    <v-subheader>Media volume</v-subheader>
    <v-card-text>
      <v-slider prepend-icon="volume_up" v-model="media"></v-slider>
    </v-card-text>
    <v-subheader>Alarm volume</v-subheader>
    <v-card-text>
      <v-slider append-icon="alarm" v-model="alarm"></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        media: 0,
        alarm: 0
      }
    }
  }
</script>
