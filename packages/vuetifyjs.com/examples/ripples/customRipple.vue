<template>
  <v-layout row>
    <v-flex xs12>
      <v-card
        class="custom-ripple"
        ripple
        height="300"
        :color="colors[color]"
        @click.native="color = (color + 1) % colors.length"
      >
        <div class="title white--text pl-3 pt-3">{{ colors[color] }}</div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        color: 0,
        colors: [
          'red',
          'pink',
          'purple',
          'deep-purple',
          'indigo',
          'blue',
          'light-blue',
          'cyan',
          'teal',
          'green',
          'light-green',
          'lime',
          'yellow',
          'amber',
          'orange',
          'deep-orange',
          'brown',
          'blue-grey',
          'grey'
        ]
      }
    }
  }
</script>

<style lang="stylus">
  .custom-ripple
    user-select: none
</style>
