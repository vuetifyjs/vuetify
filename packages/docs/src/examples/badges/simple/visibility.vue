<template>
  <v-container fluid class="text-xs-center">
    <v-layout
      justify-space-between
      row
      wrap
    >
      <v-flex xs12>
        <v-btn
          color="indigo"
          class="white--text"
          @click="show = !show"
        >
          Toggle
        </v-btn>
      </v-flex>

      <v-flex xs12 class="mt-5">
        <v-badge
          v-model="show"
          color="cyan"
          left
        >
          <template v-slot:badge>
            <span>6</span>
          </template>
          <v-icon
            large
            color="grey lighten-1"
          >shopping_cart</v-icon>
        </v-badge>

        <v-badge
          v-model="show"
          color="purple"
        >
          <template v-slot:badge>
            <span>6</span>
          </template>
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
        show: true
      }
    }
  }
</script>
