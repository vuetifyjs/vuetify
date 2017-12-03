<template>
  <v-card>
    <v-card-text>
      <v-slider :label="ex1.label" v-model="ex1.val" :color="ex1.color"></v-slider>
      <v-slider :label="ex2.label" v-model="ex2.val" :track-color="ex2.color"></v-slider>
      <v-slider :label="ex3.label" v-model="ex3.val" :thumb-color="ex3.color" thumb-label></v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        ex1: { label: 'color', val: 25, color: 'orange darken-3' },
        ex2: { label: 'track-color', val: 75, color: 'green lighten-1' },
        ex3: { label: 'thumb-color', val: 50, color: 'red' },
      }
    }
  }
</script>
