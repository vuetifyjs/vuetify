<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      :aria-label="$t('scroll-to-top')"
      :style="{
        marginBottom: `${$vuetify.application.snackbar}px`,
      }"
      :title="$t('scroll-to-top')"
      bottom
      class="transition-swing"
      color="primary"
      fab
      fixed
      large
      right
      style="z-index: 6"
      @click="toTop"
    >
      <v-icon>$mdiChevronUp</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
  // Globals
  import { IN_BROWSER } from '@/util/globals'

  export default {
    name: 'DefaultFabToTop',

    data: () => ({ fab: false }),

    methods: {
      onScroll () {
        if (!IN_BROWSER) return

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
