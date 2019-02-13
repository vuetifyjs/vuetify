<template>
  <v-container fluid class="text-xs-center">
    <v-layout
      flex
      justify-space-between
      row
      wrap
    >
      <v-flex xs12>
        <v-btn @click="show = !show">toggle</v-btn>
      </v-flex>

      <v-flex xs12 class="mt-5">
        <v-tooltip v-model="show" top>
          <template #activator="data">
            <v-btn icon v-on="data.on">
              <v-icon color="grey lighten-1">shopping_cart</v-icon>
            </v-btn>
          </template>
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
