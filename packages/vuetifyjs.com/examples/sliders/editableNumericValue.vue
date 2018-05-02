<template>
  <v-card class="e4">
    <v-card-media :style="{ background: `rgb(${red}, ${green}, ${blue})` }" height="300px"></v-card-media>
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs9>
            <v-slider :max="255" v-model="red" label="R"></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="red" type="number"></v-text-field>
          </v-flex>
          <v-flex xs9>
            <v-slider :max="255" v-model="green" label="G"></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="green" type="number"></v-text-field>
          </v-flex>
          <v-flex xs9>
            <v-slider :max="255" v-model="blue" label="B"></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="blue" type="number"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        red: 64,
        green: 128,
        blue: 0
      }
    }
  }
</script>

<style lang="stylus">
  .e4
    width: 400px
    margin: auto
</style>
