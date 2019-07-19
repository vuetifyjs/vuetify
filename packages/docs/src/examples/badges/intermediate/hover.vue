<template>
  <v-container fluid class="text-center">
    <v-layout
      justify-center
      row
      wrap
    >
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
          @mouseover="show = true"
          @mouseout="show = false"
        >shopping_cart</v-icon>
      </v-badge>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
      }
    },
  }
</script>
