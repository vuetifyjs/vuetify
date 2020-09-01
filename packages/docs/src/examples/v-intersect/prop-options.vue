<template>
  <div>
    <div class="d-flex align-center text-center justify-center">
      <v-avatar
        :color="isIntersecting ? 'green lighten-1' : 'red darken-2'"
        class="mr-3 swing-transition"
        size="32"
      ></v-avatar>
    </div>

    <v-responsive
      class="overflow-y-auto"
      max-height="400"
    >
      <v-responsive
        height="200vh"
        class="d-flex align-center text-center pa-2"
      >
        <v-card
          v-intersect="{
            handler: onIntersect,
            options: {
              threshold: [0, 0.5, 1.0]
            }
          }"
          class="mx-auto"
          max-width="336"
        >
          <v-card-title>Card title</v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>
        </v-card>
      </v-responsive>
    </v-responsive>
  </div>
</template>

<script>
  export default {
    data: () => ({
      isIntersecting: false,
    }),

    methods: {
      onIntersect (entries, observer) {
        // More information about these options
        // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        this.isIntersecting = entries[0].intersectionRatio >= 0.5
      },
    },
  }
</script>
