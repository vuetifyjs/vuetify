<template>
  <v-row
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
    align="center"
    class="grey lighten-2"
    justify="center"
    style="height: 500px"
  >
    <v-subheader>Swipe Direction</v-subheader>
    {{ swipeDirection }}
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      swipeDirection: 'None',
    }),

    methods: {
      swipe (direction) {
        this.swipeDirection = direction
      },
    },
  }
</script>
