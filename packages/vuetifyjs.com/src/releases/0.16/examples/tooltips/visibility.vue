<template>
  <v-container fluid class="text-xs-center">
    <v-layout flex wrap row justify-space-between>
      <v-flex xs12>
        <v-btn @click.native="show = !show">toggle</v-btn>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-tooltip v-model="show" top>
          <v-btn icon slot="activator">
            <v-icon color="grey lighten-1">shopping_cart</v-icon>
          </v-btn>
          <span>Programmatic tooltip</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show: false
      }
    }
  }
</script>
