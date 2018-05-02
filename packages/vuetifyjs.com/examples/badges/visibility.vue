<template>
  <v-container fluid class="text-xs-center">
    <v-layout flex wrap row justify-space-between>
      <v-flex xs12>
        <v-btn @click.native="show = !show">toggle</v-btn>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-badge v-model="show" color="cyan" left>
          <span slot="badge">6</span>
          <v-icon large color="grey lighten-1">shopping_cart</v-icon>
        </v-badge>
        <v-badge v-model="show" color="indigo">
          <span slot="badge">6</span>
          <v-icon large color="grey">mail</v-icon>
        </v-badge>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show: true,
        badgeData: { value: '!' }
      }
    },
    computed: {
      badge () {
        return this.show ? this.badgeData : null
      }
    }
  }
</script>
