<template>
  <v-card class="e4">
    <v-responsive
      :style="{ background: `rgb(${red}, ${green}, ${blue})` }"
      height="300px"
    ></v-responsive>

    <v-card-text>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout
          row
          wrap
        >
          <v-flex xs9>
            <v-slider
              v-model="red"
              :max="255"
              label="R"
            ></v-slider>
          </v-flex>

          <v-flex xs3>
            <v-text-field
              v-model="red"
              class="mt-0"
              type="number"
            ></v-text-field>
          </v-flex>

          <v-flex xs9>
            <v-slider
              v-model="green"
              :max="255"
              label="G"
            ></v-slider>
          </v-flex>

          <v-flex xs3>
            <v-text-field
              v-model="green"
              class="mt-0"
              type="number"
            ></v-text-field>
          </v-flex>

          <v-flex xs9>
            <v-slider
              v-model="blue"
              :max="255"
              label="B"
            ></v-slider>
          </v-flex>

          <v-flex xs3>
            <v-text-field
              v-model="blue"
              class="mt-0"
              type="number"
            ></v-text-field>
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
