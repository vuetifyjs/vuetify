<template>
  <v-card
    class="mx-auto"
    :style="cardStyle"
    width="400"
  >
    <v-card-text>
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        style="transform: scale(3); z-index: 99999"
        height="100px"
        cover
        @click="cardStyle = cardStyle === null ? 'overflow: initial; z-index: initial' : null"
      ></v-img>
    </v-card-text>
  </v-card>
  <v-card
    class="mx-auto"
    width="400"
  >
    <v-card-text>
      This image overflows. Click on it to let it exceed the card.
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      cardStyle: null,
    }),
  }
</script>
