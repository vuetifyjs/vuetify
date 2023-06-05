<template>
  <v-row
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
    align="center"
    class="bg-grey-lighten-2"
    justify="center"
    style="height: 500px"
  >
    <v-col class="text-center">
      <div class="text-subtitle-2">Swipe Direction</div>
      {{ swipeDirection }}
    </v-col>
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
