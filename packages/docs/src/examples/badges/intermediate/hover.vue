<template>
  <v-container fluid class="text-center">
    <v-row
      justify="center"
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
    </v-row>
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
