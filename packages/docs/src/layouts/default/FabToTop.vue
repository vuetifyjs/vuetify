<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      aria-label="Scroll to top"
      bottom
      color="primary"
      fab
      fixed
      large
      right
      title="Scroll to top"
      style="z-index: 6"
      class="reee"
      @click="toTop"
    >
      <v-icon>$mdiChevronUp</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
  export default {
    name: 'DefaultFabToTop',

    data: () => ({
      fab: false,
    }),

    methods: {
      onScroll () {
        if (typeof window === 'undefined') return

        const top = (
          window.pageYOffset ||
          document.documentElement.offsetTop ||
          0
        )
        this.fab = top > 300
      },
      toTop () {
        if (this.$route.hash) {
          this.$router.push({ hash: '' })
        }
        this.$vuetify.goTo(0)
      },
    },
  }
</script>
