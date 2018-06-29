<template>
  <v-container fluid class="text-xs-center">
    <v-layout flex wrap row justify-space-between>
      <v-flex xs12>
        <v-btn @click.native="show = !show">toggle</v-btn>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-icon large v-badge="{ value: 6, left: true, visible: show}" class="grey--text text--lighten-1">shopping_cart</v-icon>
        <v-icon large v-badge="badge" class="grey--text red--after">mail</v-icon>
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
