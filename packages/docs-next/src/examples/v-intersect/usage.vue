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
          v-intersect="onIntersect"
          class="mx-auto"
          max-width="336"
        >
          <v-card-title>Card title</v-card-title>

          <v-card-text>
            Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.

            In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.
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
        this.isIntersecting = entries[0].isIntersecting
      },
    },
  }
</script>
