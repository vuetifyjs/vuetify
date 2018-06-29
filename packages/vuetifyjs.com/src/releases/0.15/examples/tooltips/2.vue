<template>
  <v-container fluid class="text-xs-center">
    <v-layout flex wrap row justify-space-between>
      <v-flex xs12>
        <v-btn @click.native="show = !show">toggle</v-btn>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-btn icon v-tooltip:top="{ html: 'Top tooltip', visible: show }">
          <v-icon class="grey--text text--lighten-1">shopping_cart</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show: true
      }
    }
  }
</script>
