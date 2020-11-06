<template>
  <v-card
    class="mx-auto"
    color="grey lighten-4"
    max-width="600"
  >
    <v-img
      :aspect-ratio="16/9"
      src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
    >
    </v-img>
    <v-card-text
      class="pt-6"
      style="position: relative;"
    >
      <v-btn
        absolute
        color="orange"
        icon
        large
        outlined
        right
        top
        @click.prevent="reveal = true"
      >
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <div class="font-weight-light grey--text title mb-2">
        For the perfect meal
      </div>
      <h3 class="display-1 font-weight-light orange--text mb-2">
        QW cooking utensils
      </h3>
      <div class="font-weight-light title mb-2">
        Our Vintage kitchen utensils delight any chef.<br>
        Made of bamboo by hand
      </div>
    </v-card-text>
    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal"
        style="height: 100%;"
      >
        <v-btn
          absolute
          large
          right
          top
          icon
          dark
          color="white"
          @click="reveal = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-card-title class="white--text display-1">$14.99</v-card-title>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      reveal: false,
    }),
  }
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .7 !important;
  position: absolute;
  width: 100%;
}
</style>
