<template>
  <v-layout
    column
    align-center
    justify-center
    style="height: 500px"
    class="grey lighten-2"
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right')
    }"
  >
    <v-subheader>Swipe Direction</v-subheader>
    {{ swipeDirection }}
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      swipeDirection: 'None'
    }),

    methods: {
      swipe (direction) {
        this.swipeDirection = direction
      }
    }
  }
</script>
