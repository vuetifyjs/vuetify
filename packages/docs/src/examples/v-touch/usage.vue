<template>
  <v-row
    class="bg-grey-lighten-2 align-center justify-center"
    style="height: 500px"
    v-touch="{
      left: () => swipe('Left'),
      right: () => swipe('Right'),
      up: () => swipe('Up'),
      down: () => swipe('Down')
    }"
  >
    <v-col class="text-center">
      <div class="text-title-small">Swipe Direction</div>
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
