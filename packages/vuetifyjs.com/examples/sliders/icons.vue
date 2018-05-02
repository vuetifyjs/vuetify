<template>
  <v-card>
    <v-subheader>Media volume</v-subheader>
    <v-card-text>
      <v-slider v-model="media" prepend-icon="volume_up"></v-slider>
    </v-card-text>
    <v-subheader>Alarm volume</v-subheader>
    <v-card-text>
      <v-slider v-model="alarm" append-icon="alarm"></v-slider>
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
